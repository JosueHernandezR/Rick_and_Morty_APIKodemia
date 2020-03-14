//Lógica de las funciones ue mandan a llamar el servidor

async function getAllCharacters(){
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const parsedJson = await response.json()
    return parsedJson.results
}

async function getAllCharactersById(id){
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const parsedJson = await response.json()
    return parsedJson
}

export default {
    getAllCharacters,
    getAllCharactersById
}