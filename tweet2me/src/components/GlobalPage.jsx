import TweetList from './TweetList';
import TweetSubmit from './TweetSubmit';
import { useEffect, useState } from 'react';
import fetchData from "../fetch_data/globaltweet";

const GlobalPage = ({getCsrf}) =>{
    const [tweets, setTweets] = useState([])
    const [didLookup , setDidLookup] = useState(false)

    useEffect( () => {
      fetchData('GET', 'http://localhost:8000/api/tweets/')
      .then( (xhr) => {
        setTweets(xhr.response.results)
        setDidLookup(true)
      })
      .catch((res) => console.log(res))
    },[])
    
      const addTweet = (newTweet) => {
        setTweets([newTweet, ...tweets])
        console.log(newTweet)
      }
    
      const deleteTweet = (tweetToDelete) => {
        const tweetsAfterDeletion = tweets.filter( (item) => item.id !== tweetToDelete.id)
        setTweets(tweetsAfterDeletion)
      }
    

    return (
    <> 
    <TweetSubmit addTweet = {addTweet}/>
    <TweetList tweets = {tweets} deleteTweet={deleteTweet} retweetTweet={addTweet} didLookup={didLookup}/>
    </>
    )
}

export default GlobalPage