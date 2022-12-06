require('dotenv').config();
const { Pool } = require('pg');
const PG_URI =
  'postgres://kowmxzor:T6aTKGNyJrCHfCjJ2Fk6FsjKShtHVw3D@suleiman.db.elephantsql.com/kowmxzor';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
