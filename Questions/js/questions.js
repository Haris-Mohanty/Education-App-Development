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
let index = 0;
const getQuestionFun = () => {
    let data = allQuestion[index];
    questionEl.innerHTML = `Q.${index+1}: ${data.question}`;
};
getQuestionFun();
//SHOWING QUESTION IN PAGE CODE END
