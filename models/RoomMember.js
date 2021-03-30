const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RoomMemberSchema = new Schema (
    {
       room_id:{
        type: Schema.Type.ObjectId,
        ref : 'rooms'
       },
       member_id: {
        type: Schema.Type.ObjectId,
        ref : 'users'
       }
    },
    {
        timestamps: true,
    }
);

module.exports = RoomMember = mongoose.model("RoomMember", RoomMemberSchema)