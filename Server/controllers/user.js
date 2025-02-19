const User = require('../src/models/user');

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
  
    return res.json(allDbUsers);
    
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
    
}

async function handleUpdateUserById(req,res) {
    await User.findByIdAndUpdate(req.params.id,{lastName:'Changed'})
    return res.json({ status: "success" });
    
}
async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id)
      return res.json({ status: "success" });
}
async function handleCreateNewUser(req,res){
    const body = req.body;
    if (!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.Job_title) {
     return res.status(400).json({msg:"All field are req...."}) 
    }
   const result= await User.create({
      firstName:body.first_name,
      lastName:body.last_name,
      email:body.email,
      gender:body.gender,
      jobTitle:body.jobTitle,
    });
    
   return res.status(201).json({msg: 'Success', id: result._id})
}


    
module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}