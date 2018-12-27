//module.exports = require('../api/regUser/newUser.model');


module.exports= (sequelize,DataTypes) => {
    const CsvModel = sequelize.define('CsvModel', {
        
        myid: {
            type:DataTypes.INTEGER,
            unique:true,
        },
        firstname: {
            type:DataTypes.STRING,
            
        },
        lastname: {
            type:DataTypes.STRING,
            
        },
        college: {
            type:DataTypes.STRING,
        },
        branch: {
            type:DataTypes.STRING,
            
        },
        grade: {
            type:DataTypes.STRING,
            
        },
        graduation_year: {
            type:DataTypes.STRING,
            
        },
        hobby: {
            type:DataTypes.STRING,
        },
        email: {
            type:DataTypes.STRING,
            unique:true,
        },
        mobile: {
            type:DataTypes.STRING,
        },
    },{paranoid: true,}
      
    );
   return CsvModel; 
}
