
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/stores/2').then(function(response){
        return response.json();
        }).then(function(json){
            let name = json["data"]["attributes"]["name"]
            let vendors = json["included"].filter(event => event["type"] === "vendor")
            let products = json["included"].filter(event => event["type"] === "product")
            
            store = createStore(name, vendors, products);
            let header = document.getElementById("main-head");
            let h1 = document.createElement('h1');
            h1.innerText = "Welcome to " + store.name;
            header.appendChild(h1);
            addVendors(store.vendors)
            addProducts(store.products)
            
        });

    fetch('http://localhost:3000/customers/1').then(function(response){
        return response.json();
    }).then(function(json){
        let custName = json.data.attributes.name
        let custCart = json.included[0].relationships.products.data
        let customer = createCustonmer(custName)
        debugger
        let welcomeMess = document.getElementById('welcome')
        welcomeMess.innerText = "Welome, " + customer.name
        let cart = document.getElementById('cart')
    
        if (custCart.length === 0){
            cart.innerText = "You currently do not have any items in your cart"
        }   
    });

    
} )

function addProducts(productsAry){
    let prods = document.getElementById('latest-items-list')
    productsAry.forEach(product => {    
        let li = document.createElement('li');
        li.innerText = product.attributes.name
        prods.appendChild(li)
    })
}



function addVendors(vendorsAry){
    let topVs = document.getElementById('top-vendors-list')
    vendorsAry.forEach(vendor => {
        let li = document.createElement('li');
        li.innerText = vendor.attributes.name + " - "  + vendor.attributes.tagline
        topVs.appendChild(li)
    });
   
    
}

function createStore(name, vendors, products){
    return new Store (name, vendors, products)
}

function createCustonmer(name){
    return new Customer(name)
}


class Store{
    constructor(name, vendors, products){
        this.name = name
        this.vendors = vendors
        this.products = products
    }
}

class Customer{
    constructor(name){
        this.name = name
    }
}