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