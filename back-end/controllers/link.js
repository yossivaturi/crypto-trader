const db = require('../modules/db').db;

const handleLink = (req,res) => { 
    const {friendEmail, email} = req.body;
    db('affiliate').insert({friendemail: friendEmail, email}).returning('*')
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log(e);
    })



}

module.exports = {
    handleLink
  }
  