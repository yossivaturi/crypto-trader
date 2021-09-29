const db = require('../modules/db').db;

const handleLink = (req,res) => { 
    const {friendEmail, email} = req.body;
    db('affiliate').insert({friendemail: friendEmail, email}).returning('*')
    .then(data => {
        res.status(200).json({email,friendEmail })
    })
    .catch(e => {
        console.log(e);
    })

}

module.exports = {
    handleLink
  }
  