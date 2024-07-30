const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema({
    
    email:String
    
})
module.exports=mongoose.model('users',ProductSchema);



