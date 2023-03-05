const TweetButton = ({label, onClick}) =>{
    // console.log(props)
    return (
        <button className='btn-outline-primary rounded m-1 btn-md'onClick={onClick}>
            {label}
        </button>
    )
}

export default TweetButton