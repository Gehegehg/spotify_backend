const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const app = express();
const port = 8080;

app.use(express.json());

//connect mongodb to our node app
//mongoose.connect(); take two arguments : 1.Which db to connect to (db url) , 2.connection options
mongoose.connect(
"mongodb+srv://akashshingare2003:" + process.env.MONGO_PASSWORD + "@cluster0.hiksab2.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

).then((x) => {
    console.log("Connected to Mongo");
}).catch((err) => {
    console.log("Error");
});

//setup  passport-jwt 
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisIsasecret";
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


app.get("/", (req, res) => {
    //req contains all data for the request
    //res contains all data for the response

    res.send("Hello World");
});

app.use("/auth", authRoutes);

// Now we want to tell express that our server will run on localhost:8000
app.listen(port, () => {
    console.log("App is running on port : " + port);
});