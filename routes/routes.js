const sql = require('mssql');


const router = app => {
    //Mostrar mensaje de bienvenida
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API con MSSQL'
        });
    });

    //Mostrar todos los usuarios
    app.get('/users', async (request, response) => {
        try {
            const pool = await sql.connect('./data/config');
            const result = await pool.request().query('SELECT * FROM users');
            response.send(result.recordset);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Mostrar un solo usuario por ID
    app.get('/users/:IdU', async (request, response) => {
        const IdU = request.params.IdU;

        try {
            const pool = await sql.connect('./data/config');
            const result = await pool
                .request()
                .input('IdU', sql.Int, IdU) // Declarar el parámetro @id
                .query('SELECT * FROM users WHERE IdU = @IdU');
            
            response.send(result.recordset);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    //Agregar un nuevo usuario
    app.post('/users', async (request, response) => {
        const newUser = request.body;

        try {
            const pool = await sql.connect('./data/config');
            const request = pool.request();
                    
            request.input('IdU', sql.Int, newUser.IdU);
            request.input('Nombre', sql.VarChar(45), newUser.Nombre);
            request.input('Apellido', sql.VarChar(45), newUser.Apellido);
        
            await request.query('INSERT INTO users (IdU, Nombre, Apellido) VALUES (@IdU, @Nombre, @Apellido)');
        
            response.status(201).send('User added successfully');
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
        
    });

    // Ejemplo de petición POST
    // {
    //     "IdU": "4",
    //     "Nombre": yael,
    //     "Apellido": "avila"
    // }

    // Actualizar un usuario existente
    app.put('/users/:IdU', async (request, response) => {
        try {
            const IdU = request.params.IdU;
            const newUser = request.body;

            const pool = await sql.connect('./data/config');

            const result = await pool
                .request()
                .input('IdU', sql.Int, IdU)
                .input('Nombre', sql.VarChar(45), newUser.Nombre)
                .input('Apellido', sql.VarChar(45), newUser.Apellido)
                .query('UPDATE users SET IdU = @IdU, Nombre = @Nombre, Apellido = @Apellido');

            response.send('User updated successfully');
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Eliminar un usuario
    app.delete('/users/:IdU', async (request, response) => {
        const IdU = request.params.IdU;

        try {
            const pool = await sql.connect('./data/config');

            const result = await pool
                .request()
                .input('IdU', sql.Int, IdU)
                .query('DELETE FROM users WHERE IdU = IdU');

            response.send('User deleted');
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });
    
    //-----------------------------------------------------------------------------------------------------------------------Productos
    //Mostrar todos los productos
    app.get('/productos', async (request, response) => {
        try {
            const pool = await sql.connect('./data/config');
            const result = await pool.request().query('SELECT * FROM productos');
            response.send(result.recordset);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Mostrar un solo producto por ID
    app.get('/productos/:IdProd ', async (request, response) => {
        const IdProd = request.params.IdProd;

        try {
            const pool = await sql.connect('./data/config');
            const result = await pool
                .request()
                .input('IdProd', sql.Int, IdProd) // Declarar el parámetro @id
                .query('SELECT * FROM productos WHERE IdProd = @IdProd');
            
            response.send(result.recordset);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    //Agregar un nuevo producto
    app.post('/productos', async (request, response) => {
        const newProd = request.body;

        try {
            const pool = await sql.connect('./data/config');

            const request = pool.request();
            
            // Asignar parámetros individualmente
            request.input('IdProd', sql.Int, newProd.IdProd);
            request.input('NomProd', sql.VarChar(45), newProd.NomProd);
            request.input('stock', sql.Int, newProd.stock);

            const result = await request.query('INSERT INTO productos (IdProd, NomProd, stock) VALUES (@IdProd, @NomProd, @stock)');


            response.status(201).send(`Product added with ID: ${IdProd}`);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Actualizar un producto existente
    app.put('/productos/:IdProd', async (request, response) => {
        try {
            const IdProd = request.params.IdProd;
            const newProduct = request.body;

            const pool = await sql.connect('./data/config');

            const result = await pool
                .request()
                .input('IdProd', sql.Int, IdProd)
                .input('NomProd', sql.VarChar(45), newProduct.NomProd)
                .input('stock', sql.Int, newProduct.stock)
                .query('UPDATE productos SET IdProd = @IdProd, NomProd = @NomProd, stock = @stock WHERE IdProd = @IdProd');
            response.send('Product updated successfully');
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Eliminar un producto
    app.delete('/productos/:IdProd', async (request, response) => {
        const IdProd = request.params.IdProd;

        try {
            const pool = await sql.connect('./data/config');

            const result = await pool
                .request()
                .input('IdProd', sql.Int, IdProd)
                .query('DELETE FROM productos WHERE IdProd = @IdProd');

            response.send('Product deleted');
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });
    //-----------------------------------------------------------------------------------------------------------------------/Productos

    //-----------------------------------------------------------------------------------------------------------------------Ventas
    //Mostrar todas las ventas
    app.get('/ventas', async (request, response) => {
        try {
            const pool = await sql.connect('./data/config');
            const result = await pool.request().query('SELECT * FROM ventas');
            response.send(result.recordset);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Mostrar una sola venta por ID
    app.get('/ventas/:IdVenta', async (request, response) => {
        const IdVenta = request.params.IdVenta;

        try {
            const pool = await sql.connect('./data/config');
            const result = await pool
                .request()
                .input('IdVenta', sql.Int, IdVenta) // Declarar el parámetro @id
                .query('SELECT * FROM ventas WHERE IdVenta = @IdVenta');
            
            response.send(result.recordset);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    //Agregar un nuevo usuario
    app.post('/ventas', async (request, response) => {
        const newVenta = request.body;

        try {
            const pool = await sql.connect('./data/config');

            const request = pool.request();
            
            // Asignar parámetros individualmente
            request.input('IdVenta', sql.Int, newVenta.IdVenta);
            request.input('IdProd', sql.Int, newVenta.IdProd);
            request.input('Vendedor', sql.VarChar(45), newVenta.Vendedor);

            const result = await request.query('INSERT INTO ventas (IdVenta, IdProd, Vendedor) VALUES (@IdVenta, @IdProd, @Vendedor)');

            response.status(201).send(`Venta added with ID: ${IdVenta}`);
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Actualizar una venta existente
    app.put('/ventas/:IdVenta', async (request, response) => {
        try {
            const IdVenta = request.params.IdVenta;
            const newVenta = request.body;

            const pool = await sql.connect('./data/config');

            const result = await pool
                .request()
                .input('IdVenta', sql.Int, IdVenta)
                .input('IdProd', sql.Int, newVenta.IdProd)
                .input('Vendedor', sql.VarChar(45), newVenta.Vendedor)

                .query('UPDATE ventas SET IdVenta = @IdVenta, IdProd = @IdProd, Vendedor = @Vendedor');

            response.send('Venta updated successfully');
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });

    // Eliminar un producto
    app.delete('/ventas/:IdVenta', async (request, response) => {
        const IdVenta = request.params.IdVenta;

        try {
            const pool = await sql.connect('./data/config');

            const result = await pool
                .request()
                .input('IdVenta', sql.Int, IdVenta)
                .query('DELETE FROM ventas WHERE IdVenta = @IdVenta');

            response.send('Venta deleted');
        } catch (error) {
            console.error(error);
            response.status(500).send('Error de servidor');
        }
    });
    //-----------------------------------------------------------------------------------------------------------------------/Ventas

}

//Exportar el router
module.exports = router;