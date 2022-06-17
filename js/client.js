const URL_API = "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products";
let listProduct = [];
let Card = [];


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
const findById = async (id) => {
    let response = await axios.get(URL_API);
    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].id === id) {
            console.log(id)
            return id;
        }
    }
    return -1;
}
const getInfoProduct = async (id) => {
    let index = findById(id);
    if (index === -1) {
        alert("Not find");
        return;
    }
    let foundProduct = await axios.get(`${URL_API}/${id}`);
    document.getElementById("name").value = foundProduct.data.name;
    document.getElementById("price").value = foundProduct.data.price;
    document.getElementById("screen").value = foundProduct.data.screen;
    document.getElementById("backCamera").value = foundProduct.data.backCamera;
    document.getElementById("frontCamera").value = foundProduct.data.frontCamera;
    document.getElementById("img").innerHTML = `<img style="width:100%" src="${foundProduct.data.img}"/>`;
    document.getElementById("desc").value = foundProduct.data.desc;
    document.getElementById("type").value = foundProduct.data.type;
    document.getElementById("id").value = foundProduct.data.id;
    document.getElementById("quantity").value = foundProduct.data.quantity;
    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("btnCapNhat").style.display = "inline-block";


}



let findProductType = async () => {
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

const fPrice = (price) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    return formatter.format(price);
}

const renderProductList = function (data) {
    let productListHTML = '';
    for (let i = 0; i < data.length; i++) {
        productListHTML += `
        <div class="col border border-info">
            <h4 class="p-3">${data[i].name}<h4>
            <img style="width:200px;height:200px" src=${data[i].img} /></br>
            <h6 class="p-3">${fPrice(data[i].price)}</h6>
            <p>
            <em style="cursor: pointer;" onclick = "getInfoProduct(${data[i].id})" data-toggle="modal" data-target="#myModal" class="fa fa-info-circle display-4 p-3">
            </em> <em style="cursor: pointer;" onclick = "addCard(${data[i].id})" class="fa fa-shopping-cart display-4 p-3"></em>
            </p>
            
        </div>`;
    }
    document.getElementById("listProduct").innerHTML = productListHTML;
};


let resetForm = function () {
    document.getElementById("clearForm").click();
    document.getElementById("btnThemNV").style.display = "inline-block";
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("header-title").innerHTML = "NEW PRODUCT";
};



let saveData = function () {
    let cardListJSON = JSON.stringify(Card);
    localStorage.setItem("listCard", cardListJSON);
};
let getData = function () {
    let cardListJSON = localStorage.getItem("listCard");
    if (cardListJSON) {
        Card = JSON.parse(cardListJSON);

    }
    renderCard(Card);
};
let addCard = async (id) => {

    let Products = await axios.get(`${URL_API}/${id}`);
    let index = Card.findIndex((item) => item.id === +id)
    if (index === -1) {
        Card.push({ id, Products, quantity: 1 });
    } else {
        Card[index].quantity += 1;
    }
    console.log(Card);
    saveData();
    renderCard(Card);

}
let changQuantity = async (id, number) => {
    console.log(number);
    let index = Card.findIndex((item) => item.id === +id);
    if (index !== -1) {
        Card[index].quantity += number;
    }
    renderCard(Card);
    saveData();
}
let deleteCard = (id)=>{
    let index = Card.findIndex((item) => item.id === +id);
    if(index !== -1){
        Card.splice([index],1);
    }
    saveData();
    renderCard(Card);
}
let paymentCard = ()=>{
    
}

let renderCard = async (Card) => {
    let CardHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    if (Card.length !== 0) {
        for (let i = 0; i < Card.length; i++) {
            totalQuantity += Card[i].quantity;
            totalPrice += Card[i].Products.data.price * Card[i].quantity;
            CardHTML += `
            <tr>
                <td style="vertical-align: middle;">${i + 1}</td>
                <td style="vertical-align: middle;">${Card[i].Products.data.name}</td>
                <td style="vertical-align: middle;">${fPrice(Card[i].Products.data.price)}</td>
                <td style="vertical-align: middle;"><img style="width:100px" src=${Card[i].Products.data.img} /></td>
                <td style="vertical-align: middle;"><em style="cursor: pointer;" onclick = "changQuantity(${Card[i].id},${-1})" class="fa fa-minus"></em> ${Card[i].quantity} <em style="cursor: pointer;" onclick = "changQuantity(${Card[i].id},${1})" class="fa fa-plus"></em></td>
                <td style="vertical-align: middle;">${fPrice(Card[i].Products.data.price * Card[i].quantity)}</td>
                <td style="vertical-align: middle;"> <em style="cursor: pointer; font-size:30px" onclick = "deleteCard(${Card[i].id})" class="fa fa-trash"></em></td>
                                         
            </tr>
            `;
        }
        CardHTML += `
        <tr>
         <td style="vertical-align: middle;" colspan = "4">Total</td>
         <td style="vertical-align: middle;">${totalQuantity}</td>
         <td style="vertical-align: middle;">${fPrice(totalPrice)}</td>
         <td style="vertical-align: middle;"><i onclick="" style="cursor: pointer; font-size:30px" class="fa fa-money" aria-hidden="true"></br>Payment</i></td>
         </tr>`;
        document.getElementById("tableCard").innerHTML = CardHTML;
    }
}

getData();
getProductAPI();


