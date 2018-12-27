const model = require('../models').User;


module.exports = {
  login(req, res) {

        console.log("req====>>",req.body);
        let username= req.body.username;
	    let password= req.body.password;
        

      if(username && password)  {
		return model
      // search for specific attributes - hash usage
        .findOne({ where: { username: username , password:password} })

        .then((user) => {
            if (!user) {
            return res.status(404).send({
            message: 'user Not registered',
            });
            }
            else 
            return res.status(200).send(user);
        })
    .catch((error) => res.status(400).send(error));
	}
	else{
		console.log("In controller else");
	}
      
  }
};

