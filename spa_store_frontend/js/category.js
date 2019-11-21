class Category{
    constructor(id, name){
        this.id = id
        this.name = name
    }

    createPreviewElements(parent){
        debugger
        let li = document.createElement('li');
        let link = document.createElement('a')
        let href = document.createAttribute('href')
        let dataID = document.createAttribute('data-id')
        let c = document.createAttribute('class');
    
        dataID.value = this.id
    
        c.value = "cat-select"
        href.value = "#"
        link.innerText = this.name
        link.setAttributeNode(dataID)
        link.setAttributeNode(href)
        link.setAttributeNode(c)
        li.appendChild(link)
        makeCategoryClickable(li, this)
        parent.appendChild(li)   
    }
}