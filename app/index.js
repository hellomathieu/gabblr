    // lib
var helper   = require('./helper'),
    // conf files
    settings = helper.openJson('conf/settings'),
    tweets   = helper.openJson('data/tweets'),
    // app
    gabblr   = require('./gabblr')

// create new Gabblr app
var story = new gabblr(settings)

// init & start app
story.init(tweets).start()