import { useEffect, useState } from "react"
import TweetItem from "./TweetItem"
import { Link, useParams } from "react-router-dom"
import fetchData from "../fetch_data/globaltweet"

const DetailViewPage = () => {
    const [loadingMode, setLoadingMode] = useState(true)
    const {id} = useParams()
    const [tweet, setTweet] = useState([])


    useEffect(() => {
        console.log('start')
        fetchData('GET', `http://127.0.0.1:8000/api/tweets/${id}`)
        .then( xhr => setTweet(xhr.response))
        .then( () => setLoadingMode(false))
        .catch( () => {alert("Error occured while fetching detailed view data")})
      },[id])


    return (
        <>
        {loadingMode ? <h1>Lading data {console.log(loadingMode)}</h1> :
        <TweetItem post = {tweet} deleteTweet={() => null} retweetTweet={() => null} />}
        <Link to='http://localhost:3000/tweet/111'>Go to 111</Link>
        </>
    )
}

export default DetailViewPage