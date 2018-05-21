const express = require('express');
var app = express();

app.get('/',(req,res)=>{
    const {callback} =req.query;
    const data = {
        name:'zhangsan'
    };
    res.type('text/javascript');
    res.send(`${callback}(${JSON.stringify(data)})`);
})

app.listen(9000);