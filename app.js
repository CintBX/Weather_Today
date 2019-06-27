window.addEventListener('load', ()=> {
	let long;
	let lat;
	const temperatureDescription = document.querySelector('.temperature-description');
	const temperatureDegree = document.querySelector('.temperature-degree');
	const locationTimezone = document.querySelector('.location-timezone');
	const degreeSection = document.querySelector('.temperature');
	const degreeSpan = document.querySelector('.temperature span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/"; 
			const api = `${proxy}https://api.darksky.net/forecast/a1936468e7868bd5bb273d195f2c492d/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const { temperature, summary, icon } = data.currently;
					
					// Set DOM elements from the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					
					// Set Icon
					setIcons(icon, document.querySelector('.icon'));
					
					// Celsius/Fahrenheit FORMULA
					let celsius = (temperature - 32) * (5 / 9);

					// Toggle temp Celsius/Fahrenheit
					degreeSection.addEventListener('click', () => {
						if (degreeSpan.textContent === "F") {
							degreeSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						} else {
							degreeSpan.textContent = "F";
							temperatureDegree.textContent = temperature;
						}
					});
				});
		});
	} else {
		h1.textContent = "Please enable the browser to access your location."
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});