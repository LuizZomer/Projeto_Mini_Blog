import style from "./Post.module.css"

// hooks
import { useParams } from "react-router-dom"
import { useFetchPost } from "../../hooks/useFetchPost"

const Post = () => {

  const {id} = useParams()
  const {document: post, loading} = useFetchPost("posts", id)

  return (
    <div className={style.post_container}>
      {loading && <p>Carregando...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este trata sobre:</h3>
          <div className={style.tags}> 
            {post.tagsArray.map((tag) => (
              <p key={tag}><span>#</span>{tag}</p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post