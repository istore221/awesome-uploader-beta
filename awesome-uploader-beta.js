
/*

	awesome-uploader beta version developed by A.L Kalana thejitha 
	special instruction : change the following settings in php.ini (post_max_size = 1000M | upload_max_filesize = 1000M | max_file_uploads = 100 )

*/

(function($) 
{

	// config
	var stackoptions = {

		debug : false,
		logger : (function(){
			
			
			return {
			
				write : function(data){
					
					(stackoptions.debug ? console.log("-----"+data+"-----") : null);
					
				}
			};
			
		})(),
		max_file_size : 32,  // in Bytes  (0 or nagitive number means no limit for file size)
		limit : 10, //  stack can hold only 10 files (0 or nagitive number means no limit)
		filter : [], // file filters
		beforeupload : null,
		onfileattach : null,
		onoverflow : null,
		oncomplete : null,
		servervar : "photo",
		cache : false,
		data : null,
		onprogresschange : null,
		onuploadcomplete : null,
		url : null
		
		

    };

	
	//stack event 
	var StackEvent = function(event,callback){
	
		this.event = event;
		this.callback = callback;
		
	
	};
	
	
	
	// stack item
	var StackItem = function(stack,file){
	
		this.stack = stack;
		this.file_id = null;
		this.file = file; // original file
		this.content_size = 0; //in Bytes
		this.completed = 0; // in Bytes
		this.progress = 0; // file progress
		this.xhrrequest = null;
		this.cache = (function(curobj){
			//cache useful for images upload
			if(curobj.stack.options.cache){
			
			
				var reader = new FileReader();
				reader.onload = function (e) {
					
					curobj.cache = e.target.result;
				};
				
				reader.readAsDataURL(curobj.file);
			}
			
		})(this);
		this.iscompleted = false;
		
		this.getFileIdentifier = function(){
	
			return this.stack.identifier+"_"+ this.file_id;
		
		};	
		
			
	
	};
	
	
	
	
	var UploadStack = function(options,identifier){
	
		var locl_identifier = identifier || "fs";
		
		this.options = $.extend(stackoptions, options); // set stack conf
		
		this.stackitems = []; // stack items
		this.stackevents = []; // stack events
		this.stackstorage = {
			
			
			amount : 0, // in Bytes
			completed : 0 // in Bytes
		
		};
		this.start = null;
		this.end = null;
		this.identifier = locl_identifier; // stack identifier
		this.stackprogress = 0; // entire stack progress
		
		
		
		
		
		this.prepare(); // event registration
		
		// init event invoke helper 
		this.event_helper = (function(that){
					
					return {
					
						onfileattach : function(data){
							
							
							that.fire('onfileattach_event',data);
						
						},
						beforeupload : function(data){
						
							
							that.fire('beforeupload_event',data);
						
						},
						onoverflow : function(data){
						
							that.fire('onoverflow_event',data);
						
						},
						
						onprogresschange : function(data){
						
							that.fire('onprogresschange_event',data);
						
						},
						
						oncomplete : function(data){
						
							that.fire('oncomplete_event',data);
						
						},
						
						onuploadcomplete : function(data){
						
							that.fire('onuploadcomplete_event',data);
							
						}
						
					};
				
		})(this);
		
		
		
		
	};
	
	
	
	
   UploadStack.prototype.prepare = function () 
   {
		stackoptions.logger.write("event binding....");
		
		var that = this;
		
		$.each(this.options,function(index,value){
		
			if(typeof(value) === "function"){
				
					
					that.stackevents.push(new StackEvent(index+"_event",value));
					
			
			}
		
		});
		
		
		
		stackoptions.logger.write("event binding completed");
   
	
   };
	
  
  
  
  
  
  
  
	// core 
	$.extend(UploadStack.prototype, 
	{
		  
		  push : function(stackitem){
				
				var file = new StackItem(this,stackitem); // StackItem instance
				
				if(this.options.limit > 0){
					
					
					
					if(this.options.limit < this.stackitems.length + 1){
						// overflowed
						stackoptions.logger.write("stackoverflow "+this.stackitems.length+"/"+this.options.limit);
						this.event_helper.onoverflow({"stack":this,"overflow":file});
						
						
						
						
					}else{
						
						
						
						this.attach(file); // add to stack
						
						stackoptions.logger.write("item added to Limited stack "+this.stackitems.length+"/"+this.options.limit);
					}
					
					
				}
				else{
				
					// unlimited stack
					this.attach(file); // add to stack
					 
					stackoptions.logger.write("item added to Unlimited stack "+this.stackitems.length);
					
				
				}
				
				
				
				
				
		  
		  },
		  attach : function(file){
		  
					
					// check file size
					if(this.options.max_file_size <= 0){
					
						// unlimited file size
						
							// check file extentions filter
							if(typeof(this.options.filter[0]) === "undefined"){
								
								// filter not defined
								
								// add to stack
								file.file_id = this.stackitems.length;
								this.stackitems.push(file);
								// notify attached
								this.event_helper.onfileattach({"stack":this,"added":file});
							
							}
							
							
							
						
					}
					
				
				
		  
		  },
		  
		  begin : function(){
		  
				this.start = Date.now();
				
				// notify beforeupload
				this.event_helper.beforeupload({"stack":this,"sender" : "UploadStack"});
				
				// start upload pool 
				var pool = new Uploadpool(this); // parse stack
				pool.run(); // run
			
		  
		  },
		  getCompleted : function(){
		  
							var completed = [];
						   $.each(this.stackitems,function(index,value){
						   
								if(value.iscompleted){
									completed.push(value);
								}
								
								
						   });
						   
						   return completed;
						  
		  
		  
		  }
		  
		  
		  
		  
	});
	
	
	
	
	
	
	
	
	// request pool manager
	var Uploadpool = function(stack){
	
		this.xhr_pool = [];
		
		this.run = function(){
		
			var that = this;
			
			
			$.each(stack.stackitems,function(index,value){
				
				var file = value.file; // real file object
				
				that.xhr_pool[index] = new XMLHttpRequest();
				
				
				/* =========================  events ======================================= */
				
						   
				   
				   
				   
				   
				  that.xhr_pool[index].upload.addEventListener("progress", function(event)
				  {
						
						 //you can abort using -> that.xhr_pool[1].abort();
						  
						 var stackitemobj = stack.stackitems[index];
						  
						  
						/* Onloadstart trick */
						if(stackitemobj.xhrrequest === null){
							
							var request_size = event.total;
							stack.stackstorage.amount = stack.stackstorage.amount + request_size; // update stack size
							stackitemobj.content_size = request_size;
							stackitemobj.xhrrequest = that.xhr_pool[index]; // set related  request
							
						}
						
						/*	Onloadstart trick */
						
						
						 
						
						
						  // update file item progress
						if (event.lengthComputable) 
						{
							 
							 
							
							
						   /* set single file progress */
						   var fileprogress = (event.loaded / event.total) * 100;
						   stackitemobj.progress = Math.round(fileprogress)+"%";
						   stackitemobj.completed = event.loaded;
						   
						    /* set single file progress */
						   
						 
						   // update stack completed storage
						   stack.stackstorage.completed = 0; // reset
						   $.each(stack.stackitems,function(index,value){
						   
								stack.stackstorage.completed += value.completed;
								
								
								
						   });
						   
						   
						   // update  stack progress
						   var stackprogress = (stack.stackstorage.completed / stack.stackstorage.amount) * 100; // raw value
						   
						   stack.stackprogress = stackprogress+"%"; // set overoll progress   Math.round(stackprogress)+"%";
						   
						   if(stackprogress >= 100){
								
								stack.end = Date.now();
								stack.iscompleted = true;
								
							
								
						   }
						   
						    // notify file progress
						    stack.event_helper.onprogresschange({"stack":stack,"file" : stackitemobj});
						  
						 
						  
						  
							

						}
						

				  
			  		
	


				  }, false);
				  
				  
				  
				  
				  
				  
				  
				  
				   that.xhr_pool[index].addEventListener("load", function(data)
				   {
				   		
					  	 var response = JSON.parse(data.target.responseText); // server response json_encode !importent
							
					  	 
						
						 // notify complete
						 var stackitemobj = stack.stackitems[index];
						 stackitemobj.iscompleted = true;
						 stack.event_helper.oncomplete({"stack":stack,"completed" : stackitemobj,"server_response":response});
						 
						
						
						 //check all done
						  var completedcount = 0;
						   $.each(stack.stackitems,function(index,value){
						   
								if(value.iscompleted){
									completedcount++;
								}
								
								
						   });
						  
						   if(completedcount === stack.stackitems.length ){
								stack.event_helper.onuploadcomplete({"stack":stack});
						   }
						 
						 
						 

				   }, false);
				   
				   
				   
				   
				   
				  
				  
				  
				   that.xhr_pool[index].addEventListener("abort", function(event)
				   {
				   		
	
				   		 alert("The transfer has been canceled by the user.");
						 
						 

				   }, false);
		          
				   
				   
				   
				 
				 
				 /* =========================  events ======================================= */
				 
				 
				 // send request
				 
				 that.xhr_pool[index].open('POST',stack.options.url, true); // open the connection

				

				 that.xhr_pool[index].setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				 


				  var formData = new FormData();
				  formData.append(stack.options.servervar,file);
				  
				  $.each(stack.options.data,function(key,val){
					
					formData.append(key,val);
					
				  });
				

				  that.xhr_pool[index].send(formData);
				  
				  
				  
				
				
			
			});
			
			
			
		
		};
		
		
			
		
	
	
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// event interface 
	$.extend(UploadStack.prototype, 
	{
		 
		fire : function(event,data){
			
			stackoptions.logger.write("event "+event+" is about to fire");
			
			var found = false;
			
			
			$.each(this.stackevents,function(index,value){
			
				
				
				if(value.event === event){
				
					found = true;
					
					if(typeof(value.callback === "function")){
					
						
						value.callback(data);
						stackoptions.logger.write("event "+event+" fired");
						
					}
				}
			
			});
			
			if(!found){
			
				stackoptions.logger.write("event "+event+" is not registred");
			}
			
			
			
		}
		  
		  
		  
	});

	
	
	
	
	
	
	return UploadFactory = {
	
		init : UploadStack
		
	};
	
	
   

    


}(jQuery));
