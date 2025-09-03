import Sequelize from 'sequelize';
const sequelize = new Sequelize('mysql://root:@localhost/sql_pokemon')


async function findRoster(trainer_name) {
  const [rows] = await sequelize.query(
    `
    SELECT p.name
    FROM pokemon p
    JOIN pokemon_trainer pt ON pt.pokemon_id = p.pokemon_id
    JOIN trainer t ON pt.trainer_id = t.trainer_id
    WHERE t.name = :trainer_name
    `,
    { replacements: { trainer_name } }
  );

  return rows.map(r => r.name);
}

const owners = await findRoster("Loga");
console.log(owners);



