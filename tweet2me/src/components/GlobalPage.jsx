import TweetList from './TweetList';
import TweetSubmit from './TweetSubmit';
import { useEffect, useState } from 'react';
import fetchData from "../fetch_data/globaltweet";

const GlobalPage = ({getCsrf}) =>{
    const [tweets, setTweets] = useState([])

    useEffect( () => {
      fetchData('GET', 'http://localhost:8000/api/tweets/').then( xhr => setTweets(xhr.response.results))
      .catch((res) => console.log(res))
    },[])
    
    
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
    <button onClick= {() => fetchData('GET', `http://localhost:8000/api/tweets/`)}>Fetch data</button>
    <button onClick= {() => getCsrf()}>Csrf data</button>
    </>
    )
}

export default GlobalPage