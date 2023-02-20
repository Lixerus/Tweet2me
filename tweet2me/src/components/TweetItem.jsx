import TweetButton from './UI/TweetButton'
import { useState } from 'react'
import { Link } from "react-router-dom"

const TweetItem = ({post, deleteTweet, retweetTweet}) =>{
  const [likes, setLikes] = useState(post.likes)

  const tweetLikeAction = (likes) => {
    const currentLikes = likes+1
    setLikes(currentLikes)
  }

    return(
        <div className='row gy-3'>
          <div className='col-md border bg-light rounded'>
            <div className="fs-5 text-start"> {post.user.username}</div>
            <div className="p-3"> {post.content}</div>
            <div>{likes}</div>
            <TweetButton label = "like" onClick = {() => tweetLikeAction(likes)}/>
            <TweetButton label = "delete" onClick = {() => deleteTweet(post)} />
            <Link to = {`/tweet/${post.id}`} state = {{id: post.id}}>
            <TweetButton label = "view" onClick = {() => null}/>
            </Link>
            <TweetButton label = "retweet" onClick = {() => retweetTweet({...post, id:Date.now()})}/>
          </div>
        </div>
    )
}

export default TweetItem