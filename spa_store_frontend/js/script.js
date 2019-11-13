let currentCustomer = ""

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


function addProducts(productsAry){
    let prods = document.getElementById('latest-items-list')
   
    productsAry.forEach(p => { 
        let pId = p.id   
        let pName = p.attributes.name;
        let pDescription = p.attributes.description
        let pPrice = p.attributes.price;

        let product = createProduct(pId, pName, pDescription, pPrice);
        
        createProductsPreviewElements(product, prods)
        
    })
}



function addVendors(vendorsAry){
    let topVs = document.getElementById('top-vendors-list') 
    vendorsAry.forEach(v => {
        let vId = v.id 
        let vName = v.attributes.name
        let vTagline = v.attributes.tagline

        let vendor = createVendor(vId, vName, vTagline)
        createVendorPreviewElements(vendor, topVs)
    });
}


function vendorProductsList(products){
    let browser = document.getElementById('browse');
    let detailsDiv = document.createElement("div");
    let divAttr = document.createAttribute("id");
    divAttr.value = "details";
    detailsDiv.setAttributeNode(divAttr);
    let ul = document.createElement('ul');
    Array.from(products).forEach(p => {
        let pId = p.id;
        let pName = p.attributes.name;
        let pDescription = p.attributes.description;
        let pPrice = p.attributes.price;

        let product = createProduct(pId, pName, pDescription, pPrice)
        createProductsPreviewElements(product, ul)
        detailsDiv.appendChild(ul)
        browser.appendChild(detailsDiv);
    })
}

// GENERAL HELPER METHODS
function clearWindow(element){
    return element.innerText = ""
}

function createStore(name, vendors, products){
    return new Store (name, vendors, products);
}

function createCustonmer(id, name, cart){
    return new Customer(id, name, cart);
}

function createVendor(id, name, tagline){
    return new Vendor(id, name, tagline);
}

function createProduct(id, name, description, price){
    return new Product(id, name, description, price);
}

function createCart(id, customer_id, products){
    return new Cart(id, customer_id, products);
}


// PRODUCT HELPER FUNCTIONS
function createProductsPreviewElements(product, parent){
    let li = document.createElement('li');
    let link = document.createElement('a')
    let href = document.createAttribute('href')
    let dataID = document.createAttribute('data-id')
    let c = document.createAttribute('class');

    dataID.value = product.id

    c.value = "prod-select"
    href.value = "#"
    link.innerText = product.name
    link.setAttributeNode(dataID)
    link.setAttributeNode(href)
    link.setAttributeNode(c)
    li.appendChild(link)
    makeProductClickable(li, product)
    parent.appendChild(li)
}

function makeProductClickable(element, object){
    element.addEventListener("click", function(e){
        e.preventDefault()
        productDetailsDisplay(object)
    })
}

function productDetailsDisplay(object){
    let browser = document.getElementById('browse');
            
    clearWindow(browser);

    let browseHead = document.createElement('div')
    let browseHeadId = document.createAttribute('id');
    let details = document.createElement('div')
    let detailsId = document.createAttribute('id')
    let btn = document.createElement('button');
    let addBtn = document.createAttribute('id')
    
    browseHeadId.value = "subAtt"
    browseHead.setAttributeNode(browseHeadId)
       
    detailsId.value = "details"
    details.setAttributeNode(detailsId)
        
    browseHead.innerText = object.name
    browser.appendChild(browseHead)
    details.innerText = `${object.description} \n Price: $${object.price}`

    
    addBtn.value = "add-button"
    btn.setAttributeNode(addBtn)
    btn.innerText = "Add to Cart"
    

    browser.appendChild(details)
    browser.appendChild(btn)

    btn.addEventListener('click', function(){
        let cartDiv = document.getElementById('cart')
        debugger
        fetch(`http://localhost:3000/customers/${currentCustomer.id}/carts/${currentCustomer.cart.id}`,{
            method: 'PATCH',
            body: JSON.stringify({
                cart_id: currentCustomer.cart.id,
                product_id: object.id,
                completed: true
            }),
            headers: {
                "Content-type": "application/json", 
                "Accept": 'application/json'    
            }
        }).then(response => response.json())
        .then(function(json){
           
            // let cartProducts = json.included.filter(event => event["type"] === "product")

            cartDisplay(json)
        })

    })

    

}



// VENDOR HELPER FUNCTIONS
function createVendorPreviewElements(vendor, parent){
    let li = document.createElement('li');
    let link = document.createElement('a')
    let href = document.createAttribute('href')
    let dataID = document.createAttribute('data-id')
    let c = document.createAttribute('class')
    dataID.value = vendor.id
    c.value = "vend-select"
    link.innerText = vendor.name + " - "  + vendor.tagline
    link.setAttributeNode(dataID)
    link.setAttributeNode(href)
    link.setAttributeNode(c)
    li.appendChild(link)
    makeVendorClickable(vendor, li)
    parent.appendChild(li)
}

function makeVendorClickable(object, element){
    element.addEventListener("click", function(e){
         e.preventDefault()
         fetchVendors(object)       
    })
}

function fetchVendors(object){
    fetch(`http://localhost:3000/vendors/${object.id}`).then(function(response){
        return response.json()
    }).then(function(json){
        let products = json["included"].filter(event => event["type"] === "product")
            
        object.products = products
        let browser = document.getElementById("browse")
        let subHead = document.createElement('div')
        let subAtt = document.createAttribute("id")
            
        clearWindow(browser)

        subAtt.value = "subAtt";
        subHead.setAttributeNode(subAtt);
        subHead.innerText = `All Products from ${object.name} \n ${object.tagline} ` 
        browser.appendChild(subHead)
        vendorProductsList(object.products)

    })   
}

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


    let cartTotal = document.createElement('div');
    let cartTotalId = document.createAttribute('id');
    cartTotalId.value = "cart-total";
    cartTotal.setAttributeNode(cartTotalId);
    cartTotal.innerText = "Total: $ " + getCartTotal(prodsPriceArray)
    cartList.appendChild(cartTotal)

    let checkoutLink = document.createElement('a')
    let checkoutHref = document.createAttribute('href')
    checkoutHref.value = "#"
    checkoutLink.setAttributeNode(checkoutHref)
    
    let checkout = document.getElementById('checkout')
    checkoutLink.innerText = "CHECKOUT"
    checkout.appendChild(checkoutLink)

    

}

function addCheckOut(){

    if(array.length > 0){
        
    }
}

function getCartTotal(array){
    return array.reduce(function(acc, currentValue) {
        return currentValue + acc
    })
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

        deleteLink.addEventListener('click', function(e){
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
    })
}














    