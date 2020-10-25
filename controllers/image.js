const Clarifai = require("clarifai");

//your API Key
const app = new Clarifai.App({
	//make sure you change this to your api key
	apiKey: "f6cfcc218481400da96f2a0c06ef38d5"
});
const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
	handleImage,
	handleApiCall
};
