import registerServiceWorker from './registerServiceWorker';
import 'index.scss';
import { perDay, iconType, selectedCity } from './jquery/jqueryevents';

(function() {
	console.log('Welcome to the Weather App');
})();

const fetchWeather = selectedCity => {
	fetch(`http://localhost:3000/weather/${selectedCity}`, {
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
				$('#city').text(data.city);
				iconType('#icon', theWeather.daily.data[0].icon);
				$('#temperature').text(Math.floor(theWeather.currently.temperature));
				$('#range').text(
					`${Math.floor(
						theWeather.daily.data[0].temperatureHigh
					)} / ${Math.floor(theWeather.daily.data[0].temperatureLow)}`
				);
				$('#current').text('Currently: ' + theWeather.currently.summary);
				perDay(theWeather.daily.data);
			});
		})
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
};
fetchWeather(selectedCity);

registerServiceWorker();

export { fetchWeather };
