import { useEffect, useRef, useState } from "react"
import useOnScreen from "./hooks/useOnScreen"

export default function Post(props) {
    const ref = useRef()
    const isVisible = useOnScreen(ref)
    const [showDescription, set_showDescription] = useState(false)
    const [postLiked, set_postLiked] = useState(false)

    // Check if post is the last post. If it is, and it's visible on the screen, load 10 more posts.
    useEffect(() => {
        if (props.lastPost && isVisible && !props.postLoading) {
            props.get_images()
        }
    })

    return (
        <div className="post" ref={ref}>
            <img className="post__image" src={props.post.url} alt={props.post.title} />
            
            <div className="post__info">
                <p className="post__info__date">{props.post.date}</p>
                <h2 className="post__info__header">{props.post.title}</h2>

                <div className="post__info__btnContainer">
                    <button className="btn-primary" onClick={() => set_showDescription(!showDescription)}>
                        {showDescription? "Hide": "Show"} Description
                    </button>
                </div>

                {showDescription &&
                    <div className="post__info__description">
                        {props.post.explanation}
                    </div>
                }
            </div>
            
            <div className="heart-icon" onClick={() => set_postLiked(!postLiked)}>
                <i className={postLiked? "fas fa-heart": "far fa-heart"}></i>
            </div>
        </div>
    )
}