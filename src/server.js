const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

const { forecast, theCity } = require('./utils/forecast');

app.get('/weather/:city', (req, res) => {
	theCity(req.params.city);
	console.log('at get', req.params.city);
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
