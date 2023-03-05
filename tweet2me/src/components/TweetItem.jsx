import TweetButton from './UI/TweetButton'
import { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import fetchdata from '../fetch_data/globaltweet'
import { CsrfTokenContext } from '../App'
import ParentTweet from './ParentTweet'
import  UserPicture  from './UI/UserPicture'
import  UserDisplay  from './UI/UserDisplay'

const TweetItem = ({post, deleteTweet, setModal, setRetweetId, hideAction, isRetweet, seen}) =>{
  const [likes, setLikes] = useState(post.likes)
  let csrfToken = useContext(CsrfTokenContext)
  
  // реализовать со статусом, статус : лайкнуто или нет с помощью доп поля вычислимого на серве
  const tweetLikeAction = (action) => {
    fetchdata("POST", "http://localhost:8000/api/tweets/action/", {id : post.id, action: action}, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
    .then((xhr) => setLikes(xhr.response.likes))
    .catch((res) => console.log(res))
  }

  const onRetweet = () =>{
    console.log("cklick")
    setRetweetId(prev => post.id)
    setModal(prev => true)
  }

  const hideTweet = (action) =>{
    fetchdata("POST", "http://localhost:8000/api/tweets/action/", {id : post.id, action: action},  {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
    .then( (xhr) => {
      console.log(xhr.res)
      deleteTweet(post)
    })
    .catch(res => console.log(res))
  }


    return(
          <div className = {isRetweet===true ? 'col-md border bg-light rounded py-3 px-1' : 'col-md border bg-light rounded py-4 my-5 px-4'}>
            {post.is_retweet === true && <div className='mb-2'><span className='small text-muted'>Retweet <UserDisplay user={post.user} /></span></div>}
            <div className = "d-flex justify-content-between">
                <div>
                   <UserPicture user={post.user} />
                   <UserDisplay includeFullName user={post.user}/>
                </div>
                {(!seen && !isRetweet) && <div><span className="fs-6 fw-light m-1">Скрыть</span><input type="checkbox" className="p-1" onClick={() => hideTweet("seen")}/></div>}
                {(seen && !isRetweet) && <div><span className="fs-6 fw-light m-1">Вернуть</span><input type="checkbox" className="p-1" onClick={() => hideTweet("unseen")}/></div>}
            </div>
            <div className="my-3 py-3 ps-2 rounded bg-white"> {post.content}</div>
            <ParentTweet post={post}/>
            {!isRetweet && <span className="m-1">{likes} likes</span>}
            {!isRetweet && <TweetButton label = "like" onClick = {() => tweetLikeAction("like")}/>}
            {!isRetweet && <TweetButton label = "dislike" onClick = {() => tweetLikeAction("unlike")}/>}
            {/* {!hideAction &&<TweetButton label = "delete" onClick = {() => deleteTweet(post)} />} */}
            <Link to = {`/tweet/${post.id}`} state = {{id: post.id}}><TweetButton label = "view" onClick = {() => null}/></Link>
            {!hideAction && <TweetButton label = "retweet" onClick = {() => onRetweet()}/>}
          </div>
    )
}

export default TweetItem