const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const ProdutoController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

// Pegando todos os produtos.
router.get('/', ProdutoController.getProdutos);
// Inserindo um produto.
router.post('/', login , upload.single('produto_imagem'),  ProdutoController.postProdutos);
// Buscando um unico produto expecifico
router.get('/:id_produtos', ProdutoController.getUmProduto);
// Atualiza produto
router.patch('/', login , ProdutoController.updateProduto);
// Deleta produto
router.delete('/', login , ProdutoController.deleteProduto);

module.exports = router;