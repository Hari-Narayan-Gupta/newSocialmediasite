import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chatId:{
        type: String,
    },
    senderId:{
        type:String,
    },
    text:{
        type:String
    },
    images:{
        type: String
    }
},{
    timestamps: true  //this will create createdAt and updatedAt fields automatically
}
);

const MessageModel = mongoose.model("Message", MessageSchema)
export default MessageModel;