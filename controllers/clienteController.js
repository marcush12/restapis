const Clientes = require('../models/Clientes');

// adicionar novo cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    // armazenar o registro
    await cliente.save();
    res.json({ mensagem: 'Novo cliente adicionado com sucesso!' });
  } catch (error) {
    // se tem erro, console.log e next
    res.send(error);
    next();
  }
};
// mostrar todos os clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};
// mostrar um cliente por seu ID
exports.mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);
  if (!cliente) {
    res.json({ mensagem: 'Não existe cliente com esse ID' });
    next();
  }
  // se está td bem, mostrar o cliente
  res.json(cliente);
};

// atualizar cliente pelo seu ID
exports.atualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true
      }
    );
    res.json(cliente);
  } catch (error) {
    res.send(error);
    next();
  }
};

// eliminar cliente pelo seu ID
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensagem: 'O cliente foi eliminado!' });
  } catch (error) {
    console.log(error);
    next();
  }
};
