//* cargue la conexion del grupo MySQL
const { request, response } = require('express');
const pool = require('../data/config');

//*ruta de la app
const router = app => {
//*mostrar mensaje de bienvenida de root
app.get('/', (request, response) =>{
    response.send({
        message: 'Bienvenido a Node.js Express REST API!'
    });
});
//? querys de la tabla usuarios
//todo Mostrar todos los usuarios
app.get('/users', (request, response) => {
pool.query('SELECT * FROM users',
(error, result) => {
    if (error) throw error;
    response.send(result);
});
});


//todo Mostrar un solo usuario por ID
app.get('/users/:ID', (request, response) => {
    const ID = request.params.ID;
    
    pool.query('SELECT * FROM users WHERE ID = ?', 
    ID, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
    });



//todo Agregar un nuevo usuario
app.post('/users', (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, 
        result) => {
        if (error) throw error;

        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

//todo Actualizar un usuario existente
app.put('/users/:ID', (request, response) => {  
    const ID = request.params.ID; 
    pool.query('UPDATE users SET ? WHERE ID = ?', [request.body, ID], (error, result) => {
    
        if (error) throw error;
        response.send('User update successfully.');
    });
});

//todo Eliminar usuario
app.delete(`/users/:ID`, (request, response) => {
const ID = request.params.ID;

pool.query(`DELETE FROM users WHERE ID =?`, ID, (error, result) => {
    if (error) throw error;
    response.send('User Deleted');
});
});



//? ----------------------------------------------------querys de tabla productos -----------------------------------------------------------
//todo Mostrar todos los productos
app.get('/productos', (request, response) => {
pool.query('SELECT * FROM productos',
(error, result) => {
    if (error) throw error;
    response.send(result);
});
});


//todo Mostrar un solo producto por ID
app.get('/productos/:IdProd', (request, response) => {
    const IdProd = request.params.IdProd;
    
    pool.query('SELECT * FROM users WHERE ID = ?', 
    ID, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
    });



//todo Agregar un nuevo producto
app.post('/productos', (request, response) => {
    pool.query('INSERT INTO productos SET ?', request.body, (error, 
        result) => {
        if (error) throw error;

        response.status(201).send(`Product added with IdProd: ${result.insertIdProd}`);
    });
});

//todo Actualizar un producto existente
app.put('/productos/:IdProd', (request, response) => {  
    const IdProd = request.params.IdProd; 
    pool.query('UPDATE productos SET ? WHERE IdProd = ?', [request.body, IdProd], (error, result) => {
    
        if (error) throw error;
        response.send('Product update successfully.');
    });
});

//todo Eliminar producto
app.delete(`/productos/:IdProd`, (request, response) => {
const IdProd = request.params.IdProd;

pool.query(`DELETE FROM productos WHERE IdProd =?`, IdProd, (error, result) => {
    if (error) throw error;
    response.send('Product Deleted');
});
});



//? ----------------------------------------------------querys de tabla ventas -----------------------------------------------------------
//todo Mostrar todos los productos
app.get('/ventas', (request, response) => {
    pool.query('SELECT * FROM ventas',
    (error, result) => {
        if (error) throw error;
        response.send(result);
    });
    });
    
    
    //todo Mostrar un solo producto por ID
    app.get('/ventas/:IdVenta', (request, response) => {
        const IdVenta = request.params.IdVenta;
        
        pool.query('SELECT * FROM ventas WHERE IdVenta = ?', 
        IdVenta, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
        });
    
    
    
    //todo Agregar un nuevo producto
    app.post('/ventas', (request, response) => {
        pool.query('INSERT INTO ventas SET ?', request.body, (error, 
            result) => {
            if (error) throw error;
    
            response.status(201).send(`Sell added with IdVenta: ${result.insertIdVenta}`);
        });
    });
    
    //todo Actualizar un producto existente
    app.put('/ventas/:IdVenta', (request, response) => {  
        const IdVenta = request.params.IdVenta; 
        pool.query('UPDATE ventas SET ? WHERE IdVenta = ?', [request.body, IdVenta], (error, result) => {
        
            if (error) throw error;
            response.send('Sell update successfully.');
        });
    });
    
    //todo Eliminar producto
    app.delete(`/ventas/:IdVenta`, (request, response) => {
    const IdVenta = request.params.IdVenta;
    
    pool.query(`DELETE FROM ventas WHERE IdVenta =?`, IdVenta, (error, result) => {
        if (error) throw error;
        response.send('Sell Deleted');
    });
    });
    
}

module.exports = router;
