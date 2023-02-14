import { useState } from "react"

const TweetSubmit = (props) => {

    const [text, setText] = useState('')

    function handleTextChange(event) {
        setText(event.target.value)
        console.log(event.target.value)
    }

    function handleTextSubmit(text){
        if (text !== '')
            props.addTweet({id:Date.now(), author:"Author", body: text, likes:1})
            setText('')
    }


    return (
    <div className='p-3'>
        <textarea className="form-control m-1" rows="3" placeholder='Ваш Твит' value = {text} onChange={handleTextChange}></textarea>
        <button type='submit' className='btn-primary rounded m-1' onClick={() => handleTextSubmit(text)}>Отправить</button>
    </div>
    )
}

export default TweetSubmit