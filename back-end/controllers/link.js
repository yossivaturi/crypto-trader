const db = require('../modules/db').db;

const handleLink = (req,res) => { 
    const {friendEmail, email} = req.body;
    console.log("in link", friendEmail, email);
    db('affiliate').insert({friendemail: friendEmail, email}).returning('*')
    .then(data => {
        console.log(data);
        res.status(200).json(data)
    })
    .catch(e => {
        console.log(e);
    })



}

module.exports = {
    handleLink
  }
  