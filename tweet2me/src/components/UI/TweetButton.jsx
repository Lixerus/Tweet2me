const TweetButton = ({label, onClick}) =>{
    // console.log(props)
    return (
        <button className='btn-primary rounded'onClick={onClick}>
            {label}
        </button>
    )
}

export default TweetButton