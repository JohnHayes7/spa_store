
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/stores/2').then(function(response){
        return response.json();
        }).then(function(json){
            let name = json["data"]["attributes"]["name"]
            let vendors = json["included"].filter(event => event["type"] === "vendor")
            store = createStore(name, vendors);
            let header = document.getElementById("main-head");
            let h1 = document.createElement('h1');
            h1.innerText = "Welcome to " + store.name;
            header.appendChild(h1);
            addVendors(store.vendors)
           
            
        });
} )



function addVendors(vendorsAry){
    let topVs = document.getElementById('top-vendors-list')
    vendorsAry.forEach(vendor => {
        let li = document.createElement('li');
        li.innerText = vendor.attributes.name
        topVs.appendChild(li)
    });
   
    
}

function createStore(name, vendors){
    return new Store (name, vendors)
}


class Store{
    constructor(name, vendors){
        this.name = name
        this.vendors = vendors
    }
}