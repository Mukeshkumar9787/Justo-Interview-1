import mysql2 from "mysql2/promise"

let connection = null; 

export async function getConnection() {
  if (connection) {
    return connection;
  }

  connection = await mysql2.createConnection({
    host: process.env.DB_HOST,         
    user: process.env.DB_USER,              
    password: process.env.DB_PASSWORD,      
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
  });

  return connection;
}


