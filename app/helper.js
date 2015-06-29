var fs   = require('fs'),
    path = require("path")

function Helper(){
  var helper = this
}

Helper.prototype = {

  // Colors used for terminal output
  // @source : https://github.com/putaindecode/ed-209/blob/master/bot.js#L13-L18
  colors: {
    red     : function(str){ return "\033[0m\033[31m" + str + "\033[0m" },
    green   : function(str){ return "\033[0m\033[32m" + str + "\033[0m" },
    yellow  : function(str){ return "\033[0m\033[33m" + str + "\033[0m" },
    blue    : function(str){ return "\033[0m\033[34m" + str + "\033[0m" },
    magenta : function(str){ return "\033[0m\033[35m" + str + "\033[0m" }
  },

  openJson: function(filepath) {

    var p = path.resolve(__dirname) + '/'
        file = p + filepath

    if (fs.existsSync( file + '.json')) {
      return require( file )
    } else {
      console.error( this.colors.red('Hep ! Please, create a `' + file + '.json` !') )
      process.exit(1)
    }

  },

  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = new Helper()