let subject = sessionStorage.getItem("subject");
let brandCode = sessionStorage.getItem("brandCode");
let allQuestion = [];
//GET QUESTION FROM LOCALSTORAGE CODE START
if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
  allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
  console.log(allQuestion);
}
//GET QUESTION FROM LOCALSTORAGE CODE END
