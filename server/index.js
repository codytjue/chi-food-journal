const express = require('express');
const app = express();
const port = 3434;

app.use(express.static(__dirname + "/../client/dist"))

app.get('/', (req, res) => {
  res.send('Hello :)')
})

app.listen(port, ()=> {
  console.log(`MVP is listening at http://localhost:${port}`)
})