const path = require('path');//required to work with file and directory paths
const express = require('express');//required package
const session = require('express-session');//required package
const exphbs = require('express-handlebars');//required package
const routes = require('./controllers');//required directory
const sequelize = require('./config/connection');//required file
const SequelizeStore = require('connect-session-sequelize')(session.Store); //Storing SQL session

const app = express();//initialize express
const PORT = process.env.PORT || 3001;//using port 3001

const hbs = exphbs.create({ helpers });//set up handlebars.js engine with custom helpers
//initializing session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);// Inform Express.js on which template engine to use
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
//seualize sync then listen on port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on  ${Port}'));
});
