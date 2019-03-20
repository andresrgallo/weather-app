// const request = require('request');

// const cities = {
// 	sydney: { lat: '-33.8688', lon: '151.2093' }
// };

// const url = `https://api.darksky.net/forecast/56db65ea49a842b8a48d2e7ebf1923f5/${
// 	cities.sydney.lat
// },${cities.sydney.lon}`;

// const forecast = function(callback) {
// 	request({ url: url, json: true }, (e, { body }) => {
// 		if (e) {
// 			callback('unable to connect to the weather service', null);
// 		}
// 		if (body.error) {
// 			callback('unable to find the location', null);
// 		} else {
// 			callback(undefined, body);
// 		}
// 	});
// };

const fetch = require('node-fetch');

const cities = {
	Sydney: { lat: '-33.8688', lon: '151.2093' }
};

const url = `https://api.darksky.net/forecast/56db65ea49a842b8a48d2e7ebf1923f5/${
	cities.Sydney.lat
},${cities.Sydney.lon}?units=si`;

async function forecast(cb) {
	try {
		const resp = await fetch(url);
		const data = await resp.json();
		console.log('heyy333', Object.keys(cities)[0]);
		cb(null, data, Object.keys(cities));
	} catch (err) {
		cb('communication is done with service', null, null);
	}
}

module.exports = forecast;
