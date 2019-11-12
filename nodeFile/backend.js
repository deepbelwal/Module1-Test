const apiCallFromNode = require('./NodeJsCall')
var express=require('express')
var app=express()

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });


app.get('/node',(req,res)=>{
    if(req.url === "/node"){
        apiCallFromNode.callApi(function(response){
            res.send(response)
          
        });
    }
})
app.get('/node1/:id',(req,res)=>{
    let newUrl=`/node1/${req.params.id}`
    console.log(newUrl, req.url, req.params);
    if(req.url === newUrl){
        console.log('in here')
        apiCallFromNode.callApi(function(response){
            const r = JSON.parse(response)
            const result = r.filter(word => word.id == req.params.id)
            res.send(result)
        })
    }
})
app.listen(8080)


console.log("service running on 8080 port....");