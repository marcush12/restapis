const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Upload de arquivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

// adicionar novo producto
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename
    }
    // armazenar o registro
    await producto.save();
    res.json({ mensagem: 'Novo producto adicionado com sucesso!' });
  } catch (error) {
    // se tem erro, console.log e next
    console.log(error);
    next();
  }
};
// mostrar todos os productos
exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};
//mostrar um producto por seu ID
exports.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);
  if (!producto) {
    res.json({ mensagem: 'Não existe producto com esse ID' });
    return next();
  }
  // se está td bem, mostrar o producto
  res.json(producto);
};

// atualizar cliente pelo seu ID
exports.atualizarProducto = async (req, res, next) => {
  try {
    

    // construir novo Vue.config.productionTip
    const nuevoProducto = req.body;

    // verificar se tem imagem nova  
    if(req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      const productoAnterior = await Productos.findById( req.params.idProducto);
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    const producto = await Productos.findOneAndUpdate(
      { _id: req.params.idProducto },
      nuevoProducto,
      {
        new: true
      }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

// eliminar producto pelo seu ID
exports.eliminarProducto = async (req, res, next) => {
  try {
    await Productos.findOneAndDelete({ _id: req.params.idProducto });
    res.json({ mensagem: 'O producto foi eliminado!' });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.buscarProducto = async (req, res, next) => {
  try {
    // obter a query
    const { query } = req.params; 
    const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
}
