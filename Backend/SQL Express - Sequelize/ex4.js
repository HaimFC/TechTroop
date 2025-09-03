import Sequelize from 'sequelize';
const sequelize = new Sequelize('mysql://root:@localhost/sql_pokemon')


async function findOwners(pokemon_name) {
  const [rows] = await sequelize.query(
    `
    SELECT t.name
    FROM trainer t
    JOIN pokemon_trainer pt ON pt.trainer_id = t.trainer_id
    JOIN pokemon p ON p.pokemon_id = pt.pokemon_id
    WHERE p.name = :pokemon_name
    `,
    { replacements: { pokemon_name } }
  );

  return rows.map(r => r.name);
}

const owners = await findOwners("gengar");
console.log(owners);



