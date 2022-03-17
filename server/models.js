const { Pool } = require('pg');

const PG_URI =  'postgres://tskmwytw:qEZj0yRRSKPMS0JpbU3izdHxQ1blS-ov@kashin.db.elephantsql.com/tskmwytw'

const pool = new Pool ({
    connectionString: PG_URI
})

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };


 