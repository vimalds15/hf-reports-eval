import jsonServer from "json-server"

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Serves your JSON file
const middlewares = jsonServer.defaults();

// Use default middlewares (CORS, static files, etc.)
server.use(middlewares);

// Custom middleware for logging requests
server.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Use the router
server.use(router);

// Start the server
server.listen(5000, function () {
  console.log("JSON Server is running at http://localhost:" + 5000);
});
