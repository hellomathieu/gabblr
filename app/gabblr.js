    // dependencies
var twit     = require('twit'),
    _        = require('lodash'),
    moment   = require('moment'),
    fs       = require('fs'),
    path     = require("path"),
    // lib
    helper   = require('./helper')

function Gabblr(settings){
  // variables
  this.settings     = settings || {}
  this.firstrun     = true
  this.dateFormat   = "YYYY/MM/DD HH:mm"
  this.now          = moment().format('YYYYMMDDHHmmss')
  this.tweets       = {} // object container for tweets.json
  this.currentTweet = false // string status
  this.totalTweets  = 0 
  this.timer        = null

  // open twitter api
  this.twapi        = new twit(settings.twitterKeys)
}

Gabblr.prototype = {
  
  init: function(tweets){
    this.tweets       = tweets || {}
    this.totalTweets  = this.tweets.length || 0

    return this
  },

  start: function(){
    if (this.totalTweets > 0) {
      this.timer = setInterval(_.bind(this.showtime, this), 1000)
    }
  },

  showtime: function(instance) {
    var gabblr    = this,
        now       = moment(),
        start     = moment( new Date( gabblr.settings.timeline.start ) ),
        beginning = start.diff(now, 'seconds')

    if (beginning <= 0) {
      console.log( helper.colors.yellow('-- Showtime: '), this.totalTweets + ' tweets to run.')

      clearInterval(gabblr.timer) 
      gabblr.queue()
    } else if (gabblr.firstrun === true) {
      gabblr.firstrun = false
      console.log( helper.colors.red('-- Sorry guy, the story begins on ' + gabblr.settings.timeline.start) )
    }
  },

  queue: function(){
    var gabblr = this,
        delay  = ( (isNaN(gabblr.settings.timeline.delay)) ? gabblr.randomlyTime() : parseInt(gabblr.settings.timeline.delay,10) ) * 1000

    gabblr.currentTweet = (typeof gabblr.tweets[0] === 'object') ? gabblr.tweets[0].tweet.status : false

    if (gabblr.currentTweet === false) {

      console.log( helper.colors.yellow( '-- Archive: ' ), gabblr.now + '_tweets.json' )

      fs.rename( path.resolve(__dirname) + '/data/tweets.json',  path.resolve(__dirname) + '/data/' + gabblr.now + '_tweets.json', function(err){
        if (err) console.error( helper.colors.red(err.message) )
        console.log( helper.colors.yellow('-- End of the story, buddy. :)') )
      })
      return
    }

    console.log( helper.colors.magenta('-- Queue: '), 'next tweet in ',  helper.colors.magenta( delay + 'ms') )

    setTimeout(_.bind(gabblr.tweet, gabblr), delay)
  },

  tweet: function(instance){
    var gabblr  = instance || this,
        message = (gabblr.currentTweet.length > 0) ? gabblr.currentTweet : false

    if (message === false)
      return

    this.twapi.post('statuses/update', { status: message }, function(err, data, response) {
      if (err) console.error( helper.colors.red(err.message) )
      console.log( helper.colors.green('-- Tweet: '), message )
      gabblr.nextTweet()
    })

  },

  nextTweet: function() {
    this.tweets = _.slice(this.tweets, 1)
    this.queue()
  },

  randomlyTime: function() {
    var delay  = this.settings.timeline.delay.split("|")
        min    = parseInt(delay[0],10),
        max    = parseInt(delay[1],10)

    return helper.randomInt(min, max)
  }

}

module.exports = Gabblr