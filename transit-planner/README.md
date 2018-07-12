# Transit Planner
*For best experience, please view this file in the browser*.

You will creating a full-stack application that implements several features of an app to help people navigate the SF Bay Area's BART transportation network, similar to the [Moovit](https://moovitapp.com) app. Your app will eventually display:

1. A **Lines** view that allows the user to choose a BART line from a list and see all the stops along that line.
2. A **Trip Planner** that allows the user to see a series of directions between two stations.

### Your Tech Stack

- Client: *Your choice* of either [AngularJS](https://angularjs.org) or [React](https://facebook.github.io/react)
- Server: [NodeJS](https://nodejs.org), with the [Express](https://express.js.com) framework
- Database: [MySQL](https://dev.mysql.com/doc/refman/5.7/en/)
- Additional libraries and tools:
  - Client-side AJAX libraries (if and only if you're using React for your client)
    - [jQuery](https://jquery.com/), for *client-side AJAX requests only*.
    - [Axios](https://github.com/axios/axios), as an optional, promise-based alternative to  jQuery's `$.ajax`
  - [Moment.js](https://momentjs.com/) for reader-friendly date formatting (optional)

**BEFORE CONTINUING you must confirm you are running MySQL version 5.7** 
To check the version of the installed MySQL server, type `mysql -V` in the terminal. Verify the value that is reported for `Distrib`. **If you are running something other than 5.7.x, you must speak with your Technical Mentor before you can move on.**

NAME WHICH FRONT END FRAMEWORK YOU WILL BE USING FOR THE ASSESSMENT HERE:
* *[AngularJS or React]*

By design, this assessment contains more work than you will be able to complete in a day, so don't be concerned about not completing all of the steps below. Rather, please work on the following steps **in order**, moving on to the next step only after the one you are working on is complete. **Commit frequently** with informative messages. While there are instructions to commit at the end of each step, these should not be your only commits.

---

### Before You Begin

**Complete these setup tasks**

- [ ] In your terminal, navigate to this assessment's `transit-planner` directory and run `git remote rm origin` to prevent yourself from accidentally pushing your code during the assessment.
- [ ] Run `npm install` inside the `transit-planner` directory to install dependencies.
- [ ] Ensure that MySQL Server is running on your computer (`mysql.server start`).
- [ ] Create the database and tables using the provided `schema.sql`, following the directions provided in the comments to populate your database.
  - *NOTE* You may also need to modify the `user`, `root`, and `password` properties inside `database-mysql/config.js`.
- [ ] In `server/index.js`, uncomment the lines of code corresponding to your choice of client-side framework.
- [ ] Serve your application from the provided Node/Express web server.
      - If using **Angular**, start your application with the command `npm start`.
      - If using **React**, start your application with two commands, `npm run dev:react` and `npm start`, in two separate terminal tabs. Our `dev:react` script makes use of Webpack. For more information about Webpack, take a look at [the Webpack Docs](https://webpack.github.io/docs).
- [ ] Study the given codebase before beginning the steps below. Consider what's been provided to you, what you'll need to refactor, and what you'll need to create as you work through the steps below.
      - [ ] *Important note:* the given client code includes an `App` component that has already been written for you - it implements user navigation between the **Lines** and **Trip Planner** views. All of your client-side code will be written inside the `Lines` and `TripPlanner` components, and whatever additional components you create. **You will not need to modify the `App` component.**

**WHEN THESE TASKS ARE COMPLETE:** proceed to Step One.

---

### Step One: Lines - Displaying the Line List 

**Implement the following user story:**
> As a rider, I want to see a list of lines in the BART system so I can study my options.

Implement this user story by doing the following:

- Refactor the `<select>` element in the `Lines` component (in either the `angular-client` or `react-client` directory, depending on your chosen client-side framework) to replace the hardcoded `<option>` elements with dynamically rendered `<option>` elements, one for every item in the `sampleLines` array inside `sample_data.js`. 

  - Each object in the `sampleLines` array represents a BART Service Line
  - You may create additional components or refactor existing components as necessary.
  - Do not worry about the hardcoded list of stops below the `<select>` element. That portion of the UI will be addressed in Step Two.

- Fill in the `getAllLines` function in `db/index.js` to retrieve all of the lines from the `service_lines` table in the database.

  - *NOTE for the curious - the table in the database is called `service_lines` because "lines" is a reserved word in MySQL.* 

- In `server/index.js`, fill in the request handler that will respond to `GET` requests to `/api/lines` by sending JSON of the service lines stored in the database. 

  - You should use the `getAllLines` function you wrote earlier in this step in your implementation.

- Replace the sample data in your client with the data obtained from the server via an AJAX request.

  **WHEN THIS STEP IS COMPLETE:** please make a commit with the message "Completes Step One"

---

### Step Two: Lines - Displaying the Stop List for a Line

**Implement the following user story:**

> As a rider, when I choose a line from the Lines list, I want to see a list of stops along that line.

Implement this user story by doing the following:

- Refactor the `<ul>` element in the `Lines` component to replace the hardcoded `<li>` elements with dynamically rendered `<li>` elements, one for every item in the `sampleStopList` array inside `sample_data.js`.
  - Each object in the `sampleStopList` array represents a "stop" on a service line.
  - You may create additional components or refactor existing components as necessary.
- In `db/index.js`, write a function that will query the database for all of the stops found along a line, according to that line's `id`.
- In `server/index.js`, add an Express route handler that will respond to `GET` requests to `/api/lines/:lineId` by sending  JSON of the stops along one service line. 
  - Use the database helper function you wrote earlier in this step in your implementation.
  - Use Express' [Route Parameters](http://expressjs.com/en/guide/routing.html#route-parameters) to get the `lineId` out of the request URL inside your request handler function.
- Replace the sample stop list in your client with the data obtained from the server via an AJAX request.
  - *Note* -  accomplish this, you'll need to refactor your `Lines` to be aware of the currently selected value in your `<select>` element.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "Completes Step Two"

---

### Step Three: Selecting Favorite Stations

**Implement the following user stories:**

> As a frequent rider, I want to identify my favorite stations (like the ones nearest my home and my workplace) so I can plan travel near the places I frequent the most.
>
> As a frequent rider, I expect the app to remember my favorite stations.
>
> As a rider who has recently moved within the city, I expect to be able to remove a station from my favorite stations.

Implement these user stories by doing the following:

- Refactor the `Lines` component in such a way that the user can click on a **station name** in the list of stops for a line.
- Your client should respond to such a click by toggling **that Station's `is_favorite` value** in the database (via an AJAX request to your server).
- Give the user a visual indicator that a station appearing within a stop list is one of their favorites.
  - You can accomplish this in a number of ways. If you're not sure what a good visual indicator is, consider one of these two possibilities:
    - displaying the text `" (favorite)"` or a :star: emoji after the Station Name in the stop list
    - adding a CSS class that only gets applied to favorite stations that changes the background color or font-weight of a favorite station.
- You may create additional components or refactor existing components as necessary.
- You may create additional database helper functions or refactor existing ones as necessary.
- You may create additional API routes and route handlers or refactor existing ones as necessary.

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Three."

---

### Step Four: Trip Planner - Displaying the Origin and Destination List

**Implement the following user stories:**
> As a rider planning a trip, I want to choose both my origin and destination stations from a list of all stations.
>
> As a rider who has identified preferred stations, I want to see those preferred stations at the top of the station lists so I don't have to scroll very far in order to locate them.

Implement these user stories by doing the following:

- Inside the `TripPlanner` component, refactor the two hardcoded `<select>` elements to each display a list of all stations, obtained from the server and database via an AJAX request.
  - You may use the `sampleStationList` array in `sample_data.js` to get started, but this step will not be considered complete until you have replaced that sample data with data obtained via AJAX.
- Ensure that user-selected preferred stations (from your work in Step Three) appear at the top of the lists of stations.
- You may create additional components or refactor existing components as necessary.
- You may create additional database helper functions or refactor existing ones as necessary.
- You may create additional API routes and route handlers or refactor existing ones as necessary.

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Four."

---

### Step Five: Trip Planner - Finding a Route Between Stations 

**Implement the following user story:**
> As a rider planning a trip, when I choose an origin and destination station, I want to see a set of directions that take me from my origin to my destination.

Implement this user story by doing the following:

- Inside the `Trip Planner` component, respond to a user clicking the **"Go!"** button by displaying **one set of directions** from one station to the other, constructed from JSON data sent from your server and database via AJAX.
  - Use the `sampleDirections` object in `sample_data.js`  to aid you in building your client-side components.
- Take an iterative approach to designing your directions-generation algorithm. Focus on simple cases (i.e., direct routes with no transfers) before tackling more complex routes.
- You may create additional components or refactor existing components as necessary.
- You may create additional database helper functions or refactor existing ones as necessary.
- You may create additional API routes and route handlers or refactor existing ones as necessary.

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Five."

---

### Step Six: Choosing Multiple Routes

**Implement the following user story:**
> As a rider, when more than one route is available, I want to choose the route I like best.

Implement this user story by doing the following:

- If your directions-generation algorithm is able to identify multiple routes between two stations, display a summary of each route, allow the user to select the route they wish to take, then display the directions for the route that they chose.
- In the list of routes generated by your algorithm, direct routes should appear at the first in the list, followed by routes with the fewest amount of transfers.
- To avoid overwhelming the user, only send the first five routes in the server's response to the client.
- You may create additional components or refactor existing components as necessary.
- You may create additional database helper functions or refactor existing ones as necessary.
- You may create additional API routes and route handlers or refactor existing ones as necessary.

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Six."

---

### Step Seven: Estimating Trip Duration

**Implement the following user story:**
> As a rider on my way to a party, I want to see the how long a trip is expected to take so I can tell my friends when to expect me.

In order to implement this user story, you'll need to choose a strategy for estimating how long a trip on might take:

1. Assume that trains travel at an average of 35 miles per hour in a straight line from one station to another. You can calculate distance between stations based on their latitude and longitude values stored in the `Stations` table in the database. This could be computed as-needed, or computed once and stored as a part of your database.
2. The image `bart-system-map.png` included in the client folders of this repo shows approximate travel time between station (expressed in minutes) in purple type. You'll need to modify your database schema to include this data as a part of your directions.

**Regardless of your chosen strategy** - your algorithm for determining trip duration should make these assumptions:

- Trains always wait for exactly 20 seconds when stopped at a station
- In lists of directions, transferring from one line to another incurs a six minute wait
- There are never delays or service stoppages on BART.

Implement this user story by doing the following:

- Choose an estimation strategy from the possibilities able.
- Modify the `Directions` component to display an estimated trip duration (e.g., "44 minutes" or "1h, 14m") for a given route.
- Modify whatever components you may have created in the previous step to display multiple possible routes to display the estimated trip duration for each possible route.
- Use the Moment library to display human-friendly times in your client.

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Seven."

---

### Step Eight: Simulating Train Movement and Timing

**Implement the following user story:**
> As a user trying to plan their exit from work, I want to see when the next train will arrive at my nearest station so I know when to leave my building.

#### First and Last Train Departures from Origin by Service Line

| Service Line                       | First Train departs | Last Train departs (approx.) |
| ---------------------------------- | ------------------- | ---------------------------- |
| Red towards Richmond               | 05:16               | 21:16                        |
| Red towards Daly City              | 04:12               | 19:42                        |
| Orange towards Warm Springs        | 04:20               | 00:50                        |
| Orange towards Richmond            | 04:00               | 23:45                        |
| Green towards Daly City            | 04:00               | 17:45                        |
| Green towards Warm Springs         | 05:11               | 18:56                        |
| Yellow towards Millbrae            | 04:02               | 23:47                        |
| Yellow towards Pittsburg/Bay Point | 03:51               | 23:51                        |
| Blue towards Daly City             | 04:13               | 00:43                        |
| Blue towards Dublin/Pleasanton     | 04:06               | 00:06                        |

Implement this user story by doing the following:

-  Use the table above in conjunction with your "travel time between station stops" data from the previous step to simulate the movement of trains through the BART system. Your approach to simulating train movement can safely make the following assumptions:
  - The first train departs each Service Line's **origin station** at the time listed in the table below.
  - Subsequent trains depart **every 15 minutes** from the origin station after the first train. 
  - BART runs the same train schedule all day, every day, with no alterations to service for weekends, holidays, or non-peak hours.
  - A station can handle any number of coincidental stops for the same station.
  - There are never delays or service stoppages on BART.
-  Now that you have train movement data, your Trip Duration Estimation algorithm from the previous step no longer needs to rely on the the assumption "in lists of directions, transferring from one line to another incurs a six minute wait." Refactor your trip duration to take your actual train data into account.
  - Refactor your Directions views to show departure and arrival times.

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Eight."

---

### Step Nine: Backtracking

**Implement the following user story:**
> As a rider who prefers a seat, I want to see routes that go backwards, then forwards, so I have a better chance at getting a seat on the train.

**[Backtracking](http://www.sfgate.com/bayarea/article/BART-s-upstreamers-chase-rare-commodity-an-5926345.php)** is the practice of **catching a train going in the opposite direction of your destination, riding a few stops, then transferring to a train going toward your destination**, all in hopes of being able to get a seat on your destination-bound train. The practice is easy to adopt on BART in San Francisco since multiple service lines run through the same stations and transferring from an westbound service line to a eastbound service line is as simple as walking across the station platform. The practice is not without risk - if you backtrack *too far*, you may miss your original train and have to wait another 15 minutes or more for the next train headed toward your destination.

Some backtracking practitioners will factor in arrival times into their decision of whether to backtrack or not. **If a possible backtracking route will cause them to arrive at their destination *later* than a direct route, they will choose the direct route.**

Due to both the arrangement of service lines and the layout of individual stations in the BART system, **backtracking is most effective when traveling toward the East Bay from Powell, Montgomery, or Embarcadero Stations**. Backtracking routes **should not take riders beyond 24th Street/Mission** station.

Implement this user story by doing the following: 

- Refactor your directions-generation algorithm to suggest at least one backtracking route (if such a route is possible, given the constraints listed in bold type above).
- You may create additional components or refactor existing components as necessary.
- You may create additional database helper functions or refactor existing ones as necessary.
- You may create additional API routes and route handlers or refactor existing ones as necessary.

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Nine."

---

### Step Ten: Adding a Map View

**Implement the following user story:**

> As a rider, when I choose a route for a trip, I expect to see that route displayed on a map.

Implement this step by doing the following:

- Use [LeafletJS](http://leafletjs.com/) to replace the large BART map image with an interactive map component.
- When the user is viewing a series of directions in the `Trip Planner` view, add an overlay to the map showing the route. Paths between stations should correspond to the color of the service line for that step in the directions (e.g., the line between Rockridge and Orinda stations should be colored yellow, but paths between Ashby and Downtown Berkeley stations may be colored either red or orange).

**WHEN THIS STEP IS COMPLETE:** Make a commit with the message "Completes Step Ten."

---


## Available Resources

* [Postman](https://www.getpostman.com/)
* [AngularJS Docs](https://angularjs.org/)
* [ReactJS Docs](https://facebook.github.io/react/)
* [Webpack Docs](https://webpack.github.io/docs/)
* [Babel Docs](https://babeljs.io/docs/setup/)
* [jQuery Docs](https://jquery.com/)
* [Underscore Docs](http://underscorejs.org/)
* [BluebirdJS Docs](http://bluebirdjs.com/)
* [NodeJS Docs](https://nodejs.org/)
* [ExpressJS Docs](https://expressjs.com/)
* [Body Parser Middleware Docs](https://github.com/expressjs/body-parser)
* [MySQL Docs](https://dev.mysql.com/doc/refman/5.7/en/)
* [MySQL npm package Docs](https://www.npmjs.com/package/mysql)
* [MySQL Cheat Sheet](http://www.cheat-sheets.org/sites/sql.su/)
* [Leaflet](http://leafletjs.com/) Docs
* Docs for any npm packages you might use
* [MDN](https://developer.mozilla.org/)
* [Stack Overflow](http://stackoverflow.com/)
* [Google Search](https://google.com) to search for the correct page on any of the documentation above