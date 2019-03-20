const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

const forecast = require('./utils/forecast');

// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
	forecast((e, body, city) => {
		if (e) {
			return res.send({ e });
		}
		res.send({
			body,
			city
		});
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
