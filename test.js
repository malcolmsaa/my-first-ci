const http = require('http');
const app = require('./index');

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log('Running tests...');
});

const options = {
  hostname: 'localhost',
  port: PORT,
  path: '/status',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);

    if (json.status === 'ok') {
      console.log('✓ Status endpoint test passed');
      server.close(() => process.exit(0));
    } else {
      console.error('✗ Status endpoint test failed');
      server.close(() => process.exit(1));
    }
  });
});

req.on('error', (err) => {
  console.error(err);
  server.close(() => process.exit(1));
});

req.end();
