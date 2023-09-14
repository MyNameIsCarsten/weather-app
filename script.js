// Import the API key
const apiKey = '41e824aea5593f52693ccfea198566d5'

const searchBox = document.querySelector('.search input')
const rightBtn = document.querySelector('#rightBtn')
const leftBtn = document.querySelector('#leftBtn')
const weatherIcon = document.querySelector('.weather-icon')


// featch data from the API
async function checkWeather(city, type) {
    let lat, long, data;

    if (type === 'city'){
        const apiUrlCity = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q='
        const response = await fetch(apiUrlCity + city + `&appid=${apiKey}`);
        data = await response.json();

        // display data
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity;
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
    } else if (type === 'coord') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
        console.log("Geolocation is not supported by this browser.");
        }
        
        async function showPosition(position) {
            lat = position.coords.latitude.toFixed(2);
            long = position.coords.longitude.toFixed(2);
            
            console.log(lat);
            console.log(long);

            const apiUrlCoord = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric' + `&appid=${apiKey}`;
            console.log(apiUrlCoord);

            const response = await fetch(apiUrlCoord);
            data = await response.json();
            console.log(data.main);

            // display data
            document.querySelector('.city').innerHTML = 'Home';
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
            document.querySelector('.humidity').innerHTML = data.main.humidity;
            document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
        }

        
    }


    document.querySelector('.weather').style.display = 'flex';

    // change weather icon
    // Change weather icon and background gradient based on conditions
    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon.src = './images/clouds.png';
            document.querySelector('.card').style.background = 'linear-gradient(135deg, #00feba, #5b548a)';
            break;
        case 'Rain':
            weatherIcon.src = './images/rain.png';
            document.querySelector('.card').style.background = 'linear-gradient(135deg, #2a2a72, #009ffd)';
            break;
        case 'Drizzle':
            weatherIcon.src = './images/drizzle.png';
            document.querySelector('.card').style.background = 'linear-gradient(135deg, #6190e8, #a7bfe8)';
            break;
        case 'Mist':
            weatherIcon.src = './images/mist.png';
            document.querySelector('.card').style.background = 'linear-gradient(135deg, #4ecdc4, #556270)';
            break;
        case 'Snow':
            weatherIcon.src = './images/snow.png';
            document.querySelector('.card').style.background = 'linear-gradient(135deg, #acb6e5, #86fde8)';
            break;
        default:
            weatherIcon.src = './images/clear.png';
            document.querySelector('.card').style.background = 'linear-gradient(135deg, #f6d365, #fda085)';
            break;
    }
}

rightBtn.addEventListener('click', () => {
    if (searchBox.value != ''){
        checkWeather(searchBox.value, 'city');
    } else {
        alert('Please enter a city name.')
    }
    
})

leftBtn.addEventListener('click', () => {
    checkWeather(searchBox.value, 'coord');
})