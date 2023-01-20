//RECEIVE SESSIONSTORAGE DATA CODE START
let nameEl = sessionStorage.getItem("name");
let address = sessionStorage.getItem("address");
let fatherName = sessionStorage.getItem("fatherName");
let enrollment = sessionStorage.getItem("enrollment");
let subject = sessionStorage.getItem("subject");
let brandCode = sessionStorage.getItem("brandCode");
//RECEIVE SESSIONSTORAGE DATA CODE END
let allQuestion = [];
//GET QUESTION FROM LOCALSTORAGE CODE START
if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
  allQuestion = JSON.parse(
    localStorage.getItem(brandCode + "_" + subject + "_question")
  );
}
//GET QUESTION FROM LOCALSTORAGE CODE END

//SHOWING QUESTION IN PAGE CODE START
let index = 0;
let rightAns = 0;
let wrongAns = 0;
let totalQues = allQuestion.length;
let questionEl = document.querySelector(".question-el");
let allOptions = document.querySelectorAll(".option");
const getQuestionFun = () => {
  if (index == totalQues) {
    return endExam();
  }
  resetFunc(); //RESET function call
  let data = allQuestion[index];
  questionEl.innerHTML = `Q.${index + 1}: ${data.question}`;
  allOptions[0].nextElementSibling.innerHTML = data.optionOne;
  allOptions[1].nextElementSibling.innerHTML = data.optionTwo;
  allOptions[2].nextElementSibling.innerHTML = data.optionThree;
  allOptions[3].nextElementSibling.innerHTML = data.optionFour;
};
getQuestionFun();
//SHOWING QUESTION IN PAGE CODE END

//NEXT BUTTON CODE START
let nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  let data = allQuestion[index];
  let ans = getAnswer();
  if (ans == data.optionAns) {
    rightAns++;
  } else {
    wrongAns++;
  }
  index++;
  getQuestionFun(); //NEXT page question showing.
  return;
});
const getAnswer = () => {
  let answer;
  allOptions.forEach((input) => {
    if (input.checked) {
      answer = input.value; //Get options value to Match.
    }
  });
  return answer;
};
//NEXT BUTTON CODE END

//WHEN CLICK ON NEXT BUTTON :- AUTO SELECT OFF.
function resetFunc() {
  allOptions.forEach((input) => {
    input.checked = false;
  });
}

//AFTER QUESTION FINISH :- (FINISH MESSAGE SHOWING IN MAIN DIV).
let mainBox = document.querySelector(".main");
const endExam = () => {
  mainBox.innerHTML = `
  <h2>Click On Submit to Complete The Examination.</h2>
  <div align = "center">
  <button class="btn btn-info text-white submit-btn">Submit</button>
  </div>
  `;
  //SUBMIT BUTTON CODE
  let submitBtn = document.querySelector(".submit-btn");
  if(localStorage.getItem(brandCode+"_"+subject+"_result") != null){
    allUserResult = JSON.parse(localStorage.getItem(brandCode+"_"+subject+"_result"));
  }
  submitBtn.onclick = function () {
    allUserResultfunc();
    this.innerHTML = "Redirecting to Homepage...";
    this.disabled = true;
  };
};

let allUserResult = [];
const allUserResultfunc = () => {
  allUserResult.push({
    name: nameEl,
    enrollment: enrollment,
    rightAns: rightAns,
    wrongAns: wrongAns,
    subject: subject,
    maxMark: totalQues,
  });
  localStorage.setItem(brandCode +"_"+ subject + "_result", JSON.stringify(allUserResult));
  setTimeout(function () {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("fatherName");
    sessionStorage.removeItem("brandCode");
    sessionStorage.removeItem("subject");
    window.location = "../Homepage/homepage.html";
  }, 2000);
};
