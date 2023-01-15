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
allBrandKey.forEach((code, index) => {
  brandCode_El.innerHTML += `
    <option value="${code}">${code}</option>
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
  if(localStorage.getItem(brandCode+"_registrationData") != null){
    allUserData = JSON.parse(localStorage.getItem(brandCode + "_registrationData"));
  }
  loginBtn.onclick = function(){
    for(i=0; i<allUserData.length; i++){
      if(allUserData[i].enrollment == allLoginInput[0].value){

      }else{
        
      }
    }
  }
};
// // //LOGIN CODE END
