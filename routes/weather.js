var express = require('express');
var router = express.Router();
const request = require('request');   // from the lab

router.get('/weather/now', function (req, res, next) {
  let apiKey = process.env.WEATHER_API_KEY;
  let city = req.query.city || 'london';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      return next(err);
    }

    // ---- Task 6-style error handling ----
    let weather;
    try {
      weather = JSON.parse(body);
    } catch (e) {
      return res.send('Error parsing weather data');
    }

    if (weather !== undefined && weather.main !== undefined) {
      // Task 3: basic message
      let wmsg = 'It is ' + weather.main.temp +
        ' degrees in ' + weather.name +
        '! <br> The humidity now is: ' +
        weather.main.humidity;

      // Task 5: extra info
      if (weather.wind) {
        wmsg += '<br>Wind speed: ' + weather.wind.speed + ' m/s';
      }
      if (weather.weather && weather.weather[0]) {
        wmsg += '<br>Conditions: ' + weather.weather[0].description;
      }

      // Simple HTML page with form (Task 4)
    res.send(`
    <html>
        <head>
        <title>Weather forecast</title>
        <link rel="stylesheet" type="text/css" href="/main.css" />
        </head>
        <body style="font-family: Arial;">
        <div class="weather-container">
            <h1>Weather forecast</h1>
            <p>${wmsg}</p>

        <form action="/weather/now" method="get" class="weather-form">
          <label for="city">Enter city: </label>
          <input type="text" id="city" name="city" placeholder="London">
          <button type="submit">Get weather</button>
        </form>

        <p style="margin-top: 20px;">
          <a href="/">Back to home</a>
        </p>
      </div>
    </body>
  </html>
`);
    } else {
      res.send('No data found');
    }
  });
});

module.exports = router;
