import { useEffect, useState } from "react"
import TweetItem from "./TweetItem"
import {useParams, useNavigate } from "react-router-dom"
import fetchData from "../fetch_data/globaltweet"

const DetailViewPage = () => {
    const [loadingMode, setLoadingMode] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate();
    const [tweet, setTweet] = useState([])


    useEffect(() => {
        fetchData('GET', `http://127.0.0.1:8000/api/tweets/${id}`)
        .then( xhr => setTweet(xhr.response))
        .then( () => setLoadingMode(false))
        .catch( () => {alert("Error occured while fetching detailed view data")})
      },[id])


    return (<>
        {loadingMode ? <h1>Lading data {console.log(loadingMode)}</h1> :
        <>
        <TweetItem post = {tweet} deleteTweet={() => null} retweetTweet={() => null} hideAction detailView/>
        <div className="d-flex justify-content-center">
        <button className="btn-primary btn-lg" onClick={() => navigate(-1)}>Back</button>
        </div>
        </>}
        </>
    )
}

export default DetailViewPage