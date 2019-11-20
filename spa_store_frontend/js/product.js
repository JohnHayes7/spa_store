class Product{
    constructor(id, name, description, price, img_path){
        this.id = id
        this.name = name;
        this.description = description
        this.price = price
        this.img_path = img_path
    }

    createProductPreview(parent){
        let li = document.createElement('li');
        let link = document.createElement('a')
        let href = document.createAttribute('href')
        let dataID = document.createAttribute('data-id')
        let c = document.createAttribute('class');
    
        dataID.value = this.id
    
        c.value = "prod-select"
        href.value = "#"
        link.innerText = this.name
        link.setAttributeNode(dataID)
        link.setAttributeNode(href)
        link.setAttributeNode(c)
        li.appendChild(link)
        makeProductClickable(li, this)
        parent.appendChild(li)
    }

}