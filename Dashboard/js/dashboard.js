// GET DATA FROM SESSION STORAGE AND SHOW LOGIN USER START
let brandcode;
brandcode = sessionStorage.getItem("brandCode");
if (brandcode == null) {
  document.body.innerHTML = "";
  document.body.style.background = "black";
  swal("Unauthorised User!", "Please Login Again to Enter!", "warning");
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
let allSubject = [];
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

const newSubject = (subject,index) => {         //function call
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
      <i class="fa fa-trash mx-2" style="font-size: 22px;"></i>
    </div>
  </div>
  `;
};

if(localStorage.getItem(brandcode+"_allSubject") != null){
  allSubject = JSON.parse(localStorage.getItem(brandcode+"_allSubject"));
  allSubject.forEach((subject , index)=>{
    newSubject(subject,index);
  })
}

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
  localStorage.setItem(brandcode+"_allSubject" , JSON.stringify(allSubject));
}

//SUBJECT CODING END
