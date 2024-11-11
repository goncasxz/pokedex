let offset = 0;
const limit = 10;
const maxRecords = 151;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')

function abrirmodal(pokemonId){
    const modal = document.getElementById('modal-frame');
    const modalContent = document.querySelector('.modal');

    pokeApi.getPokemonDetail({url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`})
    .then((pokemon) => {
        const heightInMeters = (pokemon.height / 10 ).toFixed(2);
        const weightInKg = (pokemon.weight / 10).toFixed(2);
        const pokemonType = pokemon.type
        modalContent.style.backgroundColor = getTypeBackgroundColor(pokemonType)

        modalContent.innerHTML = `
           <button class="fechar" id="fechar">X</button>
                <h2>${pokemon.name.toUpperCase()}</h2>
                <h3>Tipos</h3>
                <ul>
                    ${pokemon.types.map(type => `<li>${type}</li>`).join('')}
                </ul>
                <p><strong>Peso:</strong> ${weightInKg} kg</p>
                <p><strong>Altura:</strong> ${heightInMeters} m</p>

                <div class="image-container">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
        `;
        modal.classList.add('abrir');
    });



modal.addEventListener('click', (e) => {
    if (e.target.id == 'fechar' || e.target.id == 'modal-frame') {
        modal.classList.remove('abrir');
    }
});
}


function getTypeBackgroundColor(type) {
    const colors = {
        normal: '#a6a877',
        grass: '#77c850',
        fire: '#ee7f30',
        water: '#678fee',
        electric: '#f7cf2e',
        ice: '#98d5d7',
        ground: '#dfbf69',
        flying: '#a98ff0',
        poison: '#a040a0',
        fighting: '#bf3029',
        psychic: '#f65687',
        dark: '#725847',
        rock: '#b8a137',
        bug: '#a8b720',
        ghost: '#6e5896',
        steel: '#b9b7cf',
        dragon: '#6f38f6',
        fairy: '#f9aec7'
    };

    return colors[type] || '#ffffff';
}


function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li onclick="abrirmodal(${pokemon.number})" class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
            </li>
        `).join("")
            pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if(qtdRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemonItems(offset, limit)
    }
})

