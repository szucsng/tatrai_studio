const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'u20_eqJNUeShB',
      password: 'ksdxHxPXjgENW7+77pRCZst',
      database: 's20_kepweb'
    });
    
    console.log('✅ Connection successful!');
    const [rows] = await connection.execute('SHOW TABLES');
    console.log('Tables:', rows);
    await connection.end();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
