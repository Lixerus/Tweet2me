import TweetList from './TweetList';
import TweetSubmit from './TweetSubmit';
import { useState } from 'react';

const GlobalPage = () =>{
    const [tweets, setTweets] = useState([
        {id: 11, author: "JS is good1", body: "body1", likes: 10},
        {id: 22, author: "JS is good2", body: "body2", likes: 2},
        {id: 333, author: "JS is good3", body: "body3", likes : 0}
      ])
    
    
      const showArray = () => {
        console.log(tweets)
      }
    
      const addTweet = (newTweet) => {
        setTweets([...tweets, newTweet])
        console.log(newTweet)
      }
    
      const deleteTweet = (tweetToDelete) => {
        const tweetsAfterDeletion = tweets.filter( (item) => item.id !== tweetToDelete.id)
        setTweets(tweetsAfterDeletion)
      }
    

    return (
    <>
    <TweetSubmit addTweet = {addTweet}/>
    <TweetList tweets = {tweets} deleteTweet={deleteTweet} retweetTweet={addTweet}/>
    <button onClick= {() => showArray()}>Show tweets objects</button>
    </>
    )
}

export default GlobalPage