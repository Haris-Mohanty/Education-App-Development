let brandCode = sessionStorage.getItem("brandCode");
let enrollment = sessionStorage.getItem("enrollment");
let allSubject = [];
let selectSubjectEl = document.querySelector("#select-subject");
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
//GET COOKIE CODE START
selectSubjectEl.addEventListener("change", ()=>{
  let allCookie = [];
  let cookie = document.cookie.split(";");
  cookie.forEach((data)=>{
    allCookie.push(data.trim());
  });
  if(cookie.indexOf(brandCode+"_"+selectSubjectEl.value+"_"+enrollment+"=done") != -1){
    swal("Already Attempted!", "Please Change another Subject !", "warning");
    startExambtn.disabled = true;
  }else{
    startExambtn.disabled = false;
  }
});

//GET COOKIE CODE END

//START EXAM BUTTON CODE START
let startExambtn = document.querySelector(".start-exam-btn");
startExambtn.onclick = function () {
  if (selectSubjectEl.value != "Choose Subject") {
    let subject = selectSubjectEl.value;
    sessionStorage.setItem("subject", subject);
    window.location = "../Questions/question.html";
  } else {
    swal("Select Subject!", "Please Select a Subject !", "warning");
  }
};

//START EXAM BUTTON CODE END
