import { useEffect, useRef } from "react"
import useOnScreen from "./hooks/useOnScreen"

export default function Post(props) {
    const ref = useRef()
    const isVisible = useOnScreen(ref)

    // Check if post is the last post. If it is, and it's visible on the screen, load 10 more posts.
    useEffect(() => {
        if (props.lastPost && isVisible && !props.postLoading) {
            props.get_images()
            console.log(`the last post is ${props.post.title} and it's visible`)
        }
    })

    return (
        <div className="post" ref={ref}>
              {props.post.title}
        </div>
    )
}