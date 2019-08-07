const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');

const productosController = require('../controllers/productosController');

const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// middleware p proteger rotas //
const auth = require('../middleware/auth');

module.exports = function() {
  // agregar novos clientes via POST
  router.post('/clientes', 
    auth,
    clienteController.nuevoCliente);

  // obter todos os clientes
  router.get('/clientes', 
      auth,
      clienteController.mostrarClientes);

  // mostrar um cliente específico (ID)
  router.get('/clientes/:idCliente', 
    auth,
    clienteController.mostrarCliente);

  // atualizar cliente
  router.put('/clientes/:idCliente',  
    auth,
    clienteController.atualizarCliente);

  // eliminar cliente
  router.delete('/clientes/:idCliente',
    auth, 
    clienteController.eliminarCliente);

 

  /** Productos */
  // novos produtos
  router.post(
    '/productos',
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  // mostrar todos os produtos
  router.get('/productos', 
    auth,
    productosController.mostrarProductos);

  // mostrar um producto específico (ID)
  router.get('/productos/:idProducto', 
    auth,
    productosController.mostrarProducto);

  // atualizar producto
  router.put('/productos/:idProducto', 
    auth,
    productosController.subirArchivo,productosController.atualizarProducto);

  // eliminar producto
  router.delete('/productos/:idProducto',
    auth,
    productosController.eliminarProducto);

   // busca de produtos  //
   router.post('/productos/busqueda/:query', 
    auth,
    productosController.buscarProducto);  

  /**  Pedidos  */

  // adicionar novos pedidos
  //router.post('/pedidos', pedidosController.nuevoPedido);
  router.post('/pedidos/nuevo/:idUsuario', 
       pedidosController.nuevoPedido);

  //mostrar todos os pedidos  
  router.get('/pedidos', 
    auth, 
    pedidosController.mostrarPedidos);

  // mostrar um pedido específico (ID)
  router.get('/pedidos/:idPedido', 
    auth,
    pedidosController.mostrarPedido);

  // atualizar pedido
  router.put('/pedidos/:idPedido', 
    auth,
    pedidosController.atualizarPedido);

  // eliminar pedido
  router.delete('/pedidos/:idPedido', 
    auth,
    pedidosController.eliminarPedido);

  // usuários 

  router.post('/crear-cuenta', 
    auth,
    usuariosController.registrarUsuario
  );

  router.post('/iniciar-sesion',
    usuariosController.autenticarUsuario
  );

  return router;
};
