import { useState, useContext } from "react"
import { CsrfTokenContext } from "../App"
import fetchdata from "../fetch_data/globaltweet"

const TweetSubmit = ({addTweet}) => {
    const [text, setText] = useState('')
    const csrfToken = useContext(CsrfTokenContext)

    function handleTextChange(event) {
        setText(event.target.value)
    }

    const handleTextSubmit = (text) => {
        fetchdata("POST", "http://localhost:8000/api/tweets/create/", {content: text}, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
        .then( (xhr) => addTweet(xhr.response))
        .catch(res=> console.log(res))
        setText('')
    }

    return (
    <div className='p-3-down'>
        <textarea className="form-control m-1" rows="3" placeholder='Ваш Твит' value = {text} onChange={handleTextChange}></textarea>
        <button type='submit' className='btn-primary rounded m-1' onClick={() => handleTextSubmit(text)}>Отправить</button>
    </div>
    )
}

export default TweetSubmit