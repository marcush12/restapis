const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
  // leer los datos del usuario y colocarlos en Usuarios
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: 'Usuario Criado Corretamente' });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Deu um erro' });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  // buscar o usuario //
  const { email, password } = req.body; // desctruct
  const usuario = await Usuarios.findOne({ email }); // findOne({ email: req.body.email })

  if(!usuario) {
    // se usuario não existe //
    await res.status(401).json({mensaje: 'Esse usuario não existe'});
    next();
  } else {
    // usuario existe: verificar se password está correto //
    if(!bcrypt.compareSync(password, usuario.password)){
      // se a senha for incorreta //
      await res.status(401).json({mensaje: 'email ou senha incorretos'});
      next();
    } else {
      // senha correta, token criar  //
      const token = jwt.sign({
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario._id
      }, 
      'chave',
      {
        expiresIn: '30d'
      })

      // retornar o token //
      res.json({ token });
    }
  }
};
