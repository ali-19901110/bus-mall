'use strict';

let maximumClicks = 25;
let attempts = 0;
let namesArr = [];
let arrOfVotes = [];
let imagesCountArr = [];
let arrOfFirstShow=[];

let leftImageElement  =  document.getElementById('leftImage');
let rightImageElement = document.getElementById('rightImage');
let centerImageElement= document.getElementById('centerImage');

let arrOfObjects=[];
function Product(name,source){
this.name=name;
this.source=source;
this.timesOfShow=0;
this.timesOfPick=0;
arrOfObjects.push(this);
namesArr.push(this.name)
}


new Product('bag','images/bag.jpg');
new Product('banana','images/banana.jpg');
new Product('bathroom','images/bathroom.jpg');
new Product('boots','images/boots.jpg');
new Product('breakfast','images/breakfast.jpg');
new Product('bubblegum','images/bubblegum.jpg');
new Product('chair','images/chair.jpg');
new Product('cthulhu','images/cthulhu.jpg');
new Product('dog-duck','images/dog-duck.jpg');
new Product('dragon','images/dragon.jpg');
new Product('pen','images/pen.jpg');
new Product('pet-sweep','images/pet-sweep.jpg');
new Product('water-can','images/water-can.jpg');
new Product('scissors','images/scissors.jpg');
new Product('shark','images/shark.jpg');
new Product('sweep','images/sweep.png');
new Product('tauntaun','images/tauntaun.jpg');
new Product('unicorn','images/unicorn.jpg');
new Product('usb','images/usb.gif');
new Product('wine-glass','images/wine-glass.jpg');

// console.log(arrOfObjects);

let leftImageIndex;
let rightImageIndex;
let centerImageIndex;
function checkAreImageDiff(){
    while(leftImageIndex === rightImageIndex){
        leftImageIndex = generateRandomIndex(); 
       }
    while(leftImageIndex ===  centerImageIndex){
        centerImageIndex = generateRandomIndex();
       }
    while(rightImageIndex === centerImageIndex){
        rightImageIndex = generateRandomIndex();
       }
}

function renderThreeRandomImages(){
    leftImageIndex  =  generateRandomIndex(); 
    rightImageIndex =  generateRandomIndex();
    centerImageIndex=  generateRandomIndex();
   //check is three images are diff          
   checkAreImageDiff();     
 while(arrOfFirstShow.includes(leftImageIndex) || arrOfFirstShow.includes(rightImageIndex)||arrOfFirstShow.includes(centerImageIndex)){
   
    
    leftImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex(); 
    
    centerImageIndex = generateRandomIndex(); 
  checkAreImageDiff();
 }
 console.log(arrOfFirstShow);
 arrOfFirstShow[0]=leftImageIndex;
 arrOfFirstShow[1]=rightImageIndex;
 arrOfFirstShow[2]=centerImageIndex;
   

//     //show images                                 
    leftImageElement.setAttribute('src', arrOfObjects[leftImageIndex].source); 
    rightImageElement.setAttribute('src', arrOfObjects[rightImageIndex].source);
    centerImageElement.setAttribute('src', arrOfObjects[centerImageIndex].source);
    //calculate numbersOfshow for every images
    for(let i=0;i <arrOfObjects.length;i++){
      if(i === leftImageIndex){
        arrOfObjects[i].timesOfShow++;
      }else if(i === rightImageIndex){
        arrOfObjects[i].timesOfShow++;
      }else if(i ===centerImageIndex){
        arrOfObjects[i].timesOfShow++;
      }
    }
                                           
}

renderThreeRandomImages();

function generateRandomIndex(){
let randomIndex = Math.floor(Math.random() * arrOfObjects.length); 
return randomIndex;
}


leftImageElement.addEventListener('click', handleClicking);
rightImageElement.addEventListener('click', handleClicking);
centerImageElement.addEventListener('click', handleClicking);
// id from the image
function handleClicking(event){
    attempts++;



    if(attempts <= maximumClicks){
        if(event.target.id === 'leftImage'){
            arrOfObjects[leftImageIndex].timesOfPick++;
        }else if(event.target.id === 'rightImage'){
            arrOfObjects[rightImageIndex].timesOfPick++;
        }else{
            arrOfObjects[centerImageIndex].timesOfPick++;
        }
      
        renderThreeRandomImages();
   
    } 
        
        else{
        for(let j = 0 ; j <arrOfObjects.length; j++){
            arrOfVotes.push(arrOfObjects[j].timesOfPick);
            imagesCountArr.push(arrOfObjects[j].timesOfShow);

        }

        chartRender();
        leftImageElement.removeEventListener('click', handleClicking);
        rightImageElement.removeEventListener('click', handleClicking);  
        centerImageElement.removeEventListener('click', handleClicking); 
}}

let Button= document.getElementById('t');
Button.addEventListener('click',myfun);
function myfun(event) {
    let unorderdList = document.getElementById('unList');
    let li;
    for(let i = 0 ; i < arrOfObjects.length; i++){
        li = document.createElement('li');
        unorderdList.appendChild(li);
                                          
        li.textContent = `${arrOfObjects[i].name} it has ${arrOfObjects[i].timesOfPick } timesOfPick.and  it has ${arrOfObjects[i].timesOfShow} timesOfShow.`
        
    }
}


function chartRender(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: namesArr,
            datasets: [{
                label: 'Product Votes',
                backgroundColor: '#e1cbbe',
                borderColor: 'rgb(255, 99, 132)',
                data: arrOfVotes,
            },{
                label: 'Product Displayed',
                backgroundColor: '#fdd1d1',
                borderColor:'rgb(130,100,30)',
                data:imagesCountArr,
    
            }]
        },
    
    });
}


