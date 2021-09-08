const db = require('../modules/db').db;

const handleDelete = (req,res) => {
  const {email} = req.body;
  if(!email){
    return res.status(404).json('incorrect email to delete')
  }
  db('users')
  .where({email})
  .del()
  .then(user => {
    console.log(user);
    db('login')
    .where({email})
    .del()
    .then(user => {
      return res.status(200).json('User was deleted ' + email)
    })
  })
  .catch(e => {
    res.status(404).json('Can not delete user')
  })
}
module.exports = {
  handleDelete
}
