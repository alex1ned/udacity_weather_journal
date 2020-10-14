/* 1) ---------------------------------- GLOBAL VARIABLES */
const apiKey = "&appid=d3f0862f81b030f725039d2bbd9b3237";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const generateButton = document.querySelector("#generate");
const zipInput = document.querySelector("#zip");


// --- Create a new date instance dynamically with JS
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
        const response_js = await response.json();
        const weatherRequestData = {
            temperature: response_js.main.temp,
            location: response_js.name,
            country: response_js.sys.country,
            skyVisibility: eachFirstLetterToUppercase(response_js.weather[0].description)
        };
        return weatherRequestData;
    }
    catch(error) {
        console.log(error);
    }
};


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
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};


// ---> UPDATE USER INTERFACE
const updateUserInterface = async () => {
    const request = await fetch("/getWeatherData");
    try {
        const allData = await request.json();
        const length = allData.length;
        document.querySelector("#date").innerHTML = `Date: ${allData[length-1].date}`;
        document.querySelector("#temp").innerHTML = `Temperature: ${allData[length-1].temperature} Fahrenheit`;
        document.querySelector("#content").innerHTML = `User Response: ${allData[length-1].userResponse}`;
        document.querySelector("#location").innerHTML = `Location: ${allData[length-1].location}`;
        document.querySelector("#sky").innerHTML = `Sky Visibility: ${allData[length-1].skyVisibility}`;
        
    }
    catch(error) {
        console.log("error", error);
    }
};



/* 4) ---------------------------------- On ENTER or Click perform */
//    following squence:
//     - Get the value of the 'zip code' and 'feeling' entered by
//       user, and if both contain a value then....
//     - Make API Call to OpenWeatherMap.org which returns an
//       object JSON (location, temperature, sky, country)
//     - Then ... to the returned object, append the data and user
//       response and then POST the completed object to the server
//     - Then ... update the user interface accordingly by first
//       retrieving the whole object from the backend with GET
const doAction = () => {
    const postCode = document.querySelector("#zip").value;
    const feelingToday = document.querySelector("#feelings").value;
    
    if (postCode && feelingToday) {
        getWeatherForZipCode(baseURL, postCode, "us" ,apiKey)
        .then(
            function(data) {
                // append datum and user entry to data object
                data.date = newDate;
                data.userResponse = feelingToday;
                postWeatherEntry('/addWeatherElement', data)
            }
        )
        .then(
            updateUserInterface()
        )
    }
};



/* 5) ---------------------------------- INNITIATE EVENT LISTENERS */
// --> MAKE API CALL UPON CLICKING 'GENERATE BUTTON'
generateButton.addEventListener('click', doAction);

// --> MAKE API CALL UPON PRESSING THE ENTER KEY
window.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        doAction();
    }
});


/* ------------------------ END OF FILE ------------------------*/