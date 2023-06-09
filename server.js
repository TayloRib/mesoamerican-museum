const express = require('express');
const sequelize = require("./config/connection")
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({
    helpers: {
        sculpFinder: function(obj){
            if(obj.art_types[0].name === 'sculptures'){
                return true
            }
        }
    }
});
const { uploadImage } = require('./utils/cloudinary'); // Import the uploadImage function



const app = express();
const PORT = process.env.PORT ||3000;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge:1000*60*60*2
        //  maxAge:1000*30

    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess))

const allRoutes = require("./controllers")
const { Employee, Civ, ArtType, ArtWork, Visitor} = require('./models')

app.use(allRoutes)

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening to port ${PORT}!`)
    })
})