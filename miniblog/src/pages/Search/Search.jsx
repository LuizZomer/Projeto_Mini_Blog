import style from "./Search.module.css"
import { Link } from "react-router-dom"

// hooks 
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useQuery } from "../../hooks/useQuery"

// components 
import PostDetail from "../../components/PostDetail"


const Search = () => {

    const query = useQuery()
    const search = query.get("q")

    const {documents: posts } = useFetchDocument("posts", search)


  return (
    <div className={style.search_container}>
        <h2>Search</h2>
        <div>
          {posts && posts.length === 0 && (
            <div className={style.nopost}>
              <p>Não foram encontrados posts a partir da sua busca...</p>
              <Link to="/" className="btn btn-dark">Voltar</Link>
            </div>
          )}
          {posts && posts.map((post) => (
            <PostDetail key={post.id} post={post}/>
          ))}
        </div>
    </div>
  )
}

export default Search