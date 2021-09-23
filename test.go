package main

import "fmt"


type person struct{
	fname string
	lname string
}

type secretAgent struct{
	person
	licenseToKill bool
}

func (p person) speak(){
	fmt.Println(p.fname,p.lname,"says good morning!")
}


func (p secretAgent) speak(){
	fmt.Println(p.fname,p.lname,"says good morning in his own way!")
}


type human interface{
	speak()
}

func main() {


	 var v1 = "v1";
	 var v2 = "v2"; // v1 is v2 

	 var template_str string = `this is ` + v1 + ` how you set up `+ v2 +` an template string`
	 fmt.Println(template_str)


	// var p1 person = person{
	// 		"kalana",
	// 		"thejitha",
	// }
	//
	// var sp1 secretAgent = secretAgent{
	// 		person{
	// 			"Gayathri",
	// 			"Chamini",
	// 		},
	// 		true,
	// }


	// var p1 human = person{
	// 		"kalana",
	// 		"thejitha",
	// }
	//
	// var sp1 human = secretAgent{
	// 		person{
	// 			"Gayathri",
	// 			"Chamini",
	// 		},
	// 		true,
	// }
	//
	//
	//
	// p1.speak()
	// sp1.speak()
	//
	//
	// var sp1o  = sp1.(secretAgent);
	//
	// fmt.Println(sp1o.fname)


}









//package name => github.com/istore221/firstapp
// best practice is to use the source control path for the package name

/*

cat ~/.bashrc

export GOROOT=/usr/local/go
export GOPATH=/Users/kalanathejitha/Desktop/golang-quickstart
export PATH=$PATH:$GOROOT

*/

/*

	three ways to run the code

	1. quick run => go run src/github.com/istore221/firstapp/Main.go
	
	2. build code =>   cd ~/Desktop/golang-quickstart/ && go build github.com/istore221/firstapp && ./firstapp
	
	3. install code => cd ~/Desktop/golang-quickstart/ && go install github.com/istore221/firstapp && ./bin/firstapp

	
	go build creates an executable where you run the go build command from
	go install create an executable in the relevenet gopath directory 
*/


/*

string manupalation output:
name is John salary is 1000
**** value "name is John salary is 1000" is a string ****
name is Sam salary is 2000
**** value "name is Sam salary is 2000" is a string ****

employeeSalary := map[string]int{
		"John": 1000,
		"Sam":  2000,
	}

	for k, v := range employeeSalary {
		s := fmt.Sprintf("name is %s salary is %d", k, v)
		fmt.Println(s)
		fmt.Printf("**** value \"%s\" is a %T ****\n", s, s)
	}

*/


/*

	variable declaration

	var i int = 42;
	var i = 42;
	i := 42;  //shorthand for var i int = 42;
	var a, b, c int = 80, 80, 80; // mutiple assign
	a, b, c  := 80, 80, 80; // shorthand multiple assign

	var (
		name string = "gayathri";
		age int = 23;
	) // handy ah

*/


/*

	functions are objects in go you can parse around
	you can have anonimus functions as well

	x := func() (int, string)  {
		return 3,"k"
	}


	var v1, v2 = x();

	fmt.Println(v1,v2)



	# recursive factorial

	var ff func(n int) int;

	ff = func(n int) int  {

		if n == 0{
			return 1
		}else{
			return n * ff(n-1)
		}

	}

	var f int = ff(5)
	fmt.Println(f)



	#unlimited arguments

	func sum(values ...int) int{
		sum := 0;
		for _, v := range values{
			sum+=v
		}
		return sum

	}



	#anonimus functions

	func(){
		fmt.Println("annonimus func")
	}()



*/



/*


	Shadowed variables (similer to let keyword in javascript)

	example: 1

	var i int = 4; // at the package level

	func main() {
			fmt.Println(i) // 4
			var i int = 3; // scoped level or shadowed variable
			fmt.Println(i) // 3
	}


	example: 2

	func main() {
		n := 0 // outer scope
		if true {
				var n int = 1  // in javascript if you use let same behavior in go let is the default behavior
				n++
				fmt.Println(n) // 2
		}
		fmt.Println(n) // 0
	}


*/





/*



	there are 3 variable scopes
	#In Go, a name is exported if it begins with a capital letter. For example, Pizza is an exported name, as is Pi, which is exported from the math package.

	1.lowercase are scoped to the package
	2.uppercase are scoped to the global
	3.block scope which is basically a variable inside a function sortof thing

	var i int = 3; //  for the same package this variable is visible if declared at the package level
	var I int = 3; //  Globally available for any package eg: math.Pi from any package

	example:

		package main

		import (
			"fmt"
			"math"
		)

		func main() {
			fmt.Println(math.Pi) // Pi is a exported value of math package
		}



*/




/*

	type casting

	go does not support implicit conversions it has to be explicit

	# for numerics you can just use the type name as a function for casting but with casting to string  need help from strconv package
	var price float32 = 123.50;
	var printInt int = int(price); // 123


*/




/*

	types

	// just an interface on the fly has no method on it
	// every type in go implement the empty interface
	var x interface{} = 3; // you can assign anything
	fmt.Println(x)



	1.boolean

	var isCompleted bool = true;

	2.integer

			default is 32 depending on compiler archecture if x64 defult int is 64

			var i32 int = 32;
			var i8 int8 = 127; // 8bit integer can hold values range from -128 to 127  (-2^7 (-128), 2^7-1 (127)) even though its 2^8 its 2^7 as first bit allocated for the sign + or -    (1111111 and -1111111 and 00000)
			var i16 int16 = 12345; // 16bit integer -32768 to 32767
			var i32 int32 = 12212; // billions
			var i64 int64 = 1212; // for really big numbers

			you can use uint if value is possitive so that you can use the slots for negitve and go higer as an example:
			var i8 int8 = // min: -128 max: 127
			var i8 uint8 = // min: 0 max: 255 (2^8 not 2^7 like before as you dont have to sacrafice a additional bit for sign)



			bit operations

			&   bitwise AND
			|   bitwise OR
			^   bitwise XOR
			&^   AND NOT
			<<   left shift
			>>   right shift


			a := 10  // 00001010
			b := 3 	//  00000011
			a & b =  00000010 (2)
			a | b = 00001011 (11)
			a ^ b = 00001001 (9)
			a &^ b = 00000100 (4)


			b << 1 // 	 0000011(0)   => 6
			b << 2 // 	000011(00) => 12
			b << 3 //  00011(000) => 24

			b >> 1 // 	 0000011(0)   => 3
			b >> 2 // 	000011(00) => 12
			b >> 3 //  0011(000) => 24



	3. byte

	a group of binary digits or bits (usually eight) operated on as a unit.
	a byte considered as a unit of memory size.

		00000000 [ bit 8 =  1 byte]

			var x byte = 255; if 266 throws overflow as 2^8-1 = 255


	3. String

		one ASCII charactersin UTF-8 occupies 8 bits or 1 byte

		in go each character is a rune in string which is basically a 32 bit number which represent the character

		var x string = "kalana";
		var t rune = 'g'; // notice single quote of rune cant have more than one character



		fmt.Println(x[0]);  // 107 utf-8 number of letter k
		fmt.Println(string(x[0])); // "k" get letter for utf-8 character



		var x string = "gayathri";

		for i:=0; i<len(x); i++{
			fmt.Println((x[i]));

			//103
			//97
			//121
			//97
			//116
			//104
			//114
			//105

		}

		b := []byte(x) // [103 97 121 97 116 104 114 105] a.k.a byteslice
		fmt.Println(b);

		var x_b []byte = []byte("hello k"); // string is an sequance of bytes
		var x_r []rune = []rune("hello k"); // rune is an alias for int32
		var x_i []int32 = []int32("hello k") // int32 is a 32bit binary means 4 bytes       00000000 00000000 00000000 00000000 => holds one chracter
		fmt.Println(x_r); //[104 101 108 108 111 32 107]
		fmt.Println(x_b); //[104 101 108 108 111 32 107]
		fmt.Println(x_i); //[104 101 108 108 111 32 107]





		var template_str string = `this is ` + v1 + ` how you set up `+ v2 +` an template string`
 	 fmt.Println(template_str)



*/




/*


	const World string = "hello"


	var myFloat float64 = 21.54
	var myInt int = 562
	var myInt64 int64 = 120

	var res1 = myFloat + myInt  // Not Allowed (Compiler Error)
	var res2 = myInt + myInt64  // Not Allowed (Compiler Error)
	var res1 = myFloat + float64(myInt)  // Works
	var res2 = myInt + int(myInt64)      // Works



*/




/*


*T         // a pointer type
[5]T       // an array type
[]T        // a slice type
map[Tkey]T // a map type

*/


/*



	Arrays (colleciton type)

	// unlike other lang arrays are value types
	// a = [1,2,3]; b = 1; b[1] = "x"; this is not going to change the original array


	var a [2]string;

	a[0] = "k";
	a[1] = "g";

	var b [2]string = [2]string{"k", "g"};

	var c = [2]string{"k", "g"};

	d := [2]string{"k", "g"};


	var e  = [...]string{"k"}; // allocate only 1 slot as all above allocate 2 slots exactly regardless of number of elements

	var f [3][3]int; // 2d array

	f[0] = [3]int{1,2,3};
	f[1] = [3]int{1,2,3};
	f[2] = [3]int{1,2,3};


	var g [3][3]int = [3][3]int{{1,2,3}, {1,2,3}, {1,2,3}};

	var h [1]int = [1]int{1}

	var i = h;
	i[0] = 10;  // does not change the i array as its a value type

	var j = &h; // assign as a pointer
	j[0] = 13; // changes the original array as its apointer to the original memory location

	fmt.Println(a);
	fmt.Println(b);
	fmt.Println(c);
	fmt.Println(d);
	fmt.Println(e);
	fmt.Println(f);
	fmt.Println(g);
	fmt.Println(h);
	fmt.Println(i);
	fmt.Println(j);


	for i:=0; i<len(a); i++{
		fmt.Println(a[i])
	}





	slices (colleciton type)


	// unlike arrays slices are reference types
	// under the hood go uses arrays and resize the array automatically as you add more items
	// unlike arrays it doesnt have a fixed length you can dynamically add or remove elements
//	var a []string = []string{"a","b","c","d","e"}; // this is not an array this is known as slice

	//var b []string  = a[:] // [a,b,c,d,e] #whole slice
	//var c []string = a[1:]  ); // [b,c,d,e]
	//var d []string = a[:2];  //[a b]
	//var e []string = a[:3]; // [a,b,c]
//	var f []string = a[1:3]; // [b, c]


//	var g = make([]int, 3); // another way to create a slice is using make function
	//g = append(g, 12)


	var h = []int{1,2,3,4,5} // remove middle element 3
	var n = append(h[:2], h[3:]...) // [1 2 4 5]
	fmt.Println(h);
	fmt.Println(n)


*/




/*


	Maps (colleciton type)

	maps are reference types

	var n map[string]int = map[string]int{"foo": 1, "bar": 2}

	var x map[[2]string]int = map[[2]string]int{{"a","b"}: 3} // key is an array
	fmt.Println(x)

	var z map[string]int = make(map[string]int);
	z["k"] = 3;
	fmt.Println(z);



*/





/*


	Structs


	// value types
	// you can always use var x = &y to point the reference instend of copying all values again to the memory

	type Vertex struct {
			X int `requried max:"100"` //  `requried max:100` this is known as a tax  what tags does is you can annotate things but still you have to figure out what do do with it from your end in this case you can use this tag data on your validation framework
			Y int
		}

	//var v1 Vertex = Vertex{1,2} // order matters you have to assign values in the same order
	//var v2 Vertex = Vertex{Y: 30} // you can specify the field

	//va  := [...]Vertex{Vertex{1,2},Vertex{2,3}}

	//var anonymous_struct = struct{name string}{name: "Kalana"} // known as anonymous struct


	// as golang doesnt support traditional inherticance you can use composition to archive the same behavior
	type Animal struct {
		 Name string
		 Origin string
	}

	type Bird struct {
			Animal // has-a releationship
			CanFly bool
	}


	var b Bird = Bird{}
	b.Name = "mybird";
	b.CanFly = true;
	fmt.Println(b);

	var x Bird = Bird{Animal: Animal{Name:"mybird2", Origin: "Aus"},CanFly: true} // known as embedding
	fmt.Println(x);



	== annonimus structs for dirty Works

	var anonymousStruct struct{X int;Y int} = struct {X int; Y  int}{Y:10}
	anonymousStruct.X = 300


	=== type methods and alias type


	type greeter struct{
		greet string
		name string
	}

	func (g greeter) saygreet(){ // struct method
		fmt.Println(g.greet," ",g.name)
	}


	type counter int // counter type is an integer now you can expand the capability of integer using struct methods

	func (c counter) print(){ // struct method
		fmt.Println("counter is ",c)
	}

	func main() {


		var g1 greeter = greeter{
			greet: "Hello",
			name: "Kalana",
		}

		var n counter = 3 //or this counter(3);
		n.print();


		g1.saygreet()

	}


*/



/*


	Loop break,continue,Labels


	#labels are more usefull if  you want to break out from the entire inner loop including the main one (one loop inside another)

	fmt.Println(1)
	 goto End
	 fmt.Println(2)

	End: // this is an label
	 fmt.Println(3)



	for i := 0; i<5; i++{
		fmt.Println(i)
		if i == 2{
			goto End // go to label
		}
	}

	End: // this is an label
		fmt.Println("we are done")



*/



/*

	Loops

	i := 0;
	for ; i<5 ; {
		 //fmt.Println(i)
		 i++
	}

	for i := 0; i<5; i++{
		//fmt.Println(i)
	}


	 s := [...]int{1,2,3};

	for k,v := range s{
			fmt.Println(k,v)
	}


	var n map[string]int = map[string]int{"foo": 1, "bar": 2}

	for k,v := range n{
			fmt.Println(k,v)
	}

	for _,v := range n{ // if you only want the value
		 fmt.Println(v)
	}

*/



/*

	defer

	usefull for closing resources in order after main program finishes

// defer fmt.Println("hello 1")
// fmt.Println("hello 2")
// defer fmt.Println("hello 3")

/*

with defer it's Last in first out

hello 2
hello 3
hello 1

*/




/*

	panics (exceptions)

// in go there's no concept of exception its known as panic
// when panic happens function stop exuecting
// panics should be only raise in a unrecoverable situations like web server starting on a used port

// making devided by zero panic
 a,b  := 1,0;

 ans := a / b;

fmt.Println(ans)

//panic("something went wrong") // throw exception manually



// panics and defer statement


	fmt.Println("start")
	defer fmt.Println("this was defered")
	panic("error happened") // oh any defer statements to execute before i go
	fmt.Println("end")

	note: panic happens after defer statement get executed its not gonna happen right away

	start
	this was defered
	panic: error happened


	// basic exception handling in go

	func main() {

			 x,err := divide(3,0);

			 if err != nil{
				 fmt.Println("error happened")
				 return
			 }

			fmt.Println(x)






	}


	func divide(x int, y int) (int, error){

		if y == 0{
			return 0, fmt.Errorf("can not devide by zero")
		}
		return x/y, nil

	}



	/*================= recover from panics using deffer ===================== */


	//
	// func main() {
	//
	// 	fmt.Println("start")
	// 	panicker();
	// 	fmt.Println("end")
	//
	//
	// }
	//
	//
	// func panicker(){
	// 	fmt.Println("about to panic")
	//
	// 	defer func(){ // called before function finishes
	//			// in this we just deal with the error if this error cant be handled you can repanic the application by doing a another panic("cant handle") from here so in that case you dont get last "end" println
	// 		 // recover() function helps to recover application from panic the fmt.Println("end") from main() function will get called this time
	//
	// 		 err := recover(); // this would be equal to "ooops something went wrong"
	//
	// 		 if err != nil{
	// 			 	log.Println("ERROR: ",err)
	// 		 }
	//
	//
	// 	}()
	//
	// 	panic("ooops something went wrong")
	// 	fmt.Println("end of panicker")
	// }

	/*================= recover from panics using deffer ===================== */







/*

	pointer

	var a int = 2;
	var b *int = &a
	a = 3;
	fmt.Println(*b)


 // pretty much the same thing but less verbose
	var a = 2;
	var b = &a
	a = 3;
	fmt.Println(*b) // 3




	var v1 Vertex = Vertex{X:100,Y:100};
	var v2 *Vertex = &v1;

	(*v2).X = 200; // correct way
	v2.X = 200; // or syntaxtic sugar way compiler will converted to (*v2).X

	fmt.Println(*v2)


*/






/*


	interfaces

	// interface{} is just an interface on the fly has no method on it
	// every type in go implement the empty interface
	var x interface{} = 3; // you can assign anything
	fmt.Println(x)


	note: just like structs you can have embeded interfaces

	type Writer interface{
		Write() (int, error)
	}


	type Incrementer interface{
		increment() int
	}


	type ConsoleWriter struct{}

	type FileWriter struct{}

	type IntCounter int


	func (cw ConsoleWriter) Write() (int, error) {
		fmt.Println("console write")
		return 0, nil
	}


	func (cw FileWriter) Write() (int, error) {
		fmt.Println("file write")
		return 0, nil
	}


	func (ic *IntCounter // this is a pointer reciver) increment() int {
		*ic++
		return int(*ic)
	}

	func main() {

		var cw Writer = ConsoleWriter{};
		var fw Writer = FileWriter{};

		cw.Write();
		fw.Write();

		incrementer := IntCounter(3)
		incrementer.increment() // pointer should be parsed as integer is a value type
		incrementer.increment()
		incrementer.increment()
		incrementer.increment()
		fmt.Println(incrementer) // 7





	}








	# type casting

	type Printer interface{
		print()
	}


	type ConsolePrinter struct{}

	func (cp ConsolePrinter) print(){
		fmt.Println("console printer")
	}

	func main() {

		var p Printer = ConsolePrinter{};
		p.print()

		r, ok  := p.(ConsolePrinter) // convert interface type to struct type
		//not r is ConsolePrinter type not Printer type

		if ok{
			r.print();
		}else{
			fmt.Println("conversion failed")
		}

	}

*/





/*



	go routngs or threads


	// go rutine
	go sayHello("gayathri") // if you do this hello name will never be printed out because your main theread will exit before it does that


	var msg string = "msg"
	go func (){ // annonimus function
			fmt.Println(msg) // oculd be either msg or msg changed to slove this get msg as an parameter
	}()
	msg = "msg changed"


	var msg_fixed string = "msg_fixed"
	go func (msg_fixed string){ // annonimus function
			fmt.Println(msg_fixed) // msg_fixed
	}(msg_fixed)
	msg_fixed = "msg_fixed changed"

	time.Sleep( 100 * time.Millisecond)




	// wait groups to avoid bad practice time.sleep

	var wg = sync.WaitGroup{}

	var msg string = "msg"
	wg.Add(1)
	go func (msg string){
			fmt.Println(msg)
			wg.Done()
	}(msg)
	wg.Wait();




	// synchronizing threads using mutex


	var counter int = 0;
	var wg = sync.WaitGroup{}

	/*
		mutext is a lock that application honors
		typically we're using mutext to protect our data so that one async task can manupulate our data at a time
		you can also use channels to implement the same thing without locks because channels behind use locks see example on channels topic

		// if someoen locks the mutext other has to wait untill it unlocks
		//in RWMutext if anyone is reading the data cant write has to wait until read unlocks. you can have many readers to the data but once writer want to write it has to wait untill all readers unlocks.once writer locks noboday can read or write other than the task which put the writer locks

	*/
	// var m = sync.RWMutex{}
	//
	// func main() {
	//
	//
	//
	// 	for i:=0; i<10; i++{
	// 		wg.Add(2) // or else 	wg.Add(20) before for loop
	//
	// 		m.RLock(); // read lock
	// 		go sayHello();
	// 		m.Lock(); // write lock
	// 		go increment();
	// 	}
	//
	// 	wg.Wait();
	//
	// }
	//
	//
	// func sayHello(){
	// 	fmt.Println("Hello",counter)
	// 	m.RUnlock();
	// 	wg.Done();
	// }
	//
	// func increment() {
	// 	counter ++
	// 	m.Unlock();
	// 	wg.Done();
	//
	// }





	// by default go do threads based on how many cors avilable on your machine which is 4 on a quad-core
 // you can change this pasing parameter runtime.GOMAXPROCS(1) // avilable threads 1
 // GOMAXPROCS is a uning variable if you set it higher you application will run faster but at the same time the memory consumptino will be higher as go app needs to maintain 100 threads
//fmt.Println("default number of threads avilable ",runtime.GOMAXPROCS(-1))

// hints: if you're building a library avoid using go routings let the consumer use their own concureency on top of your ibrary












/*


###channels

When you have multiple goroutines which are executed concurrently, channels provide the easiest way to allow the goroutines to communicate with each other.
One way for communication would be via a "shared" variable which is visible to both goroutines, but that would require proper locking / synchronized access.




var wg = sync.WaitGroup{}

func main() {

	 ch := make(chan int) // channel to communicate the message which is an integer

	wg.Add(2)

	go func(){
			i := <- ch // read from channel
			fmt.Println(i)
			wg.Done()
	}()

	go func(){

			var x = 42
			ch <- x // write to channel
			wg.Done()
	}()


	wg.Wait();

}




### sendonly channels and recive only channel

var wg = sync.WaitGroup{}

func main() {

	 ch := make(chan int) // channel to communicate the message which is an integer

	wg.Add(2)

	go func(ch <- chan int){ // you can only recive values from the channel
			i := <- ch
			fmt.Println(i)
			wg.Done()
	}(ch)

	go func(ch chan<- int){ // you can only write to the channel from here
			var x = 42
			ch <- x
			//fmt.Println(<- ch) // this will cause an error
			wg.Done()
	}(ch)


	wg.Wait();





### sayhello loop implmentation using channels without using lock  technique above

var wg = sync.WaitGroup{}
var helloCh = make(chan int)
var doneCh = make(chan struct{})

func main() {

	var n int = 10;

	wg.Add(1)
	go sayHello()

	for i:=0; i<n; i++{

		helloCh <- i

		if i==(n-1){
			doneCh <- struct{}{}
		}

	}


	wg.Wait();



}


func sayHello(){


	for {
	select {
	case i := <- helloCh:
		fmt.Println("Hello",i)
	case <-doneCh:
		wg.Done()
		break
	}
}



}






### logger implementation with goroutins,WaitGroup,channels


var wg = sync.WaitGroup{}
var logCh = make(chan string)
var doneCh = make(chan struct{}) // stcut with no field requre 0 memory allocation that why we use it to implement signal only channel you can use boolean if you want

func main() {

	wg.Add(1)

	go logger()
	defer func(){
		fmt.Println("-----channel is closing-----")
		close(logCh)
	}()

	logCh <- "App is starting"
	logCh <- "App is terminating"
	doneCh <- struct{}{}
	wg.Wait()

}


func logger(){

	// # if your not using doneCh method
	// for entry := range logCh {
	// 	fmt.Println(entry)
	// 	if entry == "App is terminating"{
	// 		wg.Done()
	// 	}
	// }

	for {
		select {
		case entry := <- logCh:
				fmt.Println(entry)
		case <-doneCh:
			wg.Done()
			break
		}
	}



}






*/
