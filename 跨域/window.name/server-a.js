const express = require('express');
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,'public/a')));

app.listen(3000);