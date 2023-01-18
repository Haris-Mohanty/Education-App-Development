let brandCode = sessionStorage.getItem("brandCode");
let allSubject = [];
let selectSubjectEl = document.querySelector("#select-subject");
console.log(selectSubjectEl);
//GET SUBJECT FROM LOCALSTORAGE CODE START
if (localStorage.getItem(brandCode + "_allSubject") != null) {
  allSubject = JSON.parse(localStorage.getItem(brandCode + "_allSubject"));
  allSubject.forEach((subject, index) => {
    selectSubjectEl.innerHTML += `
    <option>${subject.subjectName}</option>
    `;
  });
}
//GET SUBJECT FROM LOCALSTORAGE CODE END

//START EXAM BUTTON CODE START
let startExambtn = document.querySelector(".start-exam-btn");
startExambtn.onclick = function () {
    alert()
};

//START EXAM BUTTON CODE END