const API = 'https://guarded-taiga-12857.herokuapp.com'
let currentCustomer = {}

document.addEventListener('DOMContentLoaded', (event) => {
    fetch(API + '/stores/1').then(function(response){
        return response.json();
        }).then(function(json){
            let name = json["data"]["attributes"]["name"]
            let vendors = json["included"].filter(event => event["type"] === "vendor")
            let products = json["included"].filter(event => event["type"] === "product")
            let categories = json["included"].filter(event => event["type"] === "category")
            store = createStore(name, vendors, products, categories);
            
            let header = document.getElementById("main-head");
            let h1 = document.createElement('h1');
            h1.innerText = "Welcome to " + store.name;
            header.appendChild(h1);
            addVendors(store.vendors)
            addProducts(store.products)
            addCategories(store.categories)
        });


    fetch(API + '/customers/1').then(function(response){
        return response.json();
    }).then(function(json){
        
        let custId = json.data.id
        let custName = json.data.attributes.name
        let cartId = json.included[0].id
        let cartProds = json.included[0].relationships.products.data
        
        let cart = createCart(cartId, custId, cartProds)
        
        currentCustomer = createCustonmer(custId, custName, cart)
        
        let welcomeMess = document.getElementById('welcome')
        welcomeMess.innerText = "Welcome, " + currentCustomer.name

        if(!cartIsEmpty(cart.products)){
            fetch(`http://localhost:3000/customers/${currentCustomer.id}/carts/${currentCustomer.cart.id}`).then(response => response.json())
            .then(function(json){
                cartDisplay(json)
                addCheckOut()
            })
        }
    });

    let browser = document.getElementById('details')
    browser.innerText = "Please select an Item or vendor for more details"
} )

// GENERAL HELPER METHODS
function clearWindow(element){
    return element.innerText = ""
}

function createStore(name, vendors, products, categories){
    return new Store (name, vendors, products, categories);
}

function createCustonmer(id, name, cart){
    return new Customer(id, name, cart);
}

function createVendor(id, name, tagline){
    return new Vendor(id, name, tagline);
}

function createProduct(id, name, description, price, imgPath){
    return new Product(id, name, description, price, imgPath);
}

function createCart(id, customer_id, products){
    return new Cart(id, customer_id, products);
}

function createCategory(id, name){
    return new Category (id, name);
}
















    