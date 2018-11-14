# awesome-uploader-beta

 bash ''' var uploader = new UploadFactory.init({

            
            url : "{{Url('app/media/album/uploadphotos')}}",
            limit : 0,
            max_file_size : 0,
            cache : true,
            servervar : "poto",
            data : {"albumid":albumid},
            beforeupload: function(uploadqueue){

                $('body').find("*").attr('disabled', 'true');
               

            	$.each(uploadqueue.stack.stackitems,function(index,file){

            		

            		var html = '<div id ="'+file.getFileIdentifier()+'" class="inline photo-upload-prev">';
            		html+= ' <img src="{{Url("images/image-upoading-ajax.gif")}}"" alt="" />';
            		html+= '</div>';

            		uploadcontainer.append(html);
                    

            		


            	});



            },
            onprogresschange : function(data){

              
              // console.log(data.file.getFileIdentifier()+" "+data.file.progress);
               
                
            },
            oncomplete : function(completedfile){

                var completedfileid  = completedfile.completed.getFileIdentifier();
                var reponse  = completedfile.server_response;
                var completed_sofar = completedfile.stack.getCompleted().length;
                var overolepres = Math.round((completed_sofar/completedfile.stack.stackitems.length) * 100);

              	$('div.photo-upload-panal-body')
                .find('div#'+completedfileid).addClass('galary-black')
                .find('img').prop('src',completedfile.completed.cache);
              

                $("#upload-progress").text("( "+overolepres+" % )");
                uploadpopup.find("div#progress-bar").css({width : overolepres+"%" });


            },
            onuploadcomplete : function(uploadqueue){

             

                $.get("{{URL('app/rest/friends')}}",function(friends,status){

                                ss.notify(friends,{object : jQuery.parseJSON(uploadqueue.stack.stackitems[0].xhrrequest.responseText).album,objectType:MYAPP.socket.objectType.newsfeedupdate},function(){
                                    $('body').find("*").removeAttr('disabled');
                                    window.location.reload();

                                    
                                });  
                               
                                 

                               
                            },"json");





                    //window.location.reload();
                   
                   
            }
        });




    	$.each(photoinput.prop("files"),function(index,file){



    		uploader.push(file);



    	});

        if(!uploader.stackitems.length <= 0){

              uploader.begin();

        }
         
   

    	  


    });'''
