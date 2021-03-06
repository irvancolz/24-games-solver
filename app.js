const formInput = document.querySelector('#game-form');
const firstNumber = document.querySelector('#firstNumber');
const secondNumber = document.querySelector('#secondNumber');
const thirdNumber = document.querySelector('#thirdNumber');
const fourthNumber = document.querySelector('#fourthNumber');
const triggerbtn = document.querySelector('.trigger-btn');
const clearbtn = document.querySelector('.clear');
const target = 24;
let finalResults = [];
let starterValue = [];

formInput.addEventListener('submit', (e)=>{
    e.preventDefault();
    starterValue = [firstNumber.value, secondNumber.value, thirdNumber.value,fourthNumber.value];
   
    getGameResults('', 0)
})



function getGameResults(curExprs, curNumb){
    if(eval(curExprs) == target){
        const isSimiliar = finalResults.filter( res =>{
            return res === curExprs;
        });
        if(!isSimiliar.length){
            if(curNumb == starterValue.length){
                finalResults.push(curExprs)
            }
        }
    }
    const operator = ['+', '-', '*', '/'];
    // looping for the current expression
    for(let escNumb = curNumb; escNumb < starterValue.length; escNumb++ ){
        // looping for choosing the next value
       if(curNumb == 0){
        getGameResults(`${starterValue[escNumb]}`, curNumb + 1)
       }else{
        for(let opr = 0; opr < starterValue.length; opr++){
            // check if there is a same value on the starter value
            const isDuplicate = searchSimiliarValue(starterValue);
            if(isDuplicate){
                getGameResults(`${curExprs} + ${starterValue[opr]}`, curNumb + 1);
                getGameResults(`${curExprs} - ${starterValue[opr]}`, curNumb + 1);
                getGameResults(`${curExprs} * ${starterValue[opr]}`, curNumb + 1);
                getGameResults(`${curExprs} / ${starterValue[opr]}`, curNumb + 1);
            }else{
                // make sure there is no duplicate number in the current expression with the walue will assigned
                if(!curExprs.includes(starterValue[opr])){
                    getGameResults(`${curExprs} + ${starterValue[opr]}`, curNumb + 1);
                    getGameResults(`${curExprs} - ${starterValue[opr]}`, curNumb + 1);
                    getGameResults(`${curExprs} * ${starterValue[opr]}`, curNumb + 1);
                    getGameResults(`${curExprs} / ${starterValue[opr]}`, curNumb + 1);
                }
            }
        }
       }
    }
    
}

function searchSimiliarValue(arry){
    let resultToReturn = false;
    for(let i = 0; i < arry.length; i++){
        for(let j = 0; j < arry.length; j++){
            if( i !== j){
                if( arry[i] == arry[j]){
                    return resultToReturn = true;
                }
            }
        }
    }
    return resultToReturn
}

triggerbtn.addEventListener('click', (e)=>{
    const answerContainer = document.querySelector('.answer-list');
    if(finalResults.length > 0){
        answerContainer.innerHTML= '';
        finalResults.forEach(res =>{
            const answer = document.createElement('li');
            answer.classList.add('answer');
            answer.innerHTML = res;
            answerContainer.append(answer)
        })
    }else{
        answerContainer.innerHTML= '';
        const answer = document.createElement('li');
        answer.classList.add('answer');
        answer.innerHTML = 'Sorry no solution is found';
        answerContainer.append(answer)
    }

})

clearbtn.addEventListener('click', ()=>{
    const answerContainer = document.querySelector('.answer-list');
    answerContainer.innerHTML = '';
    firstNumber.value = null;
    secondNumber.value = null;
    thirdNumber.value = null;
    fourthNumber.value = null;
})
