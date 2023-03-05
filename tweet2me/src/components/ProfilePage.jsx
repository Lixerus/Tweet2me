import TweetList from './TweetList';
import { useEffect, useState } from 'react';
import ProfileBadgeComponent from './ProfileBadgeComponent';
import fetchdata from "../fetch_data/globaltweet"
import { useParams } from "react-router-dom"

const ProfilePage = () =>{
    const [tweets, setTweets] = useState([])
    const urlusername = useParams().username
    const [username, setUsername] = useState(urlusername)

    useEffect( () => {
        fetchdata('GET', `http://localhost:8000/api/tweets/?username=${urlusername}`).then( xhr => setTweets(xhr.response.results))
        .then( () => setUsername(urlusername))
        .catch( (res) => console.log(res))
    },[urlusername])
    
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
    <ProfileBadgeComponent username={urlusername} />
    <TweetList tweets = {tweets} deleteTweet={deleteTweet} retweetTweet={addTweet}/>
    <button onClick= {() => showArray()}>Show tweets objects</button>
    <button onClick= {() => fetchdata('GET', `http://localhost:8000/api/tweets/`)}>Fetch data</button>
    </>
    )
}
export default ProfilePage