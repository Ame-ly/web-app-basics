const express = require('express');
const exhbs = require('express-handlebars');
const products = require('./products.json');

const PORT = process.env.PORT || 5555
const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exhbs({
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs',
  }),
);

app.get('/', (req, res) => {
  // console.log('this is app.get("/")');
  // console.log(req.url);
  // res.send('<h1>Hello</h1>');
  res.render('home', {cssFileName: 'common', pageTitle: 'Главная' });
});

app.get('/about', (req, res) => {
  // console.log('this is app.get("/about")');
  // console.log(req.url);
  res.render('about', { cssFileName: 'common', pageTitle: 'О нас' });
});

app.get('/products', (req, res) => {
  
  res.render('products', {
    products,
    cssFileName: 'products',
    pageTitle: 'Товары',
  });
});

app.get('/product/:productId', (req, res) => {
   console.log(req.params);

  const product = products.find(p => p.id === req.params.productId);

  res.render('product', { product, pageTitle: 'Товар' });
});


app.listen(PORT, () => {
  console.log(`Hello ${5555}`);
});
