import TweetButton from './UI/TweetButton'
import { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import fetchdata from '../fetch_data/globaltweet'
import { CsrfTokenContext } from '../App'

const TweetItem = ({post, deleteTweet, setModal, setRetweetId, hideAction}) =>{
  const [likes, setLikes] = useState(post.likes)
  let csrfToken = useContext(CsrfTokenContext)
  
  // реализовать со статусом, статус : лайкнуто или нет с помощью доп поля вычислимого на серве
  const tweetLikeAction = (likes, action) => {
    fetchdata("POST", "http://localhost:8000/api/tweets/action/", {id : post.id, like: likes, action: action}, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
    .then((xhr) => setLikes(xhr.response.likes))
    .catch((res) => console.log(res))
  }

  const onRetweet = () =>{
    console.log("cklick")
    setRetweetId(prev => post.id)
    setModal(prev => true)
  }


    return(
        <div className='row gy-3'>
          <div className='col-md border bg-light rounded'>
            <div className="fs-5 text-start"> {post.user.username}</div>
            <div className="p-3"> {post.content}</div>
            <div>{likes} likes</div>
            {!hideAction && <TweetButton label = "like" onClick = {() => tweetLikeAction(likes, "like")}/>}
            {!hideAction &&<TweetButton label = "dislike" onClick = {() => tweetLikeAction(likes, "unlike")}/>}
            {!hideAction &&<TweetButton label = "delete" onClick = {() => deleteTweet(post)} />}
            <Link to = {`/tweet/${post.id}`} state = {{id: post.id}}>
            {!hideAction && <TweetButton label = "view" onClick = {() => null}/>}
            </Link>
            {!hideAction && <TweetButton label = "retweet" onClick = {() => onRetweet()}/>}
          </div>
        </div>
    )
}

export default TweetItem