import TweetList from './TweetList';
import { useEffect, useState, useContext } from 'react';
import fetchdata from "../fetch_data/globaltweet"
import { CsrfTokenContext } from '../App';


const HiddenTweetsPage = () => {
    const [tweets, setTweets] = useState([])
    const csrfToken = useContext(CsrfTokenContext)

    useEffect( () => {
      fetchdata('POST', `http://localhost:8000/api/tweets/hiddentweets/`, null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
      .then(xhr => setTweets(xhr.response.results))
      .catch((res) => console.log(res))
    },[csrfToken])
    
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
    <TweetList tweets = {tweets} deleteTweet={deleteTweet} retweetTweet={addTweet} hideAction seen/>
    <button onClick= {() => showArray()}>Show tweets objects</button>
    <button onClick= {() => fetchdata('GET', `http://localhost:8000/api/tweets/feed`, null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})}>Fetch data</button>
    </>
    )
}

export default HiddenTweetsPage