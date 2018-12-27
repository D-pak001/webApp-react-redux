const model = require('../models').CsvModel;


module.exports = {
  addCsvData(req, res) {
      console.log("req====>>>", req.body);
        let obj=req.body;
      let promises = []
      for(let i=0; i<req.body.length; i++){
          let promise = model.create({
            myid:obj[i].id,     
            firstname: obj[i].firstname,
            lastname: obj[i].lastname,
            college: obj[i].college,
            branch: obj[i].branch,
            grade:obj[i].grade,
            graduation_year:obj[i].graduation,
            hobby:obj[i].hobby,
            email:obj[i].email,
            mobile:obj[i].mobile
        })
          promises.push(promise)
      }
      return Promise.all(promises)
      .then((data)=> res.status(201).send(data)) 
       .catch((err)=> res.status(400).send("unable to save to database ") )

    //     model.bulkCreate({
    //     myid:obj.id,     
    //     firstname: obj.firstname,
    //     lastname: obj.lastname,
    //     college: obj.college,
    //     branch: obj.branch,
    //     grade:obj.grade,
    //     graduation_year:obj.graduation,
    //     hobby:obj.hobby,
    //     email:obj.email,
    //     mobile:obj.mobile
    // }).then((data)=> res.status(201).send(data)) 
    //     .catch((err)=> res.status(400).send("unable to save to database ") ) 
    
  },
    deleteRow (req,res) {   
        console.log("req id====>>>", req.body.id); 
        model.destroy({
            where: {
                myid: req.body.id
            }
        })
        .then( (deletedRecord) => {
            if(deletedRecord === 1){
                res.status(200).send("Deleted successfully");          
            }
            else
            {
                res.status(404).json({message:"record not found"})
            }
            // console.log("-------",deletedRecord)
        })
        .catch(function (error){
            res.status(500).send(error);
        });
        
     
    },
    

}
