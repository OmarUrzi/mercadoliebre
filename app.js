const express = require('express')
const session = require('express-session')
const cookies = require('cookie-parser')
const app = express()
const homeRouter = require('./routes/homeRouter')
const productRouter = require('./routes/productRouter')
const methodOverride = require('method-override')
const port = process.env.PORT
const multer = require('multer')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/', homeRouter);
app.use('/products', productRouter);


app.listen(port || 3000, () => {
    console.log('El server esta corriendo en el poerto ' + port);
});




