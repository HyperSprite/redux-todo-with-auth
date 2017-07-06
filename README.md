![A Race athlete icon](https://github.com/HyperSprite/redux-todo-with-auth/raw/master/web/src/server/public/favicons/android-chrome-192x192.png)
# A Race athlete
The idea behind **A Race athlete** is to help people pick, plan and train for their primary endurance race goals, or "A race". It works using by connecting to [Strava](https://strava.com), a popular endurance sport application for authentication, authorization and data. To see A Race athlete in action or check out the features, just go to the [homepage](https://www.araceathlete.com/home). 

It uses a fairly standard Nodejs/Express setup for serving up MongoDB data and a React/Redux front end skinned in Material-ui.

## Handy Links:

* [Real Favicon Generator](https://realfavicongenerator.net) - [CSS-Tricks](https://css-tricks.com/favicon-quiz/)
* [Flow type](https://flowtype.org/) - [github](https://github.com/facebook/flow)
* [Node.js](https://nodejs.org) - [github](https://github.com/nodejs/node) - [docs](https://nodejs.org/en/docs/)
* [Experss](http://expressjs.com/) - [github](https://github.com/expressjs/express) - [docs](http://expressjs.com/en/4x/api.html)
* [GatsbyJS](https://www.gatsbyjs.org/) - [github](https://github.com/gatsbyjs/gatsby) - [docs](https://www.gatsbyjs.org/docs/)

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
* [node-schedule](https://www.npmjs.com/package/node-schedule) - [github](https://github.com/node-schedule/node-schedule) - Like cron for node
* [passport](http://passportjs.org/) - [github](https://github.com/jaredhanson/passport)
* passport-jwt - [github](https://github.com/themikenicholson/passport-jwt)
* passport-local - [github](https://github.com/jaredhanson/passport-local)
* passport-strava-oauth2 - [github](https://github.com/millsy/passport-strava)
* [react](https://facebook.github.io/react) - [github](https://github.com/facebook/react)
* [react-icons](http://gorangajic.github.io/react-icons/) - [github](https://github.com/gorangajic/react-icons)
* react-redux - [github](https://github.com/reactjs/react-redux) - react/redux bindings
* [react-router v4](https://react-router.now.sh/) - [github](https://github.com/ReactTraining/react-router/tree/v4)
* react-scroll - [github](https://github.com/fisshy/react-scroll)
* [redux](http://redux.js.org/) - [github](https://github.com/reactjs/redux/)
* redux-form-material-ui - [github](https://github.com/erikras/redux-form-material-ui)
* [redux-form](http://redux-form.com) - [github](https://github.com/erikras/redux-form)
* requestify - [github](https://github.com/ranm8/requestify) - caching http client for node 
* [serialize-javascript](https://github.com/yahoo/serialize-javascript) - similar to JSON.stringify
* node-strava-v3 - [github](https://github.com/UnbounDev/node-strava-v3)
* uuid - [github](https://github.com/kelektiv/node-uuid) - generates UUIDs
