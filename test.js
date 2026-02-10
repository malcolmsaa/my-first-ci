const http = require("http");
const app = require("./index");

const server = app.listen(3000, () => {
  console.log("Running tests...");

  http.get("http://localhost:3000/status", (res) => {
    let data = "";

    res.on("data", chunk => data += chunk);
    res.on("end", () => {
      const json = JSON.parse(data);

      if (json.status === "ok") {
        console.log("✓ Status endpoint test passed");
        server.close(() => process.exit(0));
      } else {
        console.error("✗ Status endpoint test failed");
        server.close(() => process.exit(1));
      }
    });
  }).on("error", (err) => {
    console.error("✗ Request failed", err);
    server.close(() => process.exit(1));
  });
});
