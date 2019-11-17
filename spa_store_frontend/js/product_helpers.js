function addProducts(productsAry){
    let prods = document.getElementById('latest-items-list')
    productsAry.reverse().forEach(p => { 
        let pId = p.id   
        let pName = p.attributes.name;
        let pDescription = p.attributes.description
        let pPrice = p.attributes.price;
        let pImgPath = p.attributes.image_path

        let product = createProduct(pId, pName, pDescription, pPrice, pImgPath);
        
        createProductsPreviewElements(product, prods)
        
    })
}

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
    let prodImage = document.createElement('img');
    let prodImageId = document.createAttribute('id')
    prodImageId.value = "browser-image-display"
    prodImage.setAttributeNode(prodImageId)
    prodImage.src = object.img_path
    prodImage.alt = object.description
    
    
    
    browseHeadId.value = "subAtt"
    browseHead.setAttributeNode(browseHeadId)
       
    detailsId.value = "details"
    details.setAttributeNode(detailsId)
        
    browseHead.innerText = object.name
    browser.appendChild(browseHead)
    browser.appendChild(prodImage)
    details.innerText = `${object.description} \n Price: $${object.price}`

    
    addBtn.value = "add-button"
    btn.setAttributeNode(addBtn)
    btn.innerText = "Add to Cart"
    

    browser.appendChild(details)
    browser.appendChild(btn)

    btn.addEventListener('click', function(){
        let cartDiv = document.getElementById('cart')
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