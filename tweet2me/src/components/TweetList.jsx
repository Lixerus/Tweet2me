import TweetItem from './TweetItem'
import MyModal from './UI/MyModal/MyModal'
import RetweetComponent from './RetweetComponent'
import { useState } from 'react'


const TweetList = ({tweets, deleteTweet, retweetTweet}) => {
    const [visibleModal, setVisibleModal] = useState(false)
    const [retweetId , setRetweetId] = useState(null)
    return (<>
    <MyModal visible={visibleModal} setVisible={setVisibleModal}>
        <>
        {retweetId && <RetweetComponent tweet={tweets.filter((element) => element.id === retweetId)[0]} retweetTweet={retweetTweet} id={retweetId} setVisibleModal={setVisibleModal}/>}
        </>
    </MyModal>
    <div className="container p-3">
        <div className='fw-bold fs-3 p-2'>
            Tweets
        </div>
        {tweets.map((item) => 
            <TweetItem post = {item} key = {item.id} deleteTweet = {deleteTweet} setRetweetId={setRetweetId} setModal = {setVisibleModal} />)}
    </div>
    </>
    )
}

export default TweetList