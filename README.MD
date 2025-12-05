README

This project extends the Bertie’s Books web application by adding a weather feature and a simple books API. The weather page uses the OpenWeatherMap API to display temperature, humidity, conditions, and wind speed for any city entered by the user. The route /weather/now handles the API call, formats the response, and displays the results in a basic HTML layout. A link to this page was added to the home screen, and error handling ensures the page responds safely when a city is invalid.

The project also includes a JSON-based Books API at /api/books. This route returns all books from the database and supports several query parameters: search (filter by name), minprice and maxprice (filter by price range), and sort (sort results by name or price). These filters can be combined in a single request to create flexible queries. The app is deployed on the Goldsmiths VM and configured to run continuously using the forever process manager.
