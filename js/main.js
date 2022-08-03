const pokemonImage = document.querySelector('.pokemon-image')
const pokemonID = document.querySelector('.pokemon-id')
const pokemonNumber = document.querySelector('#pokemon-number')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonType = document.querySelector('.type')

const pokemonHP = document.querySelector('.hp')
const pokemonAttack = document.querySelector('.attack')
const pokemonDefense = document.querySelector('.defense')
const pokemonSpAttack = document.querySelector('.special-attack')
const pokemonSpDefense = document.querySelector('.special-defense')
const pokemonSpeed = document.querySelector('.speed')

const input = document.querySelector('#search-pokemon-name')

const base = ['sprites']
const initial = ['front_default']
const genI = ['versions', 'generation-i','yellow','front_transparent']

var gen = initial

const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon, gen) => {

    pokemonImage.style.display = 'block'
    pokemonImage.setAttribute("src", './images/loading.png')
    pokemonImage.classList.add("rotate")
    pokemonName.innerHTML = 'Loading...'

    let query = base.concat(gen)
    const data = await fetchPokemon(pokemon.toLowerCase())


    if (data) {

        if (query.reduce((o, k)=>o[k], data) != null) {
            
            pokemonImage.style.display = 'block'
            pokemonImage.classList.remove("rotate")
            pokemonImage.setAttribute("src", query.reduce((o, k)=>o[k], data))
            

        } else {

            pokemonImage.style.display = 'block'
            pokemonImage.setAttribute("src", './images/null.png')

        }

        pokemonID.innerHTML = `ID: ${('000' + data['id']).slice(-3)}`
        pokemonNumber.innerHTML = `${('000' + data['id']).slice(-3)}`
        pokemonName.innerHTML = data['name']
        pokemonType.innerHTML = `Type: ${data['types']['0']['type']['name']}`
    
        pokemonHP.innerHTML = `HP: ${data['stats']['0']['base_stat']}`
        pokemonAttack.innerHTML = `ATK: ${data['stats']['1']['base_stat']}`
        pokemonDefense.innerHTML = `DEF: ${data['stats']['2']['base_stat']}`
    
        if (data['stats']['3']['base_stat']) {
            pokemonSpAttack.innerHTML = `Sp. ATK: ${data['stats']['3']['base_stat']}`
        }
    
        if (data['stats']['4']['base_stat']) {
            pokemonSpDefense.innerHTML = `Sp. DEF: ${data['stats']['4']['base_stat']}`
        }
    
        if (data['stats']['5']['base_stat']) {
            pokemonSpeed.innerHTML = `SPD: ${data['stats']['5']['base_stat']}`
        }
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :('
        pokemonNumber.innerHTML = ''
        pokemonID.innerHTML = ''
        pokemonType.innerHTML = ''
        pokemonHP.innerHTML = ''
        pokemonAttack.innerHTML = ''
        pokemonDefense.innerHTML = ''
        pokemonSpAttack.innerHTML = ''
        pokemonSpDefense.innerHTML = ''
        pokemonSpeed.innerHTML = ''
    }

    

}

input.addEventListener('keyup', (event) => {
    
    var btn = event.keyCode;

    if (btn === 13){
        
        renderPokemon(event.target.value, gen);

    }

})