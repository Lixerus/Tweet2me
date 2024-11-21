import TweetList from './TweetList';
import { useEffect, useState, useContext } from 'react';
import fetchdata from "../fetch_data/globaltweet"
import { CsrfTokenContext } from '../App';


const HiddenTweetsPage = () => {
    const [tweets, setTweets] = useState([])
    const [didLookup , setDidLookup] = useState(false)
    const csrfToken = useContext(CsrfTokenContext)

    useEffect( () => {
      fetchdata('POST', `http://localhost:8000/api/tweets/hiddentweets/`, null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
      .then((xhr) => {
        setTweets(xhr.response.results)
        setDidLookup(true)
      })
      .catch((res) => {
        console.log(res)
        if (res.detail === "Authentication credentials were not provided."){
          alert("Error! You need to login first")}
        else{alert("Error")}
      })
    },[csrfToken])

      const addTweet = (newTweet) => {
        setTweets([...tweets, newTweet])
        console.log(newTweet)
      }
    
      const deleteTweet = (tweetToDelete) => {
        const tweetsAfterDeletion = tweets.filter( (item) => item.id !== tweetToDelete.id)
        setTweets(tweetsAfterDeletion)
      }
    

    return (
    <TweetList tweets = {tweets} deleteTweet={deleteTweet} retweetTweet={addTweet} hideAction seen didLookup={didLookup}/>
    )
}

export default HiddenTweetsPage