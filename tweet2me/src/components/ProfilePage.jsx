import TweetList from './TweetList';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileBadgeComponent from './ProfileBadgeComponent';
import fetchdata from "../fetch_data/globaltweet"
import { useParams } from "react-router-dom"
import { UsernameContext } from '../App';

const ProfilePage = () =>{
    const [tweets, setTweets] = useState([])
    const urlusername = useParams().username
    const [username, setUsername] = useState(urlusername)
    const visitorname =useContext(UsernameContext)
    const [didLookup, setDidLookup] = useState(false)

    useEffect( () => {
        fetchdata('GET', `http://localhost:8000/api/tweets/?username=${urlusername}`).then( xhr => setTweets(xhr.response.results))
        .then( () => {
          setUsername(urlusername)
          setDidLookup(true)
        })
        .catch( (res) => {
          if (res.detail === "Authentication credentials were not provided."){
            alert("Error! You need to login first")}
          else{alert("Error")}
        }
      )
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
    <ProfileBadgeComponent username={username} />
    {visitorname !== '' ? <Link to={`/profile/${username}/hiddentweets`} className="text-decoration-none text-dark pointer m-3">Показать скрытые твиты</Link> : null}
    <TweetList tweets = {tweets} deleteTweet={deleteTweet} retweetTweet={addTweet} didLookup={didLookup}/>
    <button onClick= {() => showArray()}>Show tweets objects</button>
    <button onClick= {() => fetchdata('GET', `http://localhost:8000/api/tweets/`)}>Fetch data</button>
    </>
    )
}
export default ProfilePage