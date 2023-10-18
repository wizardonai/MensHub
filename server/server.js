const express = require('express');
const server = express();

//deploy react
server.use(express.static('[...]/build'));
server.get('/', (req, res) => {
  res.sendFile(path.resolve('[...]/build/index.html'));
});


const port = 3000;
server.listen(port, () => {
  console.log("http://localhost:" + port);
});