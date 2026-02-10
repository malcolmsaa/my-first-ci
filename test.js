const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/status',
  method: 'GET'
};

console.log('Running tests...');

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.status === 'ok') {
      console.log('✓ Status endpoint test passed');
      process.exit(0);
    } else {
      process.exit(1);
    }
  });
});

req.on('error', () => process.exit(1));
req.end();
