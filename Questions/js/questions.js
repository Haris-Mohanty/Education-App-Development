let subject = sessionStorage.getItem("subject");
let brandCode = sessionStorage.getItem("brandCode");
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
let questionEl = document.querySelector(".question-el");
let allOptions = document.querySelectorAll(".option");
const getQuestionFun = () => {
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
    alert(rightAns);
  } else {
    wrongAns++;
    alert(wrongAns);
  }
  index++;
  getQuestionFun();
  return;
});
const getAnswer = () => {
  let answer;
  allOptions.forEach((input) => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};
//NEXT BUTTON CODE END
