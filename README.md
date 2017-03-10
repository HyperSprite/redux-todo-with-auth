#Redux Todo Example with Auth (with Node/Express/Mongo backend)

This is taking a the React Todo example and putting Auth in front of it. It  uses all the latest stuff, as of time of committing, including React Router v4. At least that is what this started out as.


##This is really the repo for A Race athlete.
The idea behind **A Race athlete** is it will be a place that to help people pick, plan and train for their primary race goals, or A race. It works using by connecting to [Strava](https://strava.com), a popular endurance sport application for both authentication and data. Currently, I've been working on the events portion which allows a user to enter events, favorite events and quickly get relevant information about that event.

##Handy Links:

* [Real Favicon Generator](https://realfavicongenerator.net) - [CSS-Tricks](https://css-tricks.com/favicon-quiz/)
* [Flow type](https://flowtype.org/) - [github](https://github.com/facebook/flow)
* [Node.js](https://nodejs.org) - [github](https://github.com/nodejs/node) - [docs](https://nodejs.org/en/docs/)
* [Experss](http://expressjs.com/) - [github](https://github.com/expressjs/express) - [docs](http://expressjs.com/en/4x/api.html)

###APIs:

* Google:
	* [Geo Coding](https://developers.google.com/maps/documentation/geocoding/start)
	* [Elevation](https://developers.google.com/maps/documentation/elevation/start)
	* [Time Zones](https://developers.google.com/maps/documentation/timezone/start)
	* [Distance](https://developers.google.com/maps/documentation/distance-matrix/) - not yet implemented
* [Open Weather Maps](https://openweathermap.org/forecast5) for Local Weather
* [Strava](https://strava.github.io/api/) for Oauth and Data
* [United States Naval Observatory](http://aa.usno.navy.mil/data/docs/api.php) for Astrophases

###Modules:

* axios - [github](https://github.com/mzabriskie/axios) - xhr (see client/actions/index)
* [date-fns](https://date-fns.org) - like lodash for dates
* express-form - [github](https://github.com/freewil/express-form)
* flow-bin - [github](https://github.com/flowtype/flow-bin)
* node-geocoder - [github](https://github.com/nchaulet/node-geocoder)
* marked - [github](https://github.com/chjj/marked)
* [material-ui](http://www.material-ui.com/#/components) - [github](https://github.com/callemall/material-ui)
* [moment](http://momentjs.com/) - time conversions
* [mongoose](http://mongoosejs.com/) - [github](https://github.com/Automattic/mongoose) - ORM for Mongodb
* mongoose-findorcreate - [github](https://github.com/drudge/mongoose-findorcreate)
* [nodemon](https://nodemon.io/) - [github](https://github.com/remy/nodemon) - run node on a watcher
* [passport](http://passportjs.org/) - [github](https://github.com/jaredhanson/passport)
* passport-jwt - [github](https://github.com/themikenicholson/passport-jwt)
* passport-local - [github](https://github.com/jaredhanson/passport-local)
* passport-strava-oauth2 - [github](https://github.com/millsy/passport-strava)
* [react](https://facebook.github.io/react) - [github](https://github.com/facebook/react)
* [react-icons](http://gorangajic.github.io/react-icons/) - [github](https://github.com/gorangajic/react-icons)
* react-redux - [github](https://github.com/reactjs/react-redux) - react/redux bindings
* [react-router v4](https://react-router.now.sh/) - [github](https://github.com/ReactTraining/react-router/tree/v4)
* [redux](http://redux.js.org/) - [github](https://github.com/reactjs/redux/)
* redux-form-material-ui - [github](https://github.com/erikras/redux-form-material-ui)
* [redux-form](http://redux-form.com) - [github](https://github.com/erikras/redux-form)
* requestify - [github](https://github.com/ranm8/requestify) - caching http client for node
* [serialize-javascript](https://github.com/yahoo/serialize-javascript) - similar to JSON.stringify
* node-strava-v3 - [github](https://github.com/UnbounDev/node-strava-v3)
* uuid - [github](https://github.com/kelektiv/node-uuid) - generates UUIDs
