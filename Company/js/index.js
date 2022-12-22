//NAVBAR SIGNIN AND SIGNUP BUTTON CODING START
let signupBtn = document.querySelector(".signup-btn");
let loginBtn = document.querySelector(".login-btn");
let loginBox = document.querySelector(".login-box");
let signupBox = document.querySelector(".signup-box");

signupBtn.addEventListener("click", () => {
  signupBox.classList.add("active");
  loginBox.classList.remove("active");
  loginBtn.classList.remove("d-none");
  signupBtn.classList.add("d-none");
});

loginBtn.addEventListener("click", () => {
  signupBox.classList.remove("active");
  loginBox.classList.add("active");
  loginBtn.classList.add("d-none");
  signupBtn.classList.remove("d-none");
});
//NAVBAR SIGNIN AND SIGNUP BUTTON CODING END

//SIGN UP CODING START
let signupForm = document.querySelector(".signup-form");
let signupAllinput = signupForm.querySelectorAll("INPUT");
let signupTextarea = signupForm.querySelector("TEXTAREA");
let formSignupbtn = document.getElementById("form-signup-btn");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signupData();
});

const signupData = () => {
  formSignupbtn.innerHTML = "Registration Processing..."
  formSignupbtn.style.fontSize = "18px";
  formSignupbtn.style.textTransform = "capitalize"
  formSignupbtn.disabled = true;
  //USING SET TIMEOUT TO DISPLAY REGISTRATION PROCESSING...
  setTimeout(function(){
    //CREATE A KEY TO SET IN LOCALSTORAGE 
    if (localStorage.getItem(signupAllinput[0].value + "_brand") == null) {
      const userData = {
        brandCode: signupAllinput[0].value,
        brandName: signupAllinput[1].value,
        website: signupAllinput[2].value,
        contact: signupAllinput[3].value,
        address: signupTextarea.value,
        userName: signupAllinput[4].value,
        password: signupAllinput[5].value,
      };
      //SET DATA TO LOCAL STORAGE CODE START
      const userString = JSON.stringify(userData);
      localStorage.setItem(signupAllinput[0].value + "_brand", userString);
      //SET DATA TO LOCAL STORAGE CODE END
      signupForm.reset("");
      swal("Congrats !", "Your Registration has been Successfully Completed !", "success");
    } else {
      swal("Please Change Brand Code !", "This brand code is already exits !", "warning");
    }
    //CHANGE BUTTON STYLE TO DEFALUT
    formSignupbtn.innerHTML = "Sign Up"
    formSignupbtn.style.fontSize = "22px";
    formSignupbtn.style.textTransform = "uppercase"
    formSignupbtn.disabled = false;
  },2000);
};
//SIGN UP CODING END

//LOGIN CODEING START
let loginForm = document.querySelector(".login-form");
let loginAllinput = loginForm.querySelectorAll("INPUT");
let formLoginbtn = document.getElementById("form-login-btn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginData();
});

const loginData = () => {
  if (localStorage.getItem(loginAllinput[0].value + "_brand") != null) {
    //GET DATA FROM LOCAL STORAGE
    let allData = JSON.parse(localStorage.getItem(loginAllinput[0].value + "_brand"));
    if (allData.userName == loginAllinput[1].value) {
      if(allData.password == loginAllinput[2].value){
        formLoginbtn.innerHTML = "Please wait..."
        formLoginbtn.disabled = true;
        setTimeout(function(){
          window.location = "../dashboard/dashboard.html";
          sessionStorage.setItem("brandCode" , loginAllinput[0].value);
        },3000);
      }else{
        swal("Incorrect Password !", "Please Enter a Valid Password!", "error");
      }
    } else {
      swal("Incorrect User Name !", "Please Check Username!", "error");
    }
  } else {
    swal("Incorrect Brand Code !", "Brand Code is not registered in our Database!", "error");
  }
};
//LOGIN CODEING END