let div = document.getElementById('main-div')
div.innerText = "I'm Over Here Now"

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/stores/2').then(function(response){
        return response.json();
        }).then(object => console.log(object));
} )


class Store{
    constructor(name){
        this.name = name
    }
}