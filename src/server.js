const app = require("./app");

const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;

app.express.listen(PORT, HOST, () => {
  console.log(`🔥🔥 Server is listening on ${HOST}:${PORT}`);
});
