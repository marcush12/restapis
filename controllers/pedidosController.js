const Pedidos = require('../models/Pedidos');

// adicionar novo cliente
exports.nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);

  try {
    // armazenar o registro
    await pedido.save();
    res.json({ mensagem: 'Novo pedido adicionado com sucesso!' });
  } catch (error) {
    // se tem erro, console.log e next
    console.log(error);
    next();
  }
};
// mostrar todos os pedidos
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({})
      .populate('cliente')
      .populate({
        path: 'pedido.producto',
        model: 'Productos'
      });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};
// mostrar um pedido por seu ID
exports.mostrarPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.idPedido)
    .populate('cliente')
    .populate({
      path: 'pedido.producto',
      model: 'Productos'
    });
  if (!pedido) {
    res.json({ mensagem: 'Não existe pedido com esse ID' });
    return next();
  }
  // se está td bem, mostrar o pedido
  res.json(pedido);
};

// atualizar pedido pelo seu ID
exports.atualizarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true
      }
    )
      .populate('cliente')
      .populate({
        path: 'pedido.producto',
        model: 'Productos'
      });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

// eliminar pedido pelo seu ID
exports.eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.iPedido });
    res.json({ mensagem: 'O pedido foi eliminado!' });
  } catch (error) {
    console.log(error);
    next();
  }
};
