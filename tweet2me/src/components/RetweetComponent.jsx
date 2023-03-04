import TweetItem from "./TweetItem"
import fetchdata from "../fetch_data/globaltweet"
import { useRef, useContext, useState } from "react"
import { CsrfTokenContext } from "../App"

const RetweetComponent = ({tweet, id, retweetTweet, setVisibleModal}) => {

    const [textRetweet, setTextRetweet] = useState('')
    let csrfToken = useContext(CsrfTokenContext)

    const retweet = () =>{
        const data = {
            id : id,
            action : "retweet",
            content : textRetweet.trim()
        }
        fetchdata("POST", "http://localhost:8000/api/tweets/action/", data, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
        .then((xhr) => {
            retweetTweet(xhr.response)
            setTextRetweet('')
            setVisibleModal(false)
        })
        .catch((e) => console.log(e))
    }

    return (
        <>
        <div className='p-1'>
        <textarea className="form-control m-1" rows="3" value={textRetweet} onChange={(e) => setTextRetweet(e.target.value)}placeholder='Ваш ретвит'></textarea>
        <button type='submit' className='btn-primary btn-sm rounded m-1' onClick={() => retweet()}>Отправить</button>
        </div>
        <TweetItem post = {tweet} hideAction/>
        </>
    )
}


export default RetweetComponent