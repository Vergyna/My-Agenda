const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')

const MongoStore = require('connect-mongo')
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;

const Agenda = require('./models/agenda')

// Session
app.use(
    session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/my_agenda',
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use((req, res, next) => {
    if(req.session.userId){
        res.locals.userId = req.session.userId;
    }

    next();
});

app.use((req, res, next) => {
    if(req.session.adminId){
        res.locals.adminId = req.session.adminId;
    }

    next();
})

app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(expressLayouts);
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

// app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/my_agenda')
.then(() => console.log('mongodb://127.0.0.1:27017/my_agenda'))
.catch((error) => console.log(error));

app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/agenda', require('./routes/agenda'))


// Render Page
app.get('/', async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        const data = await Agenda.find()
        res.render('user/index', {title: 'Home', layout: 'layouts/main-layout', data});
    }
});

app.get('/login', (req, res, next) => {
    if(!req.session.userId){
        res.render('user/login', {title: 'Login', layout: 'layouts/main-layout'});
    }
    else{
        res.redirect('/');
    }
});

app.get('/register', (req, res, next) => {
    if(!req.session.userId){
        res.render('user/register', {title: 'Register', layout: 'layouts/main-layout'});
    }
    else{
        res.redirect('/');
    }
});

app.get('/:agendaId', async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        const agenda = await Agenda.findOne({agendaId: req.params.agendaId})
        res.render('user/detail', {title: 'Home', layout: 'layouts/main-layout', agenda});
    }
});

app.listen(PORT, () => {console.log(`Server Runnning at port ${PORT}`)})