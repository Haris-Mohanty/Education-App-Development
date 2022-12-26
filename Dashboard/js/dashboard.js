// GET DATA FROM SESSION STORAGE AND SHOW LOGIN USER START
let brandcode;
brandcode = sessionStorage.getItem("brandCode");
if (brandcode == null) {
  document.body.innerHTML = "";
  document.body.style.background = "black";
  swal("Unauthorised User!", "Please Login Again to Enter!", "warning");
  //Redirecting to Login page
  setTimeout(function () {
    window.location = "../company/company.html";
  }, 4000);
}
let allUserData = JSON.parse(localStorage.getItem(brandcode + "_brand"));
let brand_name = document.getElementById("brand-name");
brand_name.innerHTML = "Wel Come : " + allUserData.brandName;

// GET DATA FROM SESSION STORAGE AND SHOW LOGIN USER END

//LOGOUT CODE START
let log_out_btn = document.getElementById("log-out-btn");
log_out_btn.addEventListener("click", (e) => {
  e.target.innerHTML = "Please wait...";
  e.target.style.background = "#253c42";
  setTimeout(function () {
    window.location = "../company/company.html";
    sessionStorage.removeItem("brandCode");
  }, 3000);
});
//LOGOUT CODE END

//SUBJECT CODING START
let visibleSubject = document.querySelector(".visible-subject");
let inputSubjectValue = document.querySelector(".subject");
let subjectBtn = document.querySelector(".subject-btn");
//Create a empty array to push objects
let allSubject = [];
//STORE BTN BUTTON
subjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  StoreSubjectBtn();
});
const StoreSubjectBtn = () => {
  if (inputSubjectValue.value != "") {
    newSubject(); //Create a function
    swal("Congrats!", "Your Subject has been stored successful !", "success");
    inputSubjectValue.value = "";
  } else {
    swal("Subject Name is empty!", "Please Enter a Subject Name !", "warning");
  }
  updateSubject();
};

const newSubject = (subject, index) => {
  //Call the above function newSubject()
  let subject_name = inputSubjectValue.value;
  if (subject) {
    subject_name = subject.subjectName;
  }
  visibleSubject.innerHTML += `
  <div  class="d-flex subject-box justify-content-between align-items-center">
    <h3 style="font-size:20px" index='${index}'>${subject_name}</h3>
    <div>
      <i class="fa fa-edit edit-btn mx-2" style="font-size: 22px;"></i>
      <i class="fa fa-save save-btn mx-2 d-none" style="font-size: 22px;"></i>
      <i class="fa fa-trash del-btn mx-2" style="font-size: 22px;"></i>
    </div>
  </div>
  `;
  //SUBJECT "DELETE" CODE START
  let delAllBtn = visibleSubject.querySelectorAll(".del-btn");
  let i;
  for (i = 0; i < delAllBtn.length; i++) {
    delAllBtn[i].onclick = function () {
      let parent = this.parentElement.parentElement;
      //sweet alert code start
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          parent.remove(); //Remove data from page but not local storage
          updateSubject(); //Update local storage data
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      //sweet alert code end
    };
  }
  //SUBJECT "DELETE" CODE END

  //SUBJECT "EDIT" BUTTON CODE START
  let editAllBtn = visibleSubject.querySelectorAll(".edit-btn");
  for (i = 0; i < editAllBtn.length; i++) {
    editAllBtn[i].onclick = function () {
      let parent = this.parentElement.parentElement;
      let saveBtn = parent.querySelector(".save-btn");
      let h3 = parent.getElementsByTagName("H3");
      h3[0].contentEditable = true;
      h3[0].focus();
      this.classList.add("d-none");
      saveBtn.classList.remove("d-none");
      saveBtn.onclick = function () {
        let editedSub = h3[0].innerHTML;
        let id = h3[0].getAttribute("index");
        updateSubject(editedSub, id);
        this.classList.add("d-none");
        editAllBtn[id].classList.remove("d-none");
        h3[0].contentEditable = false;
      };
    };
  }
  //SUBJECT "EDIT" BUTTON CODE END
};

//SUBJECT NAME GET FROM LOCAL STORAGE START
if (localStorage.getItem(brandcode + "_allSubject") != null) {
  allSubject = JSON.parse(localStorage.getItem(brandcode + "_allSubject"));
  allSubject.forEach((subject, index) => {
    newSubject(subject, index);
  });
}
//SUBJECT NAME GET FROM LOCAL STORAGE END

//UPDATE SUBJECT NAME IN LOCAL STORAGE START
function updateSubject(subject, id) {
  if (subject != undefined && id != undefined) {
    allSubject[id] = {
      subjectName: subject,
    };
  } else {
    let subjectBox = visibleSubject.querySelectorAll(".subject-box");
    let i;
    allSubject = [];
    for (i = 0; i < subjectBox.length; i++) {
      let h3 = subjectBox[i].getElementsByTagName("H3");
      allSubject.push({
        subjectName: h3[0].innerHTML,
      });
    }
  }
  //SET SUBJECT IN LOCAL STORAGE
  localStorage.setItem(brandcode + "_allSubject", JSON.stringify(allSubject));
}
//UPDATE SUBJECT NAME IN LOCAL STORAGE END

//SUBJECT CODING END

//CREATE QUESTIONS (CHOOSE SUBJECT VALUE SHOW) CODE START
let choose_subject = document.getElementById("choose-subject");
let question_form = document.querySelector(".question-form");
let allQuestionInput = question_form.querySelectorAll("INPUT");
let select_subject = document.querySelector("#select-subject");
let allQuestion = [];
let subject;
question_form.addEventListener("submit", (e) => {
  e.preventDefault();
  insertQuestionFunc();
});
const chooseSubjectFunction = () => {
  allSubject.forEach((subject, index) => {
    choose_subject.innerHTML += `
    <Option>${subject.subjectName}</Option>
    `;
    select_subject.innerHTML += `
    <Option>${subject.subjectName}</Option>
    `;
  });
};
chooseSubjectFunction();//Page reload call

//SH
//First option select start
let first_option = choose_subject.querySelectorAll("OPTION")[1];

choose_subject.addEventListener("change", () => {
checkSubject();
checkSubjectKey();
});
function checkSubject() {
  if (choose_subject.value == "choose subject") {   //"choose subject" is <option> value in form
    subject = first_option.value;
  } else {
    subject = choose_subject.value;
  }
}
checkSubject();//Page reload call
//Question update in localstorage successfully code start
function checkSubjectKey(){
  if(localStorage.getItem(brandcode+"_"+subject+"_question") != null){
    allQuestion = JSON.parse(localStorage.getItem(brandcode+"_"+subject+"_question"));
  }else{
    allQuestion = [];
  }
}
checkSubjectKey(); //Page reload call
//Question update in localstorage successfully code end

function insertQuestionFunc() {
  if (choose_subject.value != "choose subject") {
    //"choose subject" is <option> value in form
    allQuestion.push({
      question: allQuestionInput[0].value,
      optionOne: allQuestionInput[1].value,
      optionTwo: allQuestionInput[2].value,
      optionThree: allQuestionInput[3].value,
      optionFour: allQuestionInput[4].value,
      optionAns: allQuestionInput[5].value,
    });
    localStorage.setItem(
      brandcode + "_" + choose_subject.value + "_question",
      JSON.stringify(allQuestion)
    );
    swal("Congratulations!", "Your Question Stored Successfully !", "success");
    question_form.reset();
  } else {
    swal("Invalid Choise!", "Please select a Subject !", "warning");
  }
}
//CREATE QUESTIONS (CHOOSE SUBJECT VALUE SHOW) CODE END
