import { fetchWeather } from '../index';

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

//ADD ASSETS
$('#left-arrow').append(`<img src=${ASSETS.leftArrow} />`);
$('#right-arrow').append(`<img src=${ASSETS.rightArrow} />`);
$('body').css({
	'background-image': `url("${ASSETS.background}")`
});

//ICON FOR WEATHER TYPE
const iconType = (id, data) => {
	let i = 0;
	if (document.querySelector(id).children.length === 0) {
		switch (data) {
			case 'rain':
				$(id).append(`<img class=img-1 src="${ASSETS.rain}"/>`);
				break;
			case 'snow':
				$(id).append(`<img class=img-2 src="${ASSETS.snow}"/>`);
				break;
			case 'partly-cloudy-day':
			case 'cloudy':
			case 'partly-cloudy-night':
			case 'wind':
			case 'fog':
				$(id).append(`<img class=img-3 src="${ASSETS.cloudy}"/>`);
				break;
			case 'clear-day':
				$(id).append(`<img class=img-4 src="${ASSETS.sunny}"/>`);
				break;
			case 'thunderstorm':
				$(id).append(`<img class=img-5 src="${ASSETS.thunderStorm}"/>`);
				break;
			default:
				$(id).append(`<img class=img-2 src="${ASSETS.snow}"/>`);
		}
	} else {
		console.log('the data at else', data);
		console.log('the id at else', id);
		switch (data) {
			case 'rain':
				$(`${id} img:nth-child(1)`).remove();
				$(id).append(`<img class=img-1 src="${ASSETS.rain}"/>`);
				break;
			case 'snow':
				$(`${id} img:nth-child(1)`).remove();
				$(id).append(`<img class=img-2 src="${ASSETS.snow}"/>`);
				break;
			case 'partly-cloudy-day':
			case 'cloudy':
			case 'partly-cloudy-night':
			case 'wind':
			case 'fog':
				$(`${id} img:nth-child(1)`).remove();
				$(id).append(`<img class=img-3 src="${ASSETS.cloudy}"/>`);
				break;
			case 'clear-day':
			case 'sunny':
				$(`${id} img:nth-child(1)`).remove();
				$(id).append(`<img class=img-4 src="${ASSETS.sunny}"/>`);
				break;
			case 'thunderstorm':
				$(`${id} img:nth-child(1)`).remove();
				$(id).append(`<img class=img-5 src="${ASSETS.thunderStorm}"/>`);
				break;
			default:
				$(`${id} img:nth-child(1)`).remove();
				$(id).append(`<img class=img-2 src="${ASSETS.snow}"/>`);
		}
	}
};

//INFO PER DAY BOTTOM OF PAGE
const perDay = data => {
	const fiveDays = data.slice(0, 5);
	console.log('5days data', fiveDays);
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

const CITIES = ['Sydney', 'Bogota', 'Shanghai', 'Rome', 'Miami'];
var selectedCity = CITIES[0];

let ind = 0;
$('#left-arrow').click(function() {
	ind--;
	selectedCity = CITIES[ind];
	if (ind < 0) {
		ind = 4;
		selectedCity = CITIES[ind];
	}
	fetchWeather(selectedCity);
});
$('#right-arrow').click(function() {
	ind++;
	selectedCity = CITIES[ind];
	if (ind >= CITIES.length) {
		ind = 0;
		selectedCity = CITIES[ind];
	}
	fetchWeather(selectedCity);
});

export { perDay, iconType, selectedCity };
