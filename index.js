const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env'});//endereço p as variaveis de entorno //

// cors permite que um cliente se conecte a outro servidor para intercâmbio de recursos
const cors = require('cors');

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
});

// criar o servidor
const app = express();

// pasta publica vai ser usada em Producto.js da cliente-api
app.use(express.static('uploads'));

// habilitar o bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// definir um domínio(s) para receber as petições
const whitelist = [process.env.FRONTEND_URL]; // ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    // verificar se a petição vem de um servidor q está na whitelist //
    const existe = whitelist.some( dominio => dominio === origin );
    if(existe) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  }
}

// habilitar o cors
app.use(cors(corsOptions));

// rotas da app
app.use('/', routes()); // vai executar a func definida no routes/index



const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;


// iniciar app
app.listen(port, host, () => {
  console.log('o servidor está funcionando');
});
