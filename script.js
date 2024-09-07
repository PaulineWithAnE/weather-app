// объект
const api = {
    // ссылка, на которую я хочу получить доступ
    endpoint: 'https://api.openweathermap.org/data/2.5/',
    key: '8b8028b528415d2834723633ca5a9d0c'
}

let city = document.querySelector('#city');
let date = document.querySelector('#date');
let temperature = document.querySelector('.temperature');
let feelsLike = document.querySelector('#feelsLike');
let conditions = document.querySelector('#conditions');
let varation = document.querySelector('#varation');
let body = document.querySelector('body');


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let month = months[d.getMonth()];
let day = days[d.getDay()];



async function currentLocation() {
    const res = await fetch(`${api.endpoint}weather?q=tel-aviv&units=metric&appID=${api.key}`);
    const resReceived = await res.json();
    showInfo(resReceived);
}

currentLocation();



const input = document.querySelector('#input');
input.addEventListener('keypress', enter);

// начинаем поиск только когда была нажата клавиша enter(13)
function enter(e) {
    if (e.keyCode === 13) {
        // получаем значение напечатанного
        // т е получаем доступ к напечатанному 
        getInfo(input.value);
        const location = document.querySelector('#location');
        location.style.display = 'none'; 
        if (input.value === '') {
            currentLocation(); 
            location.style.display = 'block'; 
        }
    }
} 

// fetch мы делаем запрос в базу данных о погоде
// параметр data - собранная инфа о конкретном городе
async function getInfo(data) {
    // запрашиваем доступ к api о погоде
    // units=metric - в градусах
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const resReceived = await res.json();
    showInfo(resReceived);
   
}

function showInfo(resReceived) {
    city.textContent = resReceived.name + ', ' + resReceived.sys.country;
    date.innerHTML = day + ' ' + d.getDate() + ' ' + month + ' ' + d.getFullYear();
    temperature.innerHTML = `${resReceived.main.temp.toFixed()}<span>°</span>`;

    // if (resReceived.main.temp < 0) {
    //     body.classList.add('bodyChanged');
    //     temperature.classList.add('temperatureChanged');
    // }

    
    feelsLike.innerHTML = `feels like: ${resReceived.main.feels_like.toFixed()}<span>°</span>`;
    conditions.textContent = resReceived.weather[0].description;
    varation.innerHTML = `min: ${resReceived.main.temp_min.toFixed()}<span>°</span> / max: ${resReceived.main.temp_max.toFixed()}<span>°</span>`;
    
}

