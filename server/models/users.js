//module.exports = require('../api/regUser/newUser.model');


module.exports= (sequelize,DataTypes) => {
    const User = sequelize.define('User', {
        firstname: {
            type:DataTypes.STRING,
            
        },
        lastname: {
            type:DataTypes.STRING,
            
        },
        username: {
            type:DataTypes.STRING,
            unique:true,
        },
        password: {
            type:DataTypes.STRING,
            
        },
        gender: {
            type:DataTypes.STRING,
        },
        maritalStatus: {
            type:DataTypes.STRING,
        },
        profileImage: {
            type:DataTypes.STRING,
        },
    }
      
    );
   return User; 
}
