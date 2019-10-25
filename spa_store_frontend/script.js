let div = document.getElementById('main-div')
div.innerText = "I'm Over Here Now"

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/stores/2').then(function(response){
        return response.json();
        }).then(function(json){
            let name = json["data"]["attributes"]["name"]
            
            store = createStore(name)
            let h1 = document.createElement('h1');
            h1.innerText = store.name
            document.body.appendChild(h1);
            
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