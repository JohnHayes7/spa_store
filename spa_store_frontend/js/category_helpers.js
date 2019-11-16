function addCategories(categoriesAry){
    let popCatsList = document.getElementById('pop-cats-list')
    categoriesAry.forEach(c => {
        let cId = c.id;
        let cName = c.attributes.name

        let category = createCategory(cId, cName)
        createCatPreviewElements(category, popCatsList)
    })

}




function categoryProductsList(products){
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
        let pImgPath = p.attributes.image_path

        let product = createProduct(pId, pName, pDescription, pPrice, pImgPath)
        createProductsPreviewElements(product, ul)
        detailsDiv.appendChild(ul)
        browser.appendChild(detailsDiv);
    })

}

function createCatPreviewElements(category, parent){
    let li = document.createElement('li');
    let link = document.createElement('a')
    let href = document.createAttribute('href')
    let dataID = document.createAttribute('data-id')
    let c = document.createAttribute('class');

    dataID.value = category.id

    c.value = "cat-select"
    href.value = "#"
    link.innerText = category.name
    link.setAttributeNode(dataID)
    link.setAttributeNode(href)
    link.setAttributeNode(c)
    li.appendChild(link)
    makeCategoryClickable(li, category)
    parent.appendChild(li)   
}

function makeCategoryClickable(element, category){
    element.addEventListener('click', function(e){
        e.preventDefault()
        fetchCategories(category);
    })
}

function fetchCategories(category){
    fetch(`http://localhost:3000/categories/${category.id}`).then(function(response){
        return response.json()
    }).then(function(json){
        let products = json["included"].filter(event => event["type"] === "product")
        category.products = products
        let browser = document.getElementById("browse")
        let subHead = document.createElement('div')
        let subAtt = document.createAttribute("id")
            
        clearWindow(browser)

        subAtt.value = "subAtt";
        subHead.setAttributeNode(subAtt);
        subHead.innerText = `All ${category.name} Products ` 
        browser.appendChild(subHead)
        categoryProductsList(category.products)
    })
}