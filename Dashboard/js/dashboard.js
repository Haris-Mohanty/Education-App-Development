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
//CREATE A EMPTY ARRAY TO PUSH OBJECT
let allSubject = [];
//STORE BTN BUTTON
subjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  StoreSubjectBtn();
});
const StoreSubjectBtn = () => {
  if (inputSubjectValue.value != "") {
    newSubject(); //Create a function
    inputSubjectValue.value = "";
  } else {
    swal("Subject Name is empty!", "Please Enter a Subject Name !", "warning");
  }
  updateSubject();
};

const newSubject = (subject,index) => {         //CALL ABOVE FUNCTION NEWSUBJECT()
  let subject_name = inputSubjectValue.value;
  if(subject){
    subject_name = subject.subjectName;
  }
  visibleSubject.innerHTML += `
  <div  class="d-flex subject-box justify-content-between align-items-center">
    <h3>${subject_name}</h3>
    <div>
      <i class="fa fa-edit mx-2" style="font-size: 22px;"></i>
      <i class="fa fa-save mx-2 d-none" style="font-size: 22px;"></i>
      <i class="fa fa-trash del-btn mx-2" style="font-size: 22px;"></i>
    </div>
  </div>
  `;
//SUBJECT DELETE CODE START
let delAllBtn = visibleSubject.querySelectorAll(".del-btn");
let i;
for (i=0 ; i<delAllBtn.length ; i++){
  delAllBtn[i].onclick = function(){
    let parent = this.parentElement.parentElement;
    //sweet alert code start
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        parent.remove(); //REMOVE DATA FROM PAGE BUT NOT LOCALSTORAGE
        updateSubject(); //UPDATE LOCAL STORAGE DATA
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    //sweet alert code end
  }
}
//SUBJECT DELETE CODE END
};

//SUBJECT NAME GET FROM LOCAL STORAGE START
if(localStorage.getItem(brandcode+"_allSubject") != null){
  allSubject = JSON.parse(localStorage.getItem(brandcode+"_allSubject"));
  allSubject.forEach((subject , index)=>{
    newSubject(subject,index);
  })
}
//SUBJECT NAME GET FROM LOCAL STORAGE END

//UPDATE SUBJECT NAME IN LOCAL STORAGE START
function updateSubject(){
  let subjectBox = visibleSubject.querySelectorAll(".subject-box");
  let i;
  allSubject = [];
  for(i=0; i<subjectBox.length; i++){
    let h3 = subjectBox[i].getElementsByTagName("H3");
    allSubject.push({
      subjectName : h3[0].innerHTML
    });
  }
  //SET SUBJECT IN LOCAL STORAGE
  localStorage.setItem(brandcode+"_allSubject" , JSON.stringify(allSubject));
}
//UPDATE SUBJECT NAME IN LOCAL STORAGE END

//SUBJECT CODING END
