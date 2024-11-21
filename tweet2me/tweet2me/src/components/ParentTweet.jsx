import TweetItem from "./TweetItem"

const ParentTweet = ({post}) =>{
    return post.parent ? <TweetItem post={post.parent} key={post.parent.id} isRetweet hideAction/> : null
  }

export default ParentTweet