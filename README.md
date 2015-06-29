# Gabblr
Schedule me and I will send tweets when you'll be busy or doing dirty things...

## Intallation

#### Clone the repository
```
$ git clone https://github.com/hellomathieu/gabblr
```

#### Install dependencies
```
$ npm install
```

#### Copy and edit the settings.json
```
$ cp app/conf/settings.json.dist app/conf/settings.json
$ $EDITOR app/conf/settings.json
```

#### Settings
```json
{
  "twitterKeys": {
    "consumer_key": "consumer_key",
    "consumer_secret": "consumer_secret",
    "access_token": "access_token",
    "access_token_secret": "access_token_secret"
  },
  "username": "your_twittr_username",
  "timeline" : {
    "start": "2015/06/29 12:31:43",
    "delay": "5|10"
  }
}
```

- ```timeline.start``` : the date when the bot starts the automatic timeline.
- ```timeline.delay``` : delay between tweets in seconds. 
The pipe separator refers to the minimum and maximum time. Or just indicate a number for a regular time.

#### Copy and edit the tweets.json
```
$ cp app/data/tweets.json.dist app/data/tweets.json
$ $EDITOR app/conf/tweets.json
```

#### Tweets
```js
[
  {"tweet": {"status": "My first tweet ! #gabblr"}},
  {"tweet": {"status": "Hi bots ! #gabblr"}},
  // ...
]
```

## Usage
```
npm start
```

## Contributing
With pleasure !