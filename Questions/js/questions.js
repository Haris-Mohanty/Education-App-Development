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
let questionEl = document.querySelector(".question-el");
let allOptions = document.querySelectorAll(".option");
let index = 0;
const getQuestionFun = () => {
    let data = allQuestion[index];
    questionEl.innerHTML = `Q.${index+1}: ${data.question}`;
    allOptions[0].nextElementSibling.innerHTML = data.optionOne;
    allOptions[1].nextElementSibling.innerHTML = data.optionTwo;
    allOptions[2].nextElementSibling.innerHTML = data.optionThree;
    allOptions[3].nextElementSibling.innerHTML = data.optionFour;
};
getQuestionFun();
//SHOWING QUESTION IN PAGE CODE END
