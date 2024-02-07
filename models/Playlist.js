const mongoose = require("mongoose");

//Step 1 :require mongoose
//Step 2 :Create mongose schema (structure of Playlist)
//step 3 :Create a model

const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    //Playlist songs
    //Playlist collaborators
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "song",
        },
    ],
    collabprators: [
        {
            type: mongoose.Types.ObjectId,
        },
    ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;