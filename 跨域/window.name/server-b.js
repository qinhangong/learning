const express = require('express');
var app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'public/b')));

app.listen(4000);