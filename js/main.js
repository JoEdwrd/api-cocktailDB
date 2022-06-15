// //The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
let num = 0
let kami = null

document.querySelector('#getDrink').addEventListener('click', function(){
    num = 0
    req()
    going()
})
document.querySelector('#left').addEventListener('click', function(){
    clearInterval(kami)
    kami = null
})  
function going(){
    if(!kami) {
        kami = setInterval(function(){
            num += 1
            req()
        }, 1500)
    }
}
function req(){
    let input = document.querySelector('input').value
    if(input.includes(' ')) input = input.split(' ').join('%20')
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ input)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.drinks == null) {
                clearInterval(kami)
                kami = null
            }
            if(num < 0) num = data.drinks.length - 1
            if(num > data.drinks.length - 1) num = 0
            document.querySelector('h2').innerText = data.drinks[num].strDrink
            document.querySelector('img').src = data.drinks[num].strDrinkThumb
            document.querySelector('h3').innerText = data.drinks[num].strInstructions
        })
        .catch(err => {
            
            console.log(`error ${err}`)
        })
}




