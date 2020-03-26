const API = 'https://guarded-taiga-12857.herokuapp.com'

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

    // function parseAndCreateProducts???
    Array.from(products).forEach(p => {
        let pId = p.id;
        let pName = p.attributes.name;
        let pDescription = p.attributes.description;
        let pPrice = p.attributes.price;
        let pImgPath = p.attributes.image_path

        let product = createProduct(pId, pName, pDescription, pPrice, pImgPath)

        createProductsPreviewElements(product, ul)
        detailsDiv.appendChild(ul)
        browser.appendChild(detailsDiv);
    })
}

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
    fetch(API + `/vendors/${object.id}`).then(function(response){
               
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
