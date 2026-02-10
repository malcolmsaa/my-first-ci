const http = require('http');
const app = require('./index');

const server = http.createServer(app);

server.listen(0, async () => {
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/status`);
    const data = await res.json();

    if (data.status === 'ok') {
      console.log('✓ Status endpoint test passed');
      process.exit(0);
    } else {
      console.error('✗ Status endpoint test failed');
      process.exit(1);
    }
  } catch (err) {
    console.error('✗ Request failed', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
