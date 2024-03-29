//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Ayush-Prash'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/Ayush-Prash/index.html'));
});

// Start the app by lis
app.listen(process.env.PORT || 8080);
