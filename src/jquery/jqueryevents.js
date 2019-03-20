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
	switch (data) {
		case 'rain':
			$(id).append(`<img class=img-1 src="${ASSETS.rain}"/>`);
			$(`${id} img:nth-child(2)`).remove();
			break;
		case 'snow':
			$(id).append(`<img class=img-2 src="${ASSETS.snow}"/>`);
			$(`${id} img:nth-child(2)`).remove();
			break;
		case 'partly-cloudy-day':
			$(id).append(`<img class=img-3 src="${ASSETS.cloudy}"/>`);
			$(`${id} img:nth-child(2)`).remove();
			break;
		case 'partly-cloudy-night':
			$(id).append(`<img class=img-6 src="${ASSETS.cloudy}"/>`);
			$(`${id} img:nth-child(2)`).remove();
			break;
		case 'sunny':
			$(id).append(`<img class=img-4 src="${ASSETS.sunny}"/>`);
			$(`${id} img:nth-child(2)`).remove();
			break;
		case 'thunderstorm':
			$(id).append(`<img class=img-5 src="${ASSETS.thunderStorm}"/>`);
			$(`${id} img:nth-child(2)`).remove();
			break;
		default:
			$(id).append(`<img class=img-2 src="${ASSETS.snow}"/>`);
			$(`${id} img:nth-child(2)`).remove();
	}
};

//INFO PER DAY BOTTOM OF PAGE
const perDay = data => {
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

const CITIES = ['Sydney', 'Bogota', 'Shanghai', 'Rome', 'Miami'];
var selectedCity = CITIES[0];

let ind = 1;
$('#left-arrow').click(function() {
	selectedCity = CITIES[ind];
	ind++;
	console.log('click index', ind);
	console.log('selected b4 fetch at jquery', selectedCity);
	if (ind > CITIES.length) {
		ind = 0;
		selectedCity = CITIES[ind];
	}
	fetchWeather(selectedCity);
});

export { perDay, iconType, selectedCity };
