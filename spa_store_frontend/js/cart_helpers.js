const CARTHELPAPI = 'https://guarded-taiga-12857.herokuapp.com'

function cartDisplay(json){
    let cartList = document.getElementById('cart-list')
    clearWindow(cartList)
   
    let ul = document.createElement('ul')
    let cartProducts = json.included.filter(event => event["type"] === "product")
     
    iterateCart(cartProducts, ul)
    cartList.appendChild(ul);

    if(!cartIsEmpty(cartProducts)){
        let cartTotal = document.createElement('div');
        let cartTotalId = document.createAttribute('id');
        cartTotalId.value = "cart-total";
        cartTotal.setAttributeNode(cartTotalId);
        cartTotal.innerText = "Total: $ " + getCartTotal(getPrices(cartProducts))
        cartList.appendChild(cartTotal)
        addCheckOut()
    }
}

function getPrices(products){
    prodsPriceArray = []
    products.forEach(product =>{
        prodsPriceArray.push(product.attributes.price)
    })
    return prodsPriceArray
}

function cartIsEmpty(array){
    if(array.length === 0){
        let cartDiv = document.getElementById('cart')
        let cartList = document.getElementById('cart-list')
        cartList.innerText = "Your cart is currently empty"
        cartDiv.appendChild(cartList)
        removeCheckOut()
        return true
    }
}

function removeCheckOut(){
    let checkoutLink = document.getElementById('checkout-link')
    if(checkoutLink){
        checkoutLink.remove()
    }
       
}


function addCheckOut(){
    let tester = document.getElementById('checkout-link')
    if (tester === null){
        createCheckoutLink()
    }
}

function createCheckoutLink(){
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
    checkoutAction(checkoutLink)
}

function checkoutAction(element){
    element.addEventListener('click', function(e){
        
        e.preventDefault()
        clearCart()
        alert("Thank you for your purchase \nPlease come see us again")
        
    })
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

        li.innerText = product.attributes.name + " " +"$" + product.attributes.price;
        
        createRemoveLink(li, product, deleteLink)
        element.appendChild(li);

        removeItems(deleteLink)
    })
}

function createRemoveLink(parent, obj, link){
    
    let deleteLinkId = document.createAttribute('id')
    let deleteLinkHref = document.createAttribute('href')
    let deleteLinkData = document.createAttribute('data-id')

    deleteLinkData.value = obj.id;

    deleteLinkHref.value = "#"
    deleteLinkId.value = "delete-link"
    link.setAttributeNode(deleteLinkData)
    link.setAttributeNode(deleteLinkId)
    link.setAttributeNode(deleteLinkHref)
    link.innerText = " Remove From Cart"

    parent.appendChild(link)
}


function removeItems(link){
    link.addEventListener('click', function(e){
        e.preventDefault()
        fetch(CARTHELPAPI + `/customers/${currentCustomer.id}/carts/${currentCustomer.cart.id}`,{
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

function clearCart(){
    fetch(CARTHELPAPI + `/customers/${currentCustomer.id}/carts/${currentCustomer.cart.id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            cart_id: currentCustomer.cart.id,
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
    
}