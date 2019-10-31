
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


class Store{
    constructor(name, vendors, products){
        this.name = name
        this.vendors = vendors
        this.products = products
    }
}