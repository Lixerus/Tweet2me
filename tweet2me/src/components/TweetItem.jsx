import TweetButton from './UI/TweetButton'
import { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import fetchdata from '../fetch_data/globaltweet'
import { CsrfTokenContext } from '../App'
import ParentTweet from './ParentTweet'
import  UserPicture  from './UI/UserPicture'
import  UserDisplay  from './UI/UserDisplay'

const TweetItem = ({post, deleteTweet, setModal, setRetweetId, hideAction, isRetweet}) =>{
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
          <div className = {isRetweet===true ? 'col-md border bg-light rounded py-3 px-1' : 'col-md border bg-light rounded py-4 my-5 px-4'}>
            {post.is_retweet === true && <div className='mb-2'><span className='small text-muted'>Retweet <UserDisplay user={post.user} /></span></div>}
            <UserPicture user={post.user} />
            <UserDisplay includeFullName user={post.user}/>
            <div className="my-3 py-3 rounded bg-white"> {post.content}</div>
            <ParentTweet post={post}/>
            {!hideAction && <span className="m-1">{likes} likes</span>}
            {!hideAction && <TweetButton label = "like" onClick = {() => tweetLikeAction(likes, "like")}/>}
            {!hideAction &&<TweetButton label = "dislike" onClick = {() => tweetLikeAction(likes, "unlike")}/>}
            {!hideAction &&<TweetButton label = "delete" onClick = {() => deleteTweet(post)} />}
            <Link to = {`/tweet/${post.id}`} state = {{id: post.id}}><TweetButton label = "view" onClick = {() => null}/></Link>
            {!hideAction && <TweetButton label = "retweet" onClick = {() => onRetweet()}/>}
          </div>
    )
}

export default TweetItem