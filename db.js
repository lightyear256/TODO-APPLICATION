const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const User=new Schema({
    name:String,
    email:{type : String, unique: true},
    password:String,
});
const todo= new Schema({
    userId:ObjectId,
    title:String,
});

const UserModel=mongoose.model('users', User);
const TodoModel=mongoose.model('todos',todo);
module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}