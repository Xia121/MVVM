var express = require('express');
var app = express();

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
})

var infor = {
    id: 1, name: 'JavaScript高级程序设计', number: 2
}


app.get('/api',function(req,res){           //配置接口api
    res.status(200),
    res.json(infor)
})

app.put('/put',function (req,res) {
    var putData = "";
    req.on("data", function(postDataChunk) {
        // putData += postDataChunk;
        putData = JSON.parse(postDataChunk)
        Object.assign(infor, putData)

    });
    req.on("end", function() {
        console.log("all data is '" + infor + "'.");
        //返回标示
        res.json(infor)
    })
})

//配置服务端口
var server = app.listen(3002,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('listen at :3002',host,port)
})
