const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "magnificent",
		database: "face-recognition-db"
	}
});

// db.select("*").from("users").then((data) => {
// 	console.log(data);
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	//i immediately changed this before i pushed to the database.
	res.send("it is working");
});

//signIn route
//signing into the database
app.post("/signin", (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

//register route
//registering the user to the database, it has to be a post
app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

//the profile route
// i.e we are getting the id of any body who is about to sign
//in to his account
app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req, res, db);
});

//image endpoint i.e anytime a user submits an image his entry point
//should increase
app.put("/image", (req, res) => {
	image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
	image.handleApiCall(req, res);
});

//the port the server is running on
app.listen(proecess.env.PORT || 3001, () => {
	console.log('app is running on port $(process.env.PORT)');
});

/*
/--> res = this is working
/signin --> POST = success/fail
/register --> POST =user
/profile/:userId ---> GET = user
/image --> PUT
*/
