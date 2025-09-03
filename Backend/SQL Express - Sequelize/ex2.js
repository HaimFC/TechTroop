import Sequelize from 'sequelize';
const sequelize = new Sequelize('mysql://root:@localhost/sql_pokemon')

let [rows] = await sequelize.query(`
  SELECT name 
  FROM pokemon
  WHERE weight = (SELECT MAX(weight) FROM pokemon)
`);
console.log(rows[0].name);

