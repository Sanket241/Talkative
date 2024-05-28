import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"messages"
    }]
},{timestamps:true});
const Conversation = mongoose.model("conversations", conversationModel);
export default Conversation;

//this is a use for conversation model between which pepole are talking and which messages are sent between them.