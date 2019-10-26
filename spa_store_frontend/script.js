
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/stores/2').then(function(response){
        return response.json();
        }).then(function(json){
            let name = json["data"]["attributes"]["name"]
            
            store = createStore(name);
            let header = document.getElementById("main-head");
            let h1 = document.createElement('h1');
            h1.innerText = "Welcome to " + store.name;
            header.appendChild(h1);
           
            
        });
} )

function createStore(name){
    return new Store (name)
}


class Store{
    constructor(name){
        this.name = name
    }
}