import TweetButton from './UI/TweetButton'
import { useState } from 'react'
import { Link } from "react-router-dom"

const TweetItem = ({post, deleteTweet, retweetTweet}) =>{
  const [likes, setLikes] = useState(post.likes)
  const viewUrl = `/tweet/${post.id}`

  const tweetLikeAction = (tweet) => {
    const currentLikes = tweet.likes+1
    setLikes(currentLikes)
    tweet.likes = currentLikes
  }

  const doNothing = () => null
  
    return(
        <div className='row gy-3'>
          <div className='col-md border bg-light rounded'>
            <div className="fs-5 text-start"> {post.author}</div>
            <div className="p-3"> {post.body}</div>
            <div>{likes}</div>
            <TweetButton label = "like" onClick = {() => tweetLikeAction(post)}/>
            <TweetButton label = "delete" onClick = {() => deleteTweet(post)} />
            <Link to = {viewUrl} state = {{id: post.id}}>
            <TweetButton label = "view" onClick = {() => doNothing()}/>
            </Link>
            <TweetButton label = "retweet" onClick = {() => retweetTweet({...post, id:Date.now()})}/>
          </div>
        </div>
    )
}


export default TweetItem