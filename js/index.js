const URL_API = "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products";
let listProduct = [];

let createProduct = async ()=> {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let screen = document.getElementById("screen").value;
    let backCamera = document.getElementById("backCamera").value;
    let frontCamera = document.getElementById("frontCamera").value;
    let img = document.getElementById("img").value;
    let desc = document.getElementById("desc").value;
    let type = document.getElementById("type").value;
    let quantity = document.getElementById("quantity").value;
    let newProduct = new Product(name, price, screen, backCamera, frontCamera, img, desc, type,'', quantity);
    await axios.post(URL_API,newProduct);
    getProductAPI();
    resetForm();
}
const deleteProduct = async (id)=>{
    await axios.delete(`${URL_API}/${id}`);
    getProductAPI();
}
const getProductAPI = async () => {
    try {
        const response = await axios.get(URL_API);
        listProduct = mapProductList(response.data);
        renderProductList(listProduct);
        return listProduct;

    } catch (error) {
        console.error(error);
    }
}

const mapProductList = (data) => {
    const result = data.map(data => new Product(data.name, data.price, data.screen, data.backCamera, data.frontCamera, data.img, data.desc, data.type, data.id, data.quantity));
    return result;
}
const findById = async (id)=> {
    let response = await axios.get(URL_API);
    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].id === id) {
            console.log(id)
            return id;
        }
    }
    return -1;
}
const getInfoProduct = async(id)=>{
    let index = findById(id);
    if(index===-1){
        alert("Not find");
        return;
    }
    let foundProduct = await axios.get(`${URL_API}/${id}`);
    document.getElementById("name").value = foundProduct.data.name;
    document.getElementById("price").value = foundProduct.data.price;
    document.getElementById("screen").value = foundProduct.data.screen;
    document.getElementById("backCamera").value = foundProduct.data.backCamera;
    document.getElementById("frontCamera").value = foundProduct.data.frontCamera;
    document.getElementById("img").value = foundProduct.data.img;
    document.getElementById("desc").value = foundProduct.data.desc;
    document.getElementById("type").value = foundProduct.data.type;
    document.getElementById("quantity").value = foundProduct.data.quantity;
    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("btnCapNhat").style.display = "inline-block";
    $('#btnCapNhat').click(async () => {
        updateProduct(id);
    })
    
}

const updateProduct = async (id)=> {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let screen = document.getElementById("screen").value;
    let backCamera = document.getElementById("backCamera").value;
    let frontCamera = document.getElementById("frontCamera").value;
    let img = document.getElementById("img").value;
    let desc = document.getElementById("desc").value;
    let type = document.getElementById("type").value;
    let quantity = document.getElementById("quantity").value;
    let index = findById(id);
    if (index === -1) {
        alert("Not find");
        return;
    }
    const updatedProduct = {
        "name": name,
        "price": price,
        "screen": screen,
        "backCamera": backCamera,
        "frontCamera": frontCamera,
        "img": img,
        "desc": desc,
        "type": type,
        "quantity": quantity,
    }
    await axios.put(`${URL_API}/${id}`,updatedProduct);
    getProductAPI();
    resetForm();
    document.getElementById("btnDong").click();

};

let findProductType = async ()=> {
    let keyWord = document.getElementById("searchType").value.toLowerCase();
    let results = [];
    let response = await axios.get(URL_API);
    console.log(results.push(mapProductList(response.data)));
    
    for (let i = 0; i < response.data.length; i++) {
        let typeProduct = response.data[i].type;
        if (typeProduct.includes(keyWord)) {
            results.push(response.data[i]);
        }
    }
    console.log(results);
    renderProductList(results);
}


const renderProductList =function (data){
    let productListHTML = '';
    for (let i = 0; i < data.length; i++) {
        productListHTML += `
            <tr>
                <td style="vertical-align: middle;">${i + 1}</td>
                <td style="vertical-align: middle;">${data[i].name}</td>
                <td style="vertical-align: middle;">${data[i].price}</td>
                <td style="vertical-align: middle;">${data[i].screen}</td>
                <td style="vertical-align: middle;"><img style="width:100px" src=${data[i].img} /></td>
                <td style="vertical-align: middle;">${data[i].type}</td>
                <td style="vertical-align: middle;">${data[i].quantity}</td>
                <td style="vertical-align: middle;"><em onclick = "getInfoProduct(${data[i].id})" data-toggle="modal"
                data-target="#myModal" class=" fa fa-cog "></em> <em onclick = "deleteProduct(${data[i].id})" class="fa fa-trash"></em></td>
                                         
            </tr>`;
    }
    document.getElementById("tableDanhSach").innerHTML = productListHTML;
};


let resetForm = function (){
    document.getElementById("clearForm").click();
    document.getElementById("btnThemNV").style.display = "inline-block";
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("header-title").innerHTML = "NEW PRODUCT";
};
getProductAPI();







// let staffList = [];

// let createStaff = function () {
//     let isFormValidate =  validateInput();
//     if(!isFormValidate) return;
//     let id = document.getElementById("tknv").value;
//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     let datePicker = document.getElementById("datepicker").value;
//     let salary = +document.getElementById("luongCB").value;
//     let position = document.getElementById("chucvu").value;
//     let timeWork = +document.getElementById("gioLam").value;
//     let newStaff = new Staff(id, name, email, password, datePicker, salary, position, timeWork);
//     staffList.push(newStaff);
//     renderStaffs();
//     saveData();
//     resetForm();

// };
// let findById = function (id) {
//     for (let i = 0; i < staffList.length; i++) {
//         if (staffList[i].id === id) {
//             return i;
//         }
//     }
//     return -1;
// }
// let deleteStaff = function (id) {
//     let index = findById(id);
//     if (index === -1) {
//         alert("Not find");
//         return;
//     }
//     staffList.splice(index, 1);
//     renderStaffs();
//     saveData();

// };

// let getStaff = function (id) {
//     let index = findById(id);
//     if (index === -1) {
//         alert("Not find");
//         return;
//     }
//     console.log(index);
//     let foundStaff = staffList[index];

//     document.getElementById("tknv").value = foundStaff.id;
//     document.getElementById("name").value = foundStaff.name;
//     document.getElementById("email").value = foundStaff.email;
//     document.getElementById("password").value = foundStaff.password;
//     document.getElementById("datepicker").value = foundStaff.datePicker;
//     document.getElementById("luongCB").value = foundStaff.salary;
//     document.getElementById("chucvu").value = foundStaff.position;
//     document.getElementById("gioLam").value = foundStaff.timeWork;

//     document.getElementById("btnCapNhat").style.display = "inline-block";
//     document.getElementById("btnThemNV").style.display = "none";
//     document.getElementById("header-title").innerHTML = "UPDATE INFOMATION";
//     document.getElementById("tknv").disabled = true;

// };



// let updateStaff = function () {
//     let id = document.getElementById("tknv").value;
//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     let datePicker = document.getElementById("datepicker").value;
//     let salary = +document.getElementById("luongCB").value;
//     let position = document.getElementById("chucvu").value;
//     let timeWork = +document.getElementById("gioLam").value;

//     let index = findById(id);
//     if (index === -1) {
//         alert("Not find");
//         return;
//     }
//     let foundStaff = staffList[index];
//     foundStaff.name = name,
//         foundStaff.email = email,
//         foundStaff.password = password,
//         foundStaff.datePicker = datePicker,
//         foundStaff.salary = salary,
//         foundStaff.position = position,
//         foundStaff.timeWork = timeWork
//     renderStaffs();
//     saveData();
//     resetForm();
//     document.getElementById("btnDong").click();

// };

// let resetForm = function () {
//     document.getElementById("clearForm").click();
//     document.getElementById("tknv").disabled = false;
//     document.getElementById("btnThemNV").style.display = "inline-block";
//     document.getElementById("btnCapNhat").style.display = "none";
//     document.getElementById("header-title").innerHTML = "REGISTRATION";
// };


// let findStaff = function () {
//     let keyWord = document.getElementById("searchName").value.toLowerCase();
//     let results = [];
//     for (let i = 0; i < staffList.length; i++) {
//         let ratingStaff = staffList[i].Rating();
//         if (ratingStaff.includes(keyWord)) {
//             results.push(staffList[i]);
//         }
//     }
//     renderStaffs(results);
// }

// let renderStaffs = function (data) {
//     data = data || staffList;
//     let dataHTML = '';
//     for (let i = 0; i < data.length; i++) {




// let saveData = function () {
//     let staffListJSON = JSON.stringify(staffList);
//     localStorage.setItem("list", staffListJSON);
// };
// let getData = function () {
//     let staffListJSON = localStorage.getItem("list");
//     if (staffListJSON) {
//         staffList = mapData(JSON.parse(staffListJSON));
//         renderStaffs();
//     }
// };
// let mapData = function (dataFromLocal) {
//     let data = [];
//     for (let i = 0; i < dataFromLocal.length; i++) {
//         let currentStaff = dataFromLocal[i];
//         const mappedStaff = new Staff(
//             currentStaff.id,
//             currentStaff.name,
//             currentStaff.email,
//             currentStaff.password,
//             currentStaff.datePicker,
//             currentStaff.salary,
//             currentStaff.position,
//             currentStaff.timeWork
//         );
//         data.push(mappedStaff);
//     };
//     return data;
// };
// getData();

// let validateInput = function(){
//     let id = document.getElementById("tknv").value;
//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value ;
//     let datePicker = document.getElementById("datepicker").value;
//     let salary = document.getElementById("luongCB").value;
//     let position = document.getElementById("chucvu").value;
//     if(position ==="0"){
//         position = false;
//     }
//     let timeWork = document.getElementById("gioLam").value;
//     let testname = /^[A-z ]+$/g;
//     let testEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
//     let testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
//     let testDatePicker = /^(0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/;
//     let isValid = true;
//     isValid &= require(id,"tbTKNV") && lengthInput(id,"tbTKNV",4,6);
//     isValid &= require(name,"tbTen") && pattern(name,"tbTen",testname,"* Employee name must be letter");
//     isValid &= require(email,"tbEmail") && pattern(email,"tbEmail",testEmail,"Email is xxx@xxx.xxx");    
//     isValid &= require(password,"tbMatKhau") && pattern(password,"tbMatKhau",testPassword,"* Password from 6-10 characters (contains at least 1 numeric character, 1 uppercase character, 1 special character)");
//     isValid &= require(datePicker,"tbNgay") && pattern(datePicker,"tbNgay",testDatePicker,"* format mm/dd/yyyy");
//     isValid &= require(salary,"tbLuongCB") && valueInput(salary,"tbLuongCB",1000000,20000000,"Salary");
//     isValid &= require(position,"tbChucVu");
//     isValid &= require(timeWork,"tbGiolam") && valueInput(timeWork,"tbGiolam",80,200,"Time Worker");
//     return isValid;
// };

// // Required
// let require = function(val,spanId){
//     if(!val){
//         document.getElementById(spanId).innerHTML = "* This field is required";
//         document.getElementById(spanId).style.display="block";
//         return false;
//     }
//     document.getElementById(spanId).innerHTML = "";
//     return true;
// };
// // Length
// let lengthInput = function(val,spanId,min,max){
//     if(val.length < min || val.length > max){
//         document.getElementById(spanId).innerHTML = `* length must from ${min} to ${max} character.`;
//         document.getElementById(spanId).style.display="block";
//         return false;
//     }
//     document.getElementById(spanId).innerHTML = "";
//     return true;
// };
// // Pattern
// let pattern = function(val,spanId,regex,message){
//     if(!regex.test(val)){
//         document.getElementById(spanId).innerHTML = `${message}`;
//         document.getElementById(spanId).style.display="block";
//         return false;
//     }
//     document.getElementById(spanId).innerHTML = "";
//     return true;
// };
// let valueInput = function(val,spanId,min,max,message){
//     if(val < min || val > max){
//         document.getElementById(spanId).innerHTML = `* ${message} must from ${min} to ${max} .`;
//         document.getElementById(spanId).style.display="block";
//         return false;
//     }
//     document.getElementById(spanId).innerHTML = "";
//     return true;
// };


