import Sequelize from 'sequelize';
const sequelize = new Sequelize('mysql://root:@localhost/sql_pokemon')


async function findByType(type){ 

    const pokemons = []
    let pokemonData = await sequelize.query(`SELECT type_id FROM pokemon_type WHERE pokemon_type.p_type='${type}'`)
    let pokemonTypeID = pokemonData[0][0].type_id

    if (!pokemonTypeID) { return }

    let [result] = await sequelize.query(`SELECT * FROM pokemon WHERE pokemon.type = '${pokemonTypeID}'`)

    result.forEach(element => {
        pokemons.push(element.name)
    });
    return pokemons
}

const pokemons = await findByType("grass")

console.log(pokemons)




