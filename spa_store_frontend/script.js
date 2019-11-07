
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
        let customer = createCustonmer(custName, custCart)
        
        let welcomeMess = document.getElementById('welcome')
        welcomeMess.innerText = "Welome, " + customer.name
        let cartList = document.getElementById('cart-list')
    
        if (custCart.length === 0){
            cartList.innerText = "Your cart is currently empty"
            cart.appendChild(cartList)
        }   
    });

    let browser = document.getElementById('details')
    browser.innerText = "Please select an Item or vendor for more details"


} )

function addProducts(productsAry){
    let prods = document.getElementById('latest-items-list')
    productsAry.forEach(product => {    
        let li = document.createElement('li');
        let link = document.createElement('a')
        let href = document.createAttribute('href')
        let dataID = document.createAttribute('data-id')
        let c = document.createAttribute('class');
        dataID.value = product.id
        c.value = "prod-select"
        href.value = "#"
        link.innerText = product.attributes.name
        link.setAttributeNode(dataID)
        link.setAttributeNode(href)
        link.setAttributeNode(c)
        li.appendChild(link)
        li.addEventListener("click", function(){
            alert("I clicked " + link.innerText + " #" + dataID.value)
        })
        prods.appendChild(li)
    })
}



function addVendors(vendorsAry){
    let topVs = document.getElementById('top-vendors-list')
    vendorsAry.forEach(vendor => {
        let li = document.createElement('li');
        let link = document.createElement('a')
        let href = document.createAttribute('href')
        let dataID = document.createAttribute('data-id')
        let c = document.createAttribute('class')
        dataID.value = vendor.id
        c.value = "vend-select"
        
        link.innerText = vendor.attributes.name + " - "  + vendor.attributes.tagline
        link.setAttributeNode(dataID)
        link.setAttributeNode(href)
        link.setAttributeNode(c)
        li.appendChild(link)
        li.addEventListener("click", function(e){
            e.preventDefault()
            fetch(`http://localhost:3000/vendors/${dataID.value}`).then(function(response){
                return response.json()
            }).then(function(json){
                let name = json["data"]["attributes"]["name"]
                let tagline = json["data"]["attributes"]["tagline"]
                let vendor = createVendor(name, tagline)
                debugger
            })
            alert ("I clicked " + vendor.attributes.name + " #" + dataID.value)
        })
        topVs.appendChild(li)
    });
   
    
}


function createStore(name, vendors, products){
    return new Store (name, vendors, products)
}

function createCustonmer(name, cart){
    return new Customer(name, cart)
}

function createVendor(name, tagline){
    return new Vendor(name, tagline)
}


class Store{
    constructor(name, vendors, products){
        this.name = name
        this.vendors = vendors
        this.products = products
    }
}

class Customer{
    constructor(name, cart){
        this.name = name
        this.cart = cart
    }
}

class Vendor{
    constructor(name, tagline){
        this.name = name
        this.tagline = tagline
    }
}


    