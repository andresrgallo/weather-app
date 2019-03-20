const fetch = require('node-fetch');

const cities = {
	Sydney: { lat: '-33.8688', lon: '151.2093' },
	Bogota: { lat: '4.771', lon: '-74.0721' },
	Shanghai: { lat: '31.21304', lon: '121.4737' },
	Rome: { lat: '41.9028', lon: '12.4964' },
	Miami: { lat: '25.7617', lon: '-80.1918' }
};

var info = [];

function theCity(city = 'Sydney') {
	info = [];
	console.log('city at theCity forecast', city);
	console.log(Object.keys(cities));
	var url = `https://api.darksky.net/forecast/56db65ea49a842b8a48d2e7ebf1923f5/${
		cities[city].lat
	},${cities[city].lon}?units=si`;
	info.push(city, url);
	console.log('function the info array', info);
}

async function forecast(cb) {
	console.log('info at forecast', info);
	try {
		const resp = await fetch(info[1]);
		const data = await resp.json();

		cb(null, data, info[0]);
	} catch (err) {
		cb('communication is down with service provider', null, null);
	}
}

module.exports = { forecast, theCity };
