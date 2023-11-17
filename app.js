//Require packages and setport
const express = require('express');
const port =3002;
//Para permitir manejo de POST y PUT
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const router = require('./routes/routes');
const app = express(); 

//usar Node.JS body parsing middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true,
}));

router(app);

//iniciar el servidor
const server = app.listen(port, (error) => {
  if (error) return console.log('Error: ${error}');
  
  console.log(`el servidor escucha en el puerto ${server.address().port}`);
});

/*var express = require('express');

var app = express();

app.get('/', function(req, res){
res.send('Mi primera api');
})

app.get('/saluido', function(req, res){
    res.send('Hola Mundoo!!!');
    })
    
app.get('/despedida', function(req, res){
          res.send('adios mundo cruel');
        })
        
    app.get('/despedida/familia', function(req, res){
    res.send('Los quiero a todos');
          })
          app.get('/despedida/empleados', function(req, res){
            res.send('Que quieres un beso? rumebele');
                  })
        
app.listen(3000, function(){
console.log('Aplicacion ejemplo, escuchando el puerto 3000');
});*/