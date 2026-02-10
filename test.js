const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/status',
  method: 'GET'
};

console.log('Running tests...');

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);

      if (json.status === 'ok') {
        console.log('✓ Status endpoint test passed');
        process.exit(0); // ✅ VIKTIGT
      } else {
        console.error('✗ Status endpoint test failed');
        process.exit(1);
      }
    } catch (err) {
      console.error('✗ Invalid JSON response');
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('✗ Request failed', error);
  process.exit(1);
});

req.end();
