let currentCustomer = ""

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/stores/2').then(function(response){
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


    fetch('http://localhost:3000/customers/1').then(function(response){
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
        let cartDiv = document.getElementById('cart')
        let cartList = document.getElementById('cart-list')
    
        if (cart.products.length === 0){
            cartList.innerText = "Your cart is currently empty"
            cartDiv.appendChild(cartList)
        }else{
            fetch(`http://localhost:3000/customers/${currentCustomer.id}/carts/${currentCustomer.cart.id}`).then(response => response.json())
            .then(function(json){
                cartDisplay(json)
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


// PRODUCT HELPER FUNCTIONS










// VENDOR HELPER FUNCTIONS




// CART HELPERS
function cartDisplay(json){
    let cartList = document.getElementById('cart-list')
    cartList.innerText = ""
   
    let ul = document.createElement('ul')
    let cartProducts = json.included.filter(event => event["type"] === "product")
    
    prodsPriceArray = []
    cartProducts.forEach(product =>{
        prodsPriceArray.push(product.attributes.price)
    })
    
    
    iterateCart(cartProducts, ul)
    cartList.appendChild(ul);

    if(cartProducts.length > 0){
        let cartTotal = document.createElement('div');
        let cartTotalId = document.createAttribute('id');
        cartTotalId.value = "cart-total";
        cartTotal.setAttributeNode(cartTotalId);
        cartTotal.innerText = "Total: $ " + getCartTotal(prodsPriceArray)
        cartList.appendChild(cartTotal)
    }

    
    
}

function removeCheckOut(array){
    let checkoutLink = document.getElementById('checkout-link')
    if(array.length === 0){
        return checkoutLink.remove()
    }
}


function addCheckOut(){
    let tester = document.getElementById('checkout-link')
    if (tester === null){
        let checkoutLink = document.createElement('a')
        let checkoutHref = document.createAttribute('href')
        let checkoutLinkId = document.createAttribute('id')
        checkoutLinkId.value = "checkout-link"
        checkoutHref.value = "#"
        checkoutLink.setAttributeNode(checkoutHref)
        checkoutLink.setAttributeNode(checkoutLinkId)
        
        let checkout = document.getElementById('checkout')
        checkoutLink.innerText = "CHECKOUT"
        checkout.appendChild(checkoutLink)
    }
}

function getCartTotal(array){
    if (array.length > 0){
     return array.reduce(function(acc, currentValue) {
        return currentValue + acc
    })
    }
   
}


function iterateCart(array, element){
    array.forEach(product => {
        let li = document.createElement('li');
        let deleteLink = document.createElement('a')
        let deleteLinkId = document.createAttribute('id')
        let deleteLinkHref = document.createAttribute('href')
        let deleteLinkData = document.createAttribute('data-id')
        deleteLinkData.value = product.id 
        deleteLinkHref.value = "#"
        deleteLinkId.value = "delete-link"
        deleteLink.setAttributeNode(deleteLinkData)
        deleteLink.setAttributeNode(deleteLinkId)
        deleteLink.setAttributeNode(deleteLinkHref)
        deleteLink.innerText = " Remove From Cart"

        li.innerText = product.attributes.name + " " +"$" + product.attributes.price;
        li.appendChild(deleteLink)
        element.appendChild(li);

        removeItems(deleteLink)
        
    })
}

function removeItems(link){
    link.addEventListener('click', function(e){
        fetch(`http://localhost:3000/customers/${currentCustomer.id}/carts/${currentCustomer.cart.id}`,{
            method: 'DELETE',
            body: JSON.stringify({
                cart_id: currentCustomer.cart.id,
                product_id: this.getAttribute('data-id'),
                completed: true
            }),
            headers: {
                "Content-type": "application/json", 
                "Accept": 'application/json'    
            }
        }).then(response => response.json())
        .then(function(json){
           cartDisplay(json)
           
        })
    })

}














    