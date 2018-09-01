const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(3000, () => {
  console.log('Oh hey.')
})
