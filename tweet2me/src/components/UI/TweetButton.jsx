const TweetButton = ({label, onClick}) =>{
    // console.log(props)
    return (
        <button className='btn-primary rounded position-relative bottom-0 end-0 'onClick={onClick}>
            {label}
        </button>
    )
}

export default TweetButton