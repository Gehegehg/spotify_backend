const mongoose = require("mongoose");

//Step 1 :require mongoose
//Step 2 :Create mongose schema (structure of user)
//step 3 :Create a model

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required:true,
    },
    likedSongs: {
        //We will change this to array later
        type: String,
        default: "",
    },
    likedPlaylists: {
        //We will change this to array later
        type: String,
        default: "",
    },
    subscribedArtistd: {
        //We will change this to array later
        type: String,
        default: "",
    },
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;