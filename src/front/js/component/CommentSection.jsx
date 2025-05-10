import React,{useContext,useState,useEffect} from "react"
import CommentCard from '../component/CommentCard.jsx'
import { Context } from "../store/appContext.js";

const CommentSection = ({ freelance_id }) => {
    const { store, actions } = useContext(Context)
    const [data, setData] = useState({});
    const [isLoading,setIsLoading]=useState(true)
 
    useEffect(()=>{
     actions.getAllComments(freelance_id)
     .then((res)=>{
     
       setData(res.result)
     })
     .finally(()=>{
        setIsLoading(false)
     })
    },[])

    if (isLoading==false) {

        return (<div className='my-2 px-2 py-3 rounded-2 bg-white d-flex justify-content-center align-items-center container-fluid flex-column gap-2'>
            <h4>
                Comentarios.
            </h4>
            <hr />
            {
                data?.length !== 0 ?
                data?.map(({ author_full_name, id, stars, author_img_url,text }) => <CommentCard key={id} text={text} userName={author_full_name} img_url={author_img_url} stars={stars} />)
            :
            <h5>No hay comentarios</h5>
            }

        </div>)

    } else {
        return (
            <div className='my-2 px-2 py-3 rounded-2 bg-white d-flex justify-content-center align-items-center container-fluid flex-column gap-2'>
                <h5>No hay comentarios</h5>
                <hr />

            </div>
        )

    }


}

export default CommentSection