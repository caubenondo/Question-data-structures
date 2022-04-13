const addQuestioFormEl = document.querySelector(".addQuestionForm");

/* ADDING QUESTION FORM */
document
  .querySelector("#addQuestion")
  .addEventListener("click", addQuestionToBank);

// this function take user inputs in the add question form and store new question object to the localstorage quizBank
function addQuestionToBank() {
  // target all the form's inputs and get their value
  const q = document.querySelector("#addPrompt").value;
  const a = document.querySelector("#addAnswerA").value;
  const b = document.querySelector("#addAnswerB").value;
  const c = document.querySelector("#addAnswerC").value;
  const d = document.querySelector("#addAnswerD").value;
  // except this one because we need to clear it later with seletedIndex,
  // it will be more efficient if we only get element ( not its direct value)
  const correct = document.querySelector("#correctAnswer");

  // create a new question object based on whatever user put into the form
  const newQuestion = {
    question: q,
    answers: {
      a: a,
      b: b,
      c: c,
      d: d,
    },
    correctAnswer: correct.value,
  };
  /* // add question to the localstorage by 
          retreiving/parsing localstoreage string, 
          adding question to array, 
          stringtify and store it back to localstorage
  */
  // grab the quizBank from localstorage
  let localBank = JSON.parse(localStorage.getItem("quizBank")) || [];
  // push the new quesiton object to quizBank array
  localBank.push(newQuestion);
  // store the quizbank back into localstorage
  localStorage.setItem("quizBank", JSON.stringify(localBank));

  // Clear or reset input values on the form
  const inputs = document.querySelectorAll(".addQuestionForm input");
  // console.log(inputs);
  inputs.forEach((input) => {
    input.value = "";
  });
  document.querySelector("#addPrompt").value = "";
  correct.selectedIndex = 0;
  // end clearing
}

const textOutputFormEl = document.querySelector('.textOutput');
const displayQuestionButton = document.querySelector('#displayQuestion');
const dataStructureSelect = document.querySelector('#dataStructure');

displayQuestionButton.addEventListener('click',function(){
    const seletectData = dataStructureSelect.value;

    if(seletectData == 'array'){
        console.log('array capture');
        let answer = oneArray();
        displayJSONstring(answer);
    }else if(seletectData =='arrayInArray'){
        let arrayArray = arrayInArray();
        displayJSONstring(arrayArray);
    }else if(seletectData =='objectStyle'){
        let objectArray = objectInArray();
        displayJSONstring(objectArray);
    }else{
        console.log('fail');
    }


});

function displayJSONstring(stuff){
    document.querySelector('.display').textContent = JSON.stringify(stuff);
}

function oneArray(){
    
    const theData = JSON.parse(localStorage.getItem("quizBank")) || [];
    let oneArray = [];
    theData.forEach(question => {
        oneArray.push([question.question,
            question.answers.a,
            question.answers.b,
            question.answers.c,
            question.answers.d,
            question.answers[question.correctAnswer],
        ]);
    });
    return oneArray;
}

function arrayInArray(){
    const theData = JSON.parse(localStorage.getItem("quizBank")) || [];
    let arrayInArray =[];
    theData.forEach(question => {
        arrayInArray.push([question.question,[
            question.answers.a,
            question.answers.b,
            question.answers.c,
            question.answers.d],
            question.answers[question.correctAnswer],
        ]);
    });
    return arrayInArray;
}

function objectInArray(){
    const theData = JSON.parse(localStorage.getItem("quizBank")) || [];
    let objectArray = [];
    theData.forEach(question =>{
        objectArray.push(
            question);
    });
    return objectArray;
}