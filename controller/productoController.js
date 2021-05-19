const {validationResult} = require('express-validator')
const jsonDB = require('../model/jsonDatabase')
const productModel = jsonDB('products')

let productController = {

    home: (req, res) => {
        res.redirect('/')
    },
    show: (req, res) => {
        const product = productModel.find(req.params.id)
        if (product) {
            res.render('detailProduct', { product })
        } else {
            res.render('error404')
        }
    },
    create: (req, res) => {
        res.render('createProduct')
    },
    store: (req, res) => {
        const resultValidation = validationResult(req)
        if(resultValidation.errors.length > 0){
            return res.render('createProduct', {
                errors: resultValidation.mapped(),
                oldData: req.body 
            })
        }
        const product = req.body
        product.image = req.file ? req.file.filename : ''
        productModel.create(product)
        res.redirect('/')
    },
    edit: (req, res) => {
      let product = productModel.find(req.params.id)
        if (product) {
            res.render('editProduct', { product })
        } else {
            res.render('error404')
        }
    },
    update: (req, res) => {
        const resultValidation = validationResult(req)
            let newProductValues = req.body
            newProductValues.id = req.params.id
            if (resultValidation.errors.length > 0) {
            return res.render('editProduct', {
                errors: resultValidation.mapped(),
                oldData: newProductValues, product: newProductValues
            });
        }
        const product = req.body
        product.id = req.params.id  
          product.image = req.file ? req.file.filename : req.body.oldImagen
          if (req.body.image===undefined) {
            product.image = product.oldImage
        }   
        delete product.oldImage
        productModel.update(product) 
        res.redirect('/')  
    },
    destroy: (req, res) => {
        productModel.delete(req.params.id)
        res.redirect('/')
    },
    cart: (req, res) => {
        res.render('products/cart')
    },
    search: (req, res) => {
        let dataABuscar = req.query
        res.sed(dataABuscar)
    }
}


module.exports = productController
