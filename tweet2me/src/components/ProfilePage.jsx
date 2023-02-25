import TweetList from './TweetList';
import { useEffect, useState } from 'react';
import ProfileBadgeComponent from './ProfileBadge';
import fetchdata from "../fetch_data/globaltweet"

const ProfilePage = () =>{
    const [tweets, setTweets] = useState([])
    const [csrfToken, setCsrfToken] = useState('')

    // const getCSRF = (e) => {
    //     fetchdata("GET","http://localhost:8000/api/tweets/csrftoken/")
    //     .then((xhr) => {
    //       const csrfToken = xhr.getResponseHeader('X-CSRFToken')
    //       setCsrfToken(csrfToken)
    //     })
    //     .catch(err => alert(err))
    //   }

    useEffect( () => {
        fetchdata('GET', 'http://localhost:8000/api/tweets/?username=root').then( xhr => setTweets(xhr.response.results))
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
    <ProfileBadgeComponent />
    <TweetList tweets = {tweets} deleteTweet={deleteTweet} retweetTweet={addTweet}/>
    <button onClick= {() => showArray()}>Show tweets objects</button>
    <button onClick= {() => fetchdata('GET', `http://localhost:8000/api/tweets/`)}>Fetch data</button>
    </>
    )
}

export default ProfilePage