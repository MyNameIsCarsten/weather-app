// Import the API key
const apiKey = 'YOUR_API_KEY'

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q='

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')

// featch data from the API
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    document.querySelector('.weather').style.display = 'flex';

    // display data
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity;
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

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

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})