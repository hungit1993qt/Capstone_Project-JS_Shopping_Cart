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
    document.getElementById("id").value = foundProduct.data.id;
    document.getElementById("quantity").value = foundProduct.data.quantity;
    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("btnCapNhat").style.display = "inline-block";
    
    
}

const updateProduct = async ()=> {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let screen = document.getElementById("screen").value;
    let backCamera = document.getElementById("backCamera").value;
    let frontCamera = document.getElementById("frontCamera").value;
    let img = document.getElementById("img").value;
    let desc = document.getElementById("desc").value;
    let type = document.getElementById("type").value;
    let id = document.getElementById("id").value;
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
    resetForm();
    getProductAPI();
    document.getElementById("btnDong").click();

};

let findProductType = async ()=> {
    let keyWord = document.getElementById("searchType").value.toLowerCase();
    let results = [];
    let response = await axios.get(URL_API);
    for (let i = 0; i < response.data.length; i++) {
        let typeProduct = response.data[i].type;
        if (typeProduct.includes(keyWord)) {
            results.push(response.data[i]);
        }
    }
    renderProductList(results);
}


const renderProductList = function (data){
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


