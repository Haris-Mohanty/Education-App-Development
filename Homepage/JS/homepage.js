//GET BRANDCODE FROM LOCALSTORAGE CODE START
let i;
let allBrandKey = [];
for (i = 0; i < localStorage.length; i++) {
  let allKeys = localStorage.key(i);
  if (allKeys.match("_brand")) {
    allBrandKey.push(allKeys.replace("_brand", ""));
  }
}
// //GET BRANDCODE FROM LOCALSTORAGE CODE END

// //SHOW BRANDCODE IN "CHOOSE BRAND CODE" OPTION CODE START
let brandCode_El = document.querySelector("#brand-code-el");
allBrandKey.forEach((bcode, index) => {
  brandCode_El.innerHTML += `
    <option value="${bcode}">${bcode}</option>
    `;
});
// //SHOW BRANDCODE IN "CHOOSE BRAND CODE" OPTION CODE END

//LOGIN CODE START
// let loginForm = document.querySelector(".login-form");
let allLoginInput = document.querySelectorAll("INPUT");
let loginBtn = document.querySelector(".login-btn");
let brandCode;
let allUserData = [];
brandCode_El.addEventListener("change", () => {
  if (brandCode_El.value != "Choose Brand Code") {
    sessionStorage.setItem("brandcode", brandCode_El.value);
    allLoginInput[0].disabled = false;
    allLoginInput[1].disabled = false;
    loginBtn.disabled = false;
    brandCode = sessionStorage.getItem("brandcode");
    loginUserFun();
  } else {
    allLoginInput[0].disabled = true;
    allLoginInput[1].disabled = true;
    loginBtn.disabled = true;
    swal("Unselected Brandcode!", "Please Select a Brandcode !", "warning");
  }
});

const loginUserFun = () => {
  if (localStorage.getItem(brandCode + "_registrationData") != null) {
    allUserData = JSON.parse(
      localStorage.getItem(brandCode + "_registrationData")
    );
  }
  loginBtn.onclick = function () {
    for (i = 0; i < allUserData.length; i++) {
      if (allUserData[i].enrollment == allLoginInput[0].value) {
        if(allUserData[i].password == allLoginInput[1].value){
          if(allUserData[i].userType == "Teacher"){
            sessionStorage.setItem("brandCode", brandCode);
            window.location = "../Dashboard/dashboard.html"
          }else{
            sessionStorage.setItem("enrollment", allUserData[i].enrollment);
            sessionStorage.setItem("name", allUserData[i].name);
            sessionStorage.setItem("address", allUserData[i].address);
            sessionStorage.setItem("fatherName", allUserData[i].fatherName);
            sessionStorage.setItem("brandCode", brandCode);
            sessionStorage.setItem("imgUrl", allUserData[i].profilePic)
            window.location = "../Guidelines/guidelines.html"
          }
        }else{
          swal("Incorrect Password!", "Please Contact your Brand Admin !", "error");
          return;
        }
        return;
      } else {
        swal("Incorrect Enrollment!", "Please Contact your Brand Admin !", "warning");
      }
    }
  };
  console.log(allUserData)
};
// // //LOGIN CODE END
