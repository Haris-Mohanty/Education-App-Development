let brandCode = sessionStorage.getItem("brandCode");
let allSubject = [];
//GET SUBJECT FROM LOCALSTORAGE CODE START
if(localStorage.getItem(brandCode + "_allSubject") != null){
    allSubject = JSON.parse(localStorage.getItem(brandCode+"_allSubject"));
    console.log(allSubject)
}
//GET SUBJECT FROM LOCALSTORAGE CODE END