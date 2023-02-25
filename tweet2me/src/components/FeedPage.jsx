import TweetList from './TweetList';
import TweetSubmit from './TweetSubmit';
import { useEffect, useState } from 'react';
import fetchdata from "../fetch_data/globaltweet"

const FeedPage = () =>{
    const [tweets, setTweets] = useState([])
    const [csrfToken, setCsrfToken] = useState('')
// make getCSRF method better and more appropriate
    const getCSRF = () => {
        fetchdata("GET","http://localhost:8000/api/tweets/csrftoken/")
        .then((xhr) => {
            const csrfToken = xhr.getResponseHeader('X-CSRFToken')
            setCsrfToken(prev => csrfToken)
            fetchdata('POST', `http://localhost:8000/api/tweets/feed/`, null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
            .then( xhr => setTweets(xhr.response.results))
        })
        .catch(err => alert(err))
      }

    useEffect( () => {
        getCSRF()

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
    <button onClick= {() => fetchdata('GET', `http://localhost:8000/api/tweets/feed`, null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})}>Fetch data</button>
    </>
    )
}

export default FeedPage