const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // autorização por meio do header //
  const authHeader = req.get('Authorization');

  if(!authHeader) {
    const error = new Error('Não autenticado; sem token');
    error.statusCode = 401;
    throw error;
  }

  // obter e verificar token //
  const token = authHeader.split(' ')[1]; //p.e. Bearer 768998888
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, 'chave');
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  // token é válido mas tem algum erro //
  if(!revisarToken) {
    const error = new Error('Ai cacilda! Não autenticado!');
    error.statusCode = 401;
    throw error;
  }

  next();
}