const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config();
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const withAuth = require('./controllers/withAuth')
const deleteuser = require('./controllers/deleteuser')
const purchase = require('./controllers/purchase')
const link = require('./controllers/link')

const app = express();
// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
//LISTENERS
app.get('/', (req, res) => {res.send('Hello World!')})
app.post('/signin', (req,res) => {signin.handleSignIn(req,res)});
app.post('/register', (req,res)=>{register.handleRegister(req,res)});
app.post('/checkToken', withAuth.withAuth, (req,res)=> {res.sendStatus(200)})
app.post('/delete', (req,res)=> {deleteuser.handleDelete(req,res)})
app.post('/purchase', (req,res)=> {purchase.handlePurchase(req,res)})
app.post('/link', (req,res)=> {link.handleLink(req,res)})

app.listen(process.env.PORT, ()=>{
  console.log('listening on port '+ process.env.PORT);
})

