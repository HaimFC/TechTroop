// insert_pokemon.js
const Sequelize = require('sequelize');
const path = require('path');

// 1) Connect to your MySQL "sql_pokemon" database
const sequelize = new Sequelize('mysql://root:@localhost/sql_pokemon', {
  logging: false, // set true to see SQL
});

// 2) Load the JSON (save it as pokemon.json in the same folder)
const data = require('./db/poke_data'); 

async function getTypeId(typeName) {
  const [rows] = await sequelize.query(
    'SELECT type_id FROM pokemon_type WHERE p_type = :name',
    { replacements: { name: typeName } }
  );
  if (rows.length) return rows[0].type_id;

  await sequelize.query(
    'INSERT INTO pokemon_type (p_type) VALUES (:name)',
    { replacements: { name: typeName } }
  );
  const [rows2] = await sequelize.query(
    'SELECT type_id FROM pokemon_type WHERE p_type = :name',
    { replacements: { name: typeName } }
  );
  return rows2[0].type_id;
}

async function getTownId(townName) {
  const [rows] = await sequelize.query(
    'SELECT town_id FROM town WHERE town_name = :name',
    { replacements: { name: townName } }
  );
  if (rows.length) return rows[0].town_id;

  await sequelize.query(
    'INSERT INTO town (town_name) VALUES (:name)',
    { replacements: { name: townName } }
  );
  const [rows2] = await sequelize.query(
    'SELECT town_id FROM town WHERE town_name = :name',
    { replacements: { name: townName } }
  );
  return rows2[0].town_id;
}

async function getTrainerId(trainerName, townName) {
  // get town first
  const town_id = await getTownId(townName);

  const [rows] = await sequelize.query(
    'SELECT trainer_id FROM trainer WHERE name = :name AND town_id = :town_id',
    { replacements: { name: trainerName, town_id } }
  );
  if (rows.length) return rows[0].trainer_id;

  await sequelize.query(
    'INSERT INTO trainer (name, town_id) VALUES (:name, :town_id)',
    { replacements: { name: trainerName, town_id } }
  );
  const [rows2] = await sequelize.query(
    'SELECT trainer_id FROM trainer WHERE name = :name AND town_id = :town_id',
    { replacements: { name: trainerName, town_id } }
  );
  return rows2[0].trainer_id;
}

async function upsertPokemon(p) {
  // p: { id, name, type, height, weight }
  const type_id = await getTypeId(p.type);

  // keep JSON id as pokemon_id; set ownedBy = NULL (we use junction table)
  await sequelize.query(
    `INSERT INTO pokemon (pokemon_id, name, type, height, weight, ownedBy)
     VALUES (:id, :name, :type_id, :height, :weight, NULL)
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       type = VALUES(type),
       height = VALUES(height),
       weight = VALUES(weight)`,
    {
      replacements: {
        id: p.id,
        name: p.name,
        type_id,
        height: p.height,
        weight: p.weight,
      },
    }
  );
  return p.id; // return pokemon_id
}

async function linkTrainerPokemon(trainer_id, pokemon_id) {
  // Avoid duplicates without changing your schema:
  const [exists] = await sequelize.query(
    `SELECT 1 FROM pokemon_trainer
     WHERE trainer_id = :trainer_id AND pokemon_id = :pokemon_id
     LIMIT 1`,
    { replacements: { trainer_id, pokemon_id } }
  );
  if (exists.length) return;

  await sequelize.query(
    `INSERT INTO pokemon_trainer (trainer_id, pokemon_id)
     VALUES (:trainer_id, :pokemon_id)`,
    { replacements: { trainer_id, pokemon_id } }
  );
}

// --- main importer ---

async function importAll() {
  try {
    // Optional sanity check: use the DB
    await sequelize.query('USE sql_pokemon');

    for (const p of data) {
      const pokemon_id = await upsertPokemon(p);

      // owners array: [{name, town}, ...]
      for (const owner of p.ownedBy || []) {
        const trainer_id = await getTrainerId(owner.name, owner.town);
        await linkTrainerPokemon(trainer_id, pokemon_id);
      }
    }

    console.log('✅ Import finished successfully.');
  } catch (err) {
    console.error('❌ Import failed:', err);
  } finally {
    await sequelize.close();
  }
}

importAll();
