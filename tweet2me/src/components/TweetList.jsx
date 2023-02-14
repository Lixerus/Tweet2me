import TweetItem from './TweetItem'


const TweetList = ({tweets, deleteTweet, retweetTweet}) => {
    return (
    <div className="container p-3">
        <div className='fw-bold fs-3 p-2'>
            Tweets
        </div>
        {tweets.map((item) => <TweetItem post = {item} key={item.id} deleteTweet={deleteTweet} retweetTweet={retweetTweet}/>)}
    </div>
    )
}

export default TweetList