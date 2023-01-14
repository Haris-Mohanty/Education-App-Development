//GET BRANDCODE FROM LOCALSTORAGE CODE START
let i;
let allBrandKey = [];
for (i = 0; i < localStorage.length; i++) {
  let allKeys = localStorage.key(i);
  if (allKeys.match("_brand")) {
    allBrandKey.push(allKeys.replace("_brand", ""));
  }
}
//GET BRANDCODE FROM LOCALSTORAGE CODE END

//SHOW BRANDCODE IN "CHOOSE BRAND CODE" OPTION CODE START
let brandCode_El = document.querySelector("#brand-code-el");
allBrandKey.forEach((code, index) => {
  brandCode_El.innerHTML += `
    <option value="${code}">${code}</option>
    `;
});
//SHOW BRANDCODE IN "CHOOSE BRAND CODE" OPTION CODE END

//LOGIN CODE START
let loginForm = document.querySelector(".login-form");
let allLoginInput = loginForm.querySelectorAll("INPUT");
let loginBtn = loginForm.querySelector(".login-btn");
// loginBtn[0].disabled = true;
brandCode_El.addEventListener("change", () => {
  if(brandCode_El.value != "Choose Brand Code"){
    
  }else{
    swal("Unselected Brandcode!", "Please Select a Brandcode !", "warning")
  }
});
//LOGIN CODE END
