const pokemonName = document.querySelector(".pokemon-name")
const pokemonNumber = document.querySelector(".pokemon-number")
const pokemonImage = document.querySelector(".pokemon-image")

const form = document.querySelector(".form")
const input = document.querySelector(".buscar")
const btnPrev = document.querySelector(".btn-prev")
const btnNext = document.querySelector(".btn-next")

let pokemonAtual = 1

// função responsavel por resgatar o pokemon da api
async function getPokemon(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const resposta = await fetch(url)
    if(resposta.status === 200){
        const data = await resposta.json()
        return data
    }
}

// função responsavel por exibir o pokemon na pokedex
async function renderPokemon(pokemon){
    pokemonName.innerText = "Carregando..."
    pokemonNumber.innerText = ""

    // buscando o pokemon na função get pokemon
    const data = await getPokemon(pokemon)
    if(data !== undefined){
        pokemonName.innerText = data.name
        pokemonNumber.innerText = data.id
        pokemonImage.style.display = "block"
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
       
        pokemonAtual = data.id
        input.value = ""
        input.focus()
    }
    else {
        pokemonName.innerText = "Pokemon não encontrado"
        pokemonNumber.innerText = ""
        pokemonImage.style.display = "none"
    }

}

// evento de busca
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
})


//botao anterior
btnPrev.addEventListener("click", () =>{
    if(pokemonAtual > 1){
        pokemonAtual--
        renderPokemon(pokemonAtual)
    }
})

btnNext.addEventListener("click", () =>{
        pokemonAtual++
        renderPokemon(pokemonAtual)
})

renderPokemon(pokemonAtual)