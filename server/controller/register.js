const model = require('../models').User;


module.exports = {
  addUser(req, res) {
      console.log("req====>>>", req.body);
    return model
    .create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.userName,
        password: req.body.password,
        maritalStatus:req.body.selectedMarital,
        gender:req.body.selectedGender,
        profileImage:req.body.selectedProfile
      })
      .then((user) => res.status(201).send(user))
      .catch(err =>{ res.status(400).send("unable to save to database .change username")});
  },




  list(req, res) {
    return model
      .findAll()
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return model
           // search for specific attributes - hash usage
     .findAll({ where: { firstname: "deepa" } })
  
      .then((user) => {
        if (!user.length) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        else 
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },


}
