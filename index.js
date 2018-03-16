var Twitter = require('twitter');

var client = new Twitter(
{
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});

function retrieveTimeline()
{
	client.get('statuses/user_timeline', { screen_name : '4eleven7', trim_user : true, count : 10 }, function(error, tweets, response)
	{
		if (error) {
			throw error;
		}
		
		var i = 0;
		var count = tweets.length;
		
		for (; i < count; i++)
		{
			var tweet = tweets[i];
			
			var tweetId = tweet.id_str;
			var postDate = new Date(tweet.created_at);
			
			var postedDaysAgo = daysBetweenDates(new Date(), postDate);
			
			if (postedDaysAgo >= 10) {
				deleteTweet(tweetId);
			}
		}
	});
}

function deleteTweet(tweetId)
{
	client.post('statuses/destroy', { id : tweetId }, function(error, tweet, response)
	{
		if (error) {
			console.log(error);
		}
	});
}

function daysBetweenDates(dateOne, dateTwo)
{
	var diff = Math.abs(dateOne.getTime() - dateTwo.getTime())
	return diff / (1000 * 60 * 60 * 24);
}

retrieveTimeline()
