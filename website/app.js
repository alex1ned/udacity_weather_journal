/* 1) ---------------------------------- GLOBAL VARIABLES */
const apiKey = "&appid=d3f0862f81b030f725039d2bbd9b3237";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const generateButton = document.querySelector("#generate");
const zipInput = document.querySelector("#zip");

// ---> API END-POINT CITY NAME
// const baseURL = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// const baseURL = `api.openweathermap.org/data/2.5/weather?q=${London}&appid=${apiKey}`;

// ---> API END-POINT BY ZIP CCODE
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();



/* 2) ---------------------------------- HELPER FUNCTIONS */
const eachFirstLetterToUppercase = (string) => {
    const words = string.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
};


/* 3) ---------------------------------- ASYNC JS */

// ---> API Call to OpenWeatherMap.org
const getWeatherForZipCode = async (url, zipCode, countryCode = "us", key) => {
    const response = await fetch(url + zipCode + "," + countryCode + key);
    
    try {
        // SHOULD the below be assigned to a global variable?
        const response_js = await response.json();
        const weatherRequestData = {
            temperature: response_js.main.temp,
            location: response_js.name,
            country: response_js.sys.country,
            skyVisibility: eachFirstLetterToUppercase(response_js.weather[0].description)
        };
        // console.log(weatherRequestData);
        return weatherRequestData;
    }
    catch(error) {
        console.log(error);
    }
};

// --> !!! DELETE --> test if API works
// getWeatherForZipCode(baseURL, "54214", "us", apiKey);

// ---> POST REQUEST
const postWeatherEntry = async (url = '', weatherData = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};


/* 4) ---------------------------------- DOM MANIPULATIONS */
const doAction = () => {
    const postCode = document.querySelector("#zip").value;
    const feelingToday = document.querySelector("#feelings").value;
    
    if (postCode && feelingToday) {
        getWeatherForZipCode(baseURL, postCode, "us" ,apiKey)
        .then(function(data) {
            console.log(data);
            // append datum and user entry to data object
            data.date = newDate;
            data.userResponse = feelingToday;
            postWeatherEntry('addWeatherElement', data)
        })
        // .then(updateUserInterface) {

        // }
    }
};



/* 5) ---------------------------------- CALLING EVENT LISTENERS */
// --> MAKE API CALL UPON CLICKING 'GENERATE BUTTON'
generateButton.addEventListener('click', doAction);

// --> MAKE API CALL UPON PRESSING THE ENTER KEY
window.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        doAction();
    }
});


/* ------------------------ END OF FILE ------------------------*/


// --> Try if routes work
// 1) Global get
const getWeatherFromBack = async (url) => {
    const response = await fetch(url);
    
    try {
        const response_js = await response.json();
        console.log(response_js);
    }
    catch(error) {
         console.log(error);
    }
};
getWeatherFromBack('/getWeatherData');