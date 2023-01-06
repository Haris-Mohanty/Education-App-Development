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
chooseSubjectFunction(); //Page reload call

//SHOW SUBJECT RELATED QUESTION (Choose value)
//First option select start
let first_option = choose_subject.querySelectorAll("OPTION")[1];

choose_subject.addEventListener("change", () => {
  checkSubject();
  checkSubjectKey();
});
function checkSubject() {
  if (choose_subject.value == "choose subject") {
    //"choose subject" is <option> value in form
    subject = first_option.value;
  } else {
    subject = choose_subject.value;
  }
}
checkSubject(); //Page reload call
//Question update in localstorage successfully code start
function checkSubjectKey() {
  if (localStorage.getItem(brandcode + "_" + subject + "_question") != null) {
    allQuestion = JSON.parse(
      localStorage.getItem(brandcode + "_" + subject + "_question")
    );
  } else {
    allQuestion = [];
  }
}
checkSubjectKey(); //Page reload call
//Question update in localstorage successfully code end

function insertQuestionFunc(sub, id, ques, op1, op2, op3, op4, correctAns) {
  if (sub != undefined && id != undefined) {
    allQuestion[id] = {
      question: ques,
      optionOne: op1,
      optionTwo: op2,
      optionThree: op3,
      optionFour: op4,
      optionAns: correctAns,
    };
    localStorage.setItem(
      brandcode + "_" + sub + "_question",
      JSON.stringify(allQuestion)
    );
    swal("Updated!", "Question has been Updated successfully !", "success");
  } else {
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
      swal(
        "Congratulations!",
        "Your Question Stored Successfully !",
        "success"
      );
      question_form.reset();
    } else {
      swal("Invalid Choice!", "Please select a Subject !", "warning");
    }
  }
}
//CREATE QUESTIONS (CHOOSE SUBJECT VALUE SHOW) CODE END

//SHOW SUBJECT RELATED QUESTION : Showing question from local storage start
let new_question = [];
let visibleQuestion = document.querySelector(".visible-question");
select_subject.addEventListener("change", () => {
  if (
    localStorage.getItem(
      brandcode + "_" + select_subject.value + "_question"
    ) != null
  ) {
    new_question = JSON.parse(
      localStorage.getItem(brandcode + "_" + select_subject.value + "_question")
    );
    visibleQuestion.innerHTML = "";
    new_question_fun();
  } else {
    visibleQuestion.innerHTML = "<b style='color:red'>No Data Available!</b>";
  }
});
const new_question_fun = () => {
  new_question.forEach((question, index) => {
    visibleQuestion.innerHTML += `
    <div class="mb-5" index=${index}>
      <br>
      <div class="d-flex justify-content-between">
        <h3>${index + 1}. ${question.question}</h3>
        <div>
          <i class="fa fa-edit edit-btn-ques mx-2"></i>
          <i class="fa fa-save save-btn-ques d-none mx-2"></i>
          <i class="fa fa-trash del-btn-ques mx-2"></i>
        </div>
      </div>
      <br>
      <div>
        <span>A. ${question.optionOne}</span><br><br>
        <span>B. ${question.optionTwo}</span><br><br>
        <span>C. ${question.optionThree}</span><br><br>
        <span>D. ${question.optionFour}</span><br><br><br>
        <span class="bg-info p-3">${question.optionAns}</span>
      </div>
    </div>
    `;
  });
  //SHOW QUESTION "DELETE" START
  let allDelBtnQues = document.querySelectorAll(".del-btn-ques");
  let i;
  for (i = 0; i < allDelBtnQues.length; i++) {
    allDelBtnQues[i].onclick = function () {
      let parent = this.parentElement.parentElement.parentElement;
      let index = parent.getAttribute("index");

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          new_question.splice(index, 1); //Delete data from page localstorage
          localStorage.setItem(
            brandcode + "_" + select_subject.value + "_question",
            JSON.stringify(new_question)
          ); //Update local storage data
          parent.remove(); //Live Delete
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }
  //SHOW QUESTION "DELETE" END

  //SHOW QUESTION "EDIT" START
  let allEditBtnQues = document.querySelectorAll(".edit-btn-ques");
  for (i = 0; i < allEditBtnQues.length; i++) {
    allEditBtnQues[i].onclick = function () {
      let parent = this.parentElement.parentElement.parentElement;
      let index = +parent.getAttribute("INDEX"); //"+" it is used to add.
      let saveBtn = parent.querySelector(".save-btn-ques");
      this.classList.add("d-none");
      saveBtn.classList.remove("d-none");
      let h3 = parent.querySelector("H3");
      let span = parent.querySelectorAll("SPAN");
      // h3.style.border = "2px solid aqua";
      h3.contentEditable = true;
      h3.focus();
      let j;
      for (j = 0; j < span.length; j++) {
        span[j].contentEditable = true;
        span[j].style.border = "2px solid aqua";
      }
      saveBtn.onclick = function () {
        let sub = select_subject.value;
        let ques = h3.innerHTML.replace(`${index + 1}. `, ""); //Remove question number("use replace()")
        let op1 = span[0].innerHTML.replace("A.", "");
        let op2 = span[1].innerHTML.replace("B.", "");
        let op3 = span[2].innerHTML.replace("C.", "");
        let op4 = span[3].innerHTML.replace("D.", "");
        let correctAns = span[4].innerHTML;
        swal({
          title: "Are you sure?",
          text: "Click OK to Update Question !",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willUpdated) => {
          if (willUpdated) {
            insertQuestionFunc(
              sub,
              index,
              ques,
              op1,
              op2,
              op3,
              op4,
              correctAns
            );
            allEditBtnQues[index].classList.remove("d-none");
            saveBtn.classList.add("d-none");
            h3.contentEditable = false;
            for (j = 0; j < span.length; j++) {
              span[j].contentEditable = false;
              span[j].style.border = "none";
            }
          } else {
            swal("Your imaginary file is safe!");
          }
        });
      };
    };
  }
  //SHOW QUESTION "EDit" END
};
//SHOW SUBJECT RELATED QUESTION : Showing question from local storage End

//STUDENTS & TEACHERS REGISTRATION FORM CODE START
let registrationForm = document.querySelector(".registration-form");
let AllRegInput = registrationForm.querySelectorAll("INPUT");
let userType = registrationForm.querySelector("SELECT");
let address = registrationForm.querySelector("TEXTAREA");
let registrationData = [];

registrationForm.onsubmit = function (e) {
  e.preventDefault();
  registrationFunc();
  getRegistrationDataFun();//live update
};

// Get Data code start
if(localStorage.getItem(brandcode+"_registrationData")!= null){
  registrationData = JSON.parse(localStorage.getItem(brandcode+"_registrationData"));
}
// Get Data code end
//insert data in local storage
const registrationFunc = () => {
  if (userType.value != "choose type") {
    registrationData.push({
      name : AllRegInput[0].value,
      fatherName : AllRegInput[1].value,
      dob : AllRegInput[2].value,
      userType : userType.value,
      mobile : AllRegInput[3].value,
      enrollment : AllRegInput[4].value,
      password : AllRegInput[5].value,
      address : address.value,
      profilePic : "avtar.png"
    });
    localStorage.setItem(brandcode+"_registrationData", JSON.stringify(registrationData));
    swal("Registration Completed!", "Your Data has been Inserted Successfully !", "success");
    registrationForm.reset();
  } else {
    swal("Invalid Choice!", "Please select a Usertype !", "warning");
  }
};
//STUDENTS & TEACHERS REGISTRATION FORM CODE END

// REGISTRED STUDENT & TEACHERS DATA CODE START
const getRegistrationDataFun = () =>{
  let registrationDataEl = document.querySelector(".registration-data");
  registrationDataEl.innerHTML = "";
  registrationData.forEach((allData,index)=>{
    registrationDataEl.innerHTML += `
    <tr index=${index}>
      <th scope="row">${index+1}</th>
      <td>
        <div class="profile">
          <img src="${allData.profilePic}" width="40" height="40" style alt="Profile-pic">
        </div>
      </td>
      <td class="text-nowrap" style="width: 8rem;">${allData.name}</td>
      <td class="text-nowrap" style="width: 8rem;">${allData.fatherName}</td>
      <td class="text-nowrap" style="width: 8rem;">${allData.dob}</td>
      <td class="text-nowrap" style="width: 8rem;">${allData.userType}</td>
      <td class="text-nowrap" style="width: 8rem;">${allData.mobile}</td>
      <td class="text-nowrap" style="width: 8rem;">${allData.enrollment}</td>
      <td class="text-nowrap" style="width: 8rem;">${allData.password}</td>
      <td style="width: 8rem;">${allData.address}</td>
      <td class="text-nowrap" style="width: 8rem;">
        <i class="fa-solid fa-trash del-btn mx-3"></i>
        <i class='fa fa-eye edit-btn' data-bs-toggle="modal" data-bs-target="#MyModal"></i>
      </td>
    </tr>
    `;
  });
  //DELETE REGISTERED TEACHER & STUDENTS DATA CODE START
  let allDelBtnUserdata = registrationDataEl.querySelectorAll(".del-btn");
  let i;
  for (i=0; i<allDelBtnUserdata.length; i++){
    allDelBtnUserdata[i].onclick = function(){
      let parent = this.parentElement.parentElement;
      let index = parent.getAttribute("INDEX");
      //swal start
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          registrationData.splice(index,1);
          localStorage.setItem(brandcode+"_registrationData", JSON.stringify(registrationData));
          parent.remove();
          getRegistrationDataFun();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      //swal end
    }
  }
  //DELETE REGISTERED DATA CODE END

  //VIEW REGISTERED DATA START(Modal open and show data)
  let allEditBtnUserdata = registrationDataEl.querySelectorAll(".edit-btn");
  let j;
  for(j=0; j<allEditBtnUserdata.length; j++){
    allEditBtnUserdata[j].onclick = function(){
      let parent = this.parentElement.parentElement;
      let index = parent.getAttribute("index");
      let td = parent.querySelectorAll("td");
      let imgUrl = td[0].querySelector("img").src;
      let nameEl = td[1].innerHTML;
      let fatherName = td[2].innerHTML;
      let dob = td[3].innerHTML;
      let userType = td[4].innerHTML;
      let mobile = td[5].innerHTML;
      let enrollment = td[6].innerHTML;
      let password = td[7].innerHTML;
      let address = td[8].innerHTML;
      //Data updating in modal
      let profileBox = document.querySelector(".img-box");
      let modalForm = document.querySelector(".modal-from");
      let allModalInput = modalForm.querySelectorAll("INPUT");
      let modalTextarea = modalForm.querySelector("textarea");
      
    }
  }
  //VIEW REGISTERED DATA END
};
getRegistrationDataFun();
// REGISTRED STUDENT & TEACHERS DATA CODE END

//TOGGLER CODE / RESPONSIVE CODE START
let togglersBtn = document.querySelectorAll(".toggler-icon");
let sideNav = document.querySelector(".side-nav");
togglersBtn[0].onclick = function () {
  sideNav.classList.add("active");
  this.classList.add("d-none");
  togglersBtn[1].classList.remove("d-none");
};
togglersBtn[1].onclick = function () {
  sideNav.classList.remove("active");
  this.classList.add("d-none");
  togglersBtn[0].classList.remove("d-none");
};
//TOGGLER CODE / RESPONSIVE CODE END
