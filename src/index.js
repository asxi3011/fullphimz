const express = require('express')
const exphbs  = require('express-handlebars');
var path = require('path')
const route = require('./routes/index')

const app = express()
const port = process.env.PORT;
app.engine('.hbs', exphbs({
  extname:".hbs"
}));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const db = require('./config/db');
db.connect();
app.set('view engine', '.hbs');
app.set('views',(path.join(__dirname,'resources/views')));
route(app);

 
app.listen(port||3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })