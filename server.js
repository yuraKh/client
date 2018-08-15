const express = require('express');
const http = require('http')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'my-app')));

app.get('*', (req, res) => {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(path.join(__dirname + '/dist/my-app/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));
