import 'index.scss';

(function() {
	console.log('Welcome to the Weather App');
})();

// var img = document.createElement('img');
// img.src = 'https://bit.ly/webApp_Assets_leftArrow';

// var src = document.getElementById('weather-info');
// src.appendChild(img);

const ASSETS = {
	background: 'https://bit.ly/webApp_Assets_background',
	leftArrow: 'https://bit.ly/webApp_Assets_leftArrow',
	rightArrow: 'https://bit.ly/webApp_Assets_rightArrow',
	cloudy: 'https://bit.ly/webApp_Assets_cloudy',
	rain: 'https://bit.ly/webApp_Assets_rain',
	snow: 'https://bit.ly/webApp_Assets_snow',
	sunny: 'https://bit.ly/webApp_Assets_sunny',
	thunderStorm: 'https://bit.ly/webApp_Assets_thunderStorm'
};

const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

$('#left-arrow').append(`<img src=${ASSETS.leftArrow} />`);
$('#right-arrow').append(`<img src=${ASSETS.rightArrow} />`);

$('body').css({
	'background-image': `url("${ASSETS.background}")`
});

//ICON FOR WEATHER TYPE
const iconType = (id, data) => {
	console.log('icon', data);
	switch (data) {
		case 'rain':
			$(id).append(`<img src="${ASSETS.rain}"/>`);
			break;
		case 'snow':
			$(id).append(`<img src="${ASSETS.snow}"/>`);
			break;
		case 'partly-cloudy-day':
			$(id).append(`<img src="${ASSETS.cloudy}"/>`);
			break;
		case 'sunny':
			$(id).append(`<img src="${ASSETS.sunny}"/>`);
			break;
		case 'thunderstorm':
			$(id).append(`<img src="${ASSETS.thunderStorm}"/>`);
			break;
		default:
			$(id).append(`<img src="${ASSETS.snow}"/>`);
	}
};

//INFO PER DAY BOTTOM OF PAGE
const perDay = data => {
	console.log('array', data);
	const fiveDays = data.slice(0, 5);
	let i = 1;
	for (let day of fiveDays) {
		const dateStamp = new Date(day.time * 1000);
		$(`.day${i}-name`).text(`${DAYS[dateStamp.getDay()]}`);
		iconType(`.day${i}-icon`, day.icon);
		$(`.date-${i}`).text(
			`${Math.floor(day.temperatureHigh)} / ${Math.floor(day.temperatureLow)}`
		);
		i++;
	}
};

fetch('http://localhost:3000/weather', {
	method: 'GET',
	headers: new Headers({
		'X-Requested-With': 'XMLHttpRequest'
	})
})
	.then(function(response) {
		if (response.status !== 200) {
			console.log(
				'Looks like there was a problem. Status Code: ' + response.status
			);
			return;
		}

		response.json().then(function(data) {
			const theWeather = data.body;
			console.log(data);
			console.log('heyyy', theWeather.daily.data[0]);
			$('#city').text(data.city[0]);
			iconType('#icon', theWeather.daily.icon);
			$('#temperature').text(Math.floor(theWeather.currently.temperature));
			$('#range').text(
				`${Math.floor(theWeather.daily.data[0].temperatureHigh)} / ${Math.floor(
					theWeather.daily.data[0].temperatureLow
				)}`
			);
			$('#current').text(theWeather.currently.summary);
			perDay(theWeather.daily.data);
			const theDate = new Date(parseInt(theWeather.daily.data[0].time) * 1000);
			console.log(theWeather.daily.data[0].time);
			console.log(theDate);
		});
	})
	.catch(function(err) {
		console.log('Fetch Error :-S', err);
	});
