import TweetList from './TweetList';
import TweetSubmit from './TweetSubmit';
import { useEffect, useState, useContext } from 'react';
import fetchdata from "../fetch_data/globaltweet"
import { CsrfTokenContext } from '../App';

const FeedPage = () =>{
    const [tweets, setTweets] = useState([])
    const [didLookup , setDidLookup] = useState(false)
    const csrfToken = useContext(CsrfTokenContext)

    useEffect( () => {
      fetchdata('POST', `http://localhost:8000/api/tweets/feed/`, null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
      .then((xhr) => {
        setTweets(xhr.response.results)
        setDidLookup(true)
      })
      .catch((res) => {
        if (res.detail === "Authentication credentials were not provided."){
          alert("Error! You need to login first")
        }
        else{alert("Error")}
        console.log(res)
      })
    },[csrfToken])

    useEffect(() => {
      let timer = setInterval(() => {
        if (tweets.length && csrfToken){
          fetchdata('POST', 'http://localhost:8000/api/tweets/longpoll/feed/', {id : tweets[0].id}, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
          .then((xhr) => {
            setTweets(prev => [...xhr.response, ...prev])})
          .catch((res) => {
            console.log(res)
            console.log("Eror")
            }
          )
        }
      }, 10000)
      return () => clearInterval(timer)
    }, [tweets, csrfToken])
    
    
    const showArray = () => {
      console.log(tweets)
    }
  
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
    <button onClick= {() => showArray()}>Show tweets objects</button>
    <button onClick= {() => fetchdata('GET', `http://localhost:8000/api/tweets/feed`, null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})}>Fetch data</button>
    </>
    )
}

export default FeedPage