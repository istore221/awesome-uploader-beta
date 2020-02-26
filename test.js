class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
    this.unix = date.getTime(); //  unixtimestamp

  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}



let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

let sorted = articles.sort((artical1, artical2)=>artical1.date > artical2.date);

let a = new Set([1,2,3]);
let b = new Set([4,3,2]);


let difference = new Set(
    [...a].filter(x => !b.has(x)));


let sorted_by_unix = articles.sort((o1, o2)=> o1.unix > o2.unix)
//console.log(sorted_by_unix)



let obj1 = {
  size:3,
  name:' k'
}


let obj2 = {
  size: 400
}


let new_obj = Object.assign(obj1, obj2); // second arg overides



let date1 = new Date(2019, 1, 1)
let date2 = new Date(2019, 1, 2)

let diff_mlseconds = Math.abs(date1.getTime() /* to unixtimestamp */ - date2.getTime());
let diff_in_days = Math.floor(diff_mlseconds / (24*60*60*1000));




let some_arry = [1,2,3,4];

Array.prototype.mapz = function(e){

      let res = [];

      this.forEach(x => res.push(e(x)) )

      return res;

};


//console.log(some_arry.mapz(e => Math.pow(e, 2)))


let person1 = {
  birthday: new Date(1991,9,6),
  getAge: function(){
    return Math.floor((new Date().getTime() - this.birthday.getTime())/(1000*60*60*24*365)) // calculate miliseconds for an year
  }
}

//console.log(person1.getAge())



function destroyer(array, ...distroy){

   return array.filter(e=>distroy.indexOf(e) == -1)
}


//console.log(destroyer([1, 2, 3, 2, 3, 1], 2, 3))



class Node{

  constructor(){
    this.left;
    this.right;
    this.val;
  }
}


let node1 = new Node()
node1.val = 3;

//console.log(node1)




let array2D = [[
    "00","01","02"]]






var call_depth = 0;
function factorial(n){

  call_depth++;

  if(n == 1){
    return n;
  }else{

   return n * factorial(n-1)

  }

}

// console.log(factorial(3))
// console.log(`call depth ${call_depth}`)


function counVowels(str){


  return (str.split('').filter(x=>  ['a','e','i','o','u'].indexOf(x) !== -1 )).length;

}

//console.log(counVowels('helloa') );// 2




class BinarySearchTree {


  constructor() {
    //initially root is null
    this.root = null;
  }

  insertNumberNode(data) {

    if(!this.root){
      this.root = {
              data,
              left: null,
              right: null
            }
    }else{
      // root is not empty

      let current_node = this.root;


      while(current_node != null){

           if(current_node.data == data){
              break;
            }

          if(current_node.data > data){

              if(current_node.left){
                // left is not empty
                current_node = current_node.left;
              }else{
                // left is empty
                current_node.left = {data, left: null, right: null}
                break;

              }


          }else{

            if(current_node.right){
              // right is not empty
              current_node = current_node.right;
            }else{
              // right is empty
              current_node.right = {data, left:null , right: null}
              break;
            }
          }

      }

    }


  }


  travel(node = this.root){

    let data = [];

    if(node !== null){


        data = data.concat(this.travel(node.left))
        data.push(node.data)
        data = data.concat(this.travel(node.right))
    }

    return data;
  }

 /*

    10
  5   15
 */

}




let BSTtest = new BinarySearchTree();

BSTtest.insertNumberNode(10);
BSTtest.insertNumberNode(15);
BSTtest.insertNumberNode(5);
BSTtest.insertNumberNode(50);
BSTtest.insertNumberNode(3);
BSTtest.insertNumberNode(7);
BSTtest.insertNumberNode(12);
//console.log(BSTtest.travel()); //['5,10,15']




function factorialSyntaxPrint(x){

    let nums = [];


    if(x == 1){
      return [1];
    }else{
       nums.push(x)
      return nums.concat(factorialSyntaxPrint(x-1).reverse()).reverse()
    }
}



//console.log(factorialSyntaxPrint(3));



let some_array = [1,2,3,4];

while(some_array.pop()){
  //console.log("popping")
}




function isValidWalk(walk) {
  var directions = {
  'n': 0,
  's': 0,
  'e': 0,
  'w': 0
 }

 walk.forEach(e=>{
    directions[e]++
 })

  var displacement = {
    x: directions['n'] - directions['s'],
    y: directions['e'] - directions['w']
  }

  console.log(directions)


  return walk.length === 10 && displacement.x === 0 && displacement.y === 0;}


//console.log(isValidWalk(['n','s','n','s','n','s','n','s','n','s']))
//console.log(isValidWalk(['n','n','n','s','n','s','n','s','n','s']))




/*

Given the triangle of consecutive odd numbers:

             1
          3     5
       7     9    11
   13    15    17    19
21    23    25    27    29


*/


function rowSumOddNumbers(r){

  let oddarray = []
  let current_row = 1;

  for(n=1;n<=300;n++){

    let isOdd = n % 2 !== 0;

    if(isOdd){

        for(x=0;x<current_row;x++){

        if(!oddarray[current_row-1]){
            oddarray[current_row-1] = [n]

        }else{
            //row has already defined
            oddarray[current_row-1].push(n+=2)
         }

      }

      current_row++

    }

  }


    // let darray = [
  //     [1],
  //     [3, 5],
  //     [7, 9 , 11],
  //     [13, 15 , 17, 19],
  //     [21, 23 , 25, 27, 29]


  // ]


  return oddarray[r-1].reduce((acc,e)=>acc+e)


  }



//console.log(rowSumOddNumbers(2));




function getSum( a,b )
{

  if(a==b)return a;

  let sum = 0;

  let iv;
  let conditinoV;

  if(a > b){
    iv = b;
    conditinoV = a;
  }else{
    iv = a;
    conditinoV = b;
  }
  for(i=iv;i<=conditinoV;i++){
    sum+=i;
  }
  return sum;

}


//console.log(getSum(0,-1))



function findMissingLetter(array)
{

    var alphabet = [ 'a', 'b', 'c', 'd', 'e',
                   'f', 'g', 'h', 'i', 'j',
                   'k', 'l', 'm', 'n', 'o',
                   'p', 'q', 'r', 's', 't',
                   'u', 'v', 'w', 'x', 'y',
                   'z' ];

    let missing;


     for(i=0;i<array.length;i++){
        let current = array[i]
        let next = array[i+1]

        if(!next){
          break;
        }

         let nextIndex = alphabet.indexOf(next);
         let currentIndex = alphabet.indexOf(current) ;
        let diff = nextIndex - currentIndex
        if(diff > 1){
          missing = alphabet[currentIndex+1]
          break;
        }
        // console.log(`${current} ${next} diff ${diff}`)


     }

    return missing;
}


//console.log(findMissingLetter(['o','q','r','s']))




function openOrSenior(data){

  let results = []

  data.forEach(member=>{

    let age = member[0];
    let handicap = member[1];

    if(age >= 55 && handicap > 7){
      results.push('Senior')
    }else{
      results.push('Open')
    }

});

  return results;


}

// console.log(openOrSenior([[45, 12],[55,21],[19, -2],[104, 20]]))
// console.log(openOrSenior([[3, 12],[55,1],[91, -2],[54, 23]]))
// console.log(openOrSenior([[59, 12],[55,-1],[12, -2],[12, 12]]))



function maskify(cc){

  let chars = cc.split('')


  for(i=0;i<chars.length-4;i++){
    chars[i] = "#"
  }
  return chars.join('');


}


// console.log(maskify('1'))



function descendingOrder(n){

  let chars = n.toString().split('')
  let reverse = []

  for(i=chars.length;i>0;i--){
    reverse.push(chars[i-1])
  }
  return reverse;


}


// console.log(descendingOrder(123456789));



function isIsogram(str){


  let charMap = {}
  let isIsogram = true;

  str.split('').forEach(char=>{

    if(charMap[char]){
        isIsogram = false;
        return;;
       charMap[char]+=1
    }else{
      charMap[char] = 1
    }

  })

  return isIsogram;

}

// console.log(isIsogram("Dermatoglyphics"))
// console.log(isIsogram("isogram"))
// console.log(isIsogram("aba"))


function sum(x){

  if(x==1){
    return 1
  }else{
    return x + sum(x-1)
  }



}

//console.log(sum(3))


function power(n,pow){

  if(pow === 0) return 0;

  if(pow==1){
      return n;
  }else{
    return n * power(n,pow-1)
  }

}

//console.log(power(2, 4))



function all(array, cb){
  if(array.length !== 0){
    return cb(array[array.length-1]) && all( array.slice(0, array.length-1), cb)
  }else{
    return true;
  }
}
var allAreLessThanSeven = all([2,3,1], function(num){
	return num > 5;
});

//console.log(allAreLessThanSeven); // false




function length(str){

  let str_arry =   str.split('');

  if(str_arry.length !== 0){

      let x = str_arry.slice(1).join('');


      return 1 + length(x)
  }

  return 0;


}


// console.log(length("apple")


function getDays(date1, date2){

  return Math.abs(date1.getTime() - date2.getTime()) / (1000*60*60*24) //find how much miliseconds per day;
}



function LetterChanges(str){
  return str.split('').map(char=>{

    if(/^[A-Za-z]+$/.test(char)){

      let char_code;
      let char_from_code;

      switch (char) {
        case 'z':
          char_code = 97
          break;
        case 'Z':
          char_code = 65
          break;
        default:
          char_code = char.charCodeAt(0)+1
      }
      char_from_code = String.fromCharCode(char_code);
      return (['a','e','i','o','u'].indexOf(char_from_code.toLowerCase()) !== -1) ? char_from_code.toUpperCase() : char_from_code;

    }else{
      return char;
    }

  }).join('')
}
//console.log(LetterChanges("fun times!"))

//console.log("abc".charCodeAt(0))

// console.log(getDays(
//   new Date("June 14, 2019"),
//   new Date("June 20, 2019")
// ) )




function LongestWord(sen) {

  let words = [];

  sen.split(' ').forEach(word=>{
    word = word.replace(/[^\w\s]/gi, '')
    words.push({
      word,
      length: word.length
    })
  })

  return words.sort((a,b)=>b.length - a.length)[0].word;

}

// keep this function call here
//console.log(LongestWord("fun&!! time"));

//https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/
function jumpEnd(list){

  if(list.length !== 0){

     let no_of_jumps = list[0]
     let rest_array = [];
     let increment = 1;
     if(no_of_jumps == 0){
       rest_array = list.slice(1)
       increment = 0; // no increment
     }else{
       rest_array = list.slice(no_of_jumps)

     }
     return increment + jumpEnd(rest_array)



  }else{
    return 0;
  }
}



// 1, 3, 6, 3, 2, 3, 6, 8, 9, 5 => 1+
// no of jumps 1 =  3, 6, 3, 2, 3, 6, 8, 9, 5  => 1 +
// no of jumps 3 =  2, 3, 6, 8, 9, 5 => 1+
// no of jumps 2 =   6, 8, 9, 5 => 1+
// no of jumps 6 =  [] => 0_

// 3, 5, 8, 9, 2, 6, 7, 6, 8, 9 = 3 jumps


// console.log(jumpEnd([1, 3, 6, 3, 2, 3, 6, 8, 9, 5 ]))

function bubbleSort(list){
  for(i=0;i<list.length;i++){

    for(j=0;j<list.length;j++){

      let c = list[j];
      let n = list[j+1];

      if(c>n){
        list[j+1] = c;
        list[j] = n;

      }
    }
  }
return list;
}

//console.log(bubbleSort([5, 10, 1]))


function selectionSort(list){

  for(i=0;i<list.length;i++){


    let min;
    let min_pos;
    let sub_set = list.slice(i);

    for(k=0;k<sub_set.length;k++){

      if(min === undefined){
        min = sub_set[k]
      }else{
        if(sub_set[k] < min){
          min = sub_set[k]
          min_pos=k;

        }
      }
    }
    //swpe
    if(list[i] > min){
      let tempV = list[i];
       list[i] = min
       list[(list.length - sub_set.length)+min_pos] = tempV;
    }



  }



  return list;

}

//console.log(selectionSort([3,5,1,2,3,5,0]))

//
// let nowdate = new Date("1991/9/6");
// let month = nowdate.getMonth()+2;
// console.log(("0"+month).split('').splice(-2).join(''))



function removeProperty(obj, prop) {

  if(typeof obj[prop] !== undefined){
    delete obj[prop]
    return true
  }else{
    return false;
  }
}


// console.log(removeProperty({
//   test: 3
// },'test'))



// function createCheckDigit(membershipId) {
//
//   function sum(membershipId){
//     return membershipId.split('').reduce((a,b) => parseInt(a) + parseInt(b), 0);
//   }
//
//   let sum_v = sum(membershipId).toString();
//
//   while(sum_v.length != 1){
//     sum_v = sum(sum_v).toString();
//
//   }
//   return sum_v;
//
//
// }


function createCheckDigit(input) {

  function sum(arg){
    return arg.split('').reduce((a,b) => parseInt(a) + parseInt(b), 0);
  }

  let s_i = sum(input).toString();


  if(s_i.length == 1){
    return s_i;
  }else{
    return createCheckDigit(s_i)
  }



}


//console.log(createCheckDigit("55555"));  //7




// ARRAY 1
const texasss = [
  {
    name: 'Mike',
    age: 23,
    gender: 'm',
    us: false,
  },
  {
    name: 'Liz',
    age: 20,
    gender: 'f',
    us: true,
  },
  {
    name: 'Chris',
    age: 102,
    gender: 'm',
    us: true,
  },
  {
    name: 'Chuloo',
    age: 27,
    gender: 'm',
    us: false,
  },
  {
    name: 'Annie',
    age: 30,
    gender: 'f',
    us: true,
  },
]

// Part 1 - Find all users older than 24
// Part 2 - Find the total age of all users
// Part 3 - List all female coders


// ARRAY 2
const newieyork = [
  {
    name: 'Michelle',
    age: 19,
    coder:true,
    gender: 'f',
    us: true,
  },
  {
    name: 'Sam',
    age: 25,
    coder:false,
    gender: 'm',
    us: false,
  },
  {
    name: 'Ivy',
    age: 26,
    coder:true,
    gender: 'f',
    us: false,
  },
  {
    name: 'Nick',
    age: 32,
    coder:true,
    gender: 'm',
    us: true,
  },
  {
    name: 'Jim Beglin',
    age: 65,
    coder:false,
    gender: 'm',
    us: true,
  },
]

// Part 1 - List all users in US in ascending order
// Part 2 - Sort all users by age
// Part 3 -  List all female coders


// ARRAY 3
const vegzas = [
  {
    name: 'Charly',
    age: 32,
    coder:true,
    gender: 'm',
  },
  {
    name: 'Law',
    age: 21,
    coder:true,
    gender: 'm',
  },
  {
    name: 'Rosey',
    age: 42,
    coder:false,
    gender: 'f',
  },
  {
    name: 'Steph',
    age: 18,
    coder:true,
    gender:'f'
  },
  {
    name: 'Jon',
    age: 47,
    coder:false,
    gender: 'm',
  },
]

Array.prototype.sum = function(){
    let sum = 0;
    this.forEach(p=>sum+=p.age)
    return sum;
}




// Part 1 - Find the total age of male coders under 25
let malesUnder25 = vegzas.filter(p=>p.age < 25 && p.gender === 'm')
//console.log(malesUnder25)
// Part 2 - List all male coders over 30
let sumOfage = vegzas.map(p=>p.age).reduce((total, age) => total+age)
//console.log(sumOfage)
// Part 3 - Find the total age of everyone in texasss, newieyork and vegzas combined.











// write a function to format this data
/*
[
  {
    "title": "Sirira ranatunga",
    "children": [
      {
        "title": "Gayathri chamini",
        "children": [
          {
            "title": "Kalana thejitha",
            "children": [
              
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Ananda Permasiri",
    "children": [
      {
        "title": "Kalana thejitha",
        "children": [
          
        ]
      },
      {
        "title": "Nuwan Liyanage",
        "children": [
          {
            "title": "Baby1",
            "children": [
              {
                "title": "z",
                "children": [
                  
                ]
              }
            ]
          },
          {
            "title": "Baby2",
            "children": [
              
            ]
          }
        ]
      }
    ]
  }
]
*/
let data = [
    { 
        "title" : "Sirira ranatunga",
        "children" : [
            { 
                "title" : "Gayathri chamini",
                "children" : [

                    {
                      "title" : "Kalana thejitha",
                      "children" : []
                    }

                ]
            }
        ]
    },
    { 
        "title" : "Ananda Permasiri",
        "children" : [
            { 
                "title" : "Kalana thejitha",
                "children" : [

                ]
            },
            { 
                "title" : "Nuwan Liyanage",
                "children" : [

                    {
                      "title" : "Baby1",
                      "children" : [

                         {
                            "title" : "z",
                            "children" : []
                          }

                      ]
                    },
                    {
                      "title" : "Baby2",
                      "children" : []
                    }

                ]
            }
        ]
    }
]

function format(data){

    let people = [];
       
    if(data.length === 0){
        return []

    }else{

      for(let i=0;i<data.length;i++){

          let title = data[i].title;
          
          let temp = {
            title,
            children: getChilds(data[i].children)
          } 

          people.push(temp)


      }  

      return people; 

    
      
  }
    
  function getChilds(data){

    let child = [];

    if(data.length == 0){
      return []
    }else{

       data.forEach(c=>{

          let temp = {
            title: c.title
          }

          child.push(temp)

          let x = getChilds(c.children);

          temp.children = x;
          
       })

       return child
    }
 }

  
}


console.log(JSON.stringify(format(data)))


