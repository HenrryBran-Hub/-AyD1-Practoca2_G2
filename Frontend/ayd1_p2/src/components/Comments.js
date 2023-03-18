import React, { useState,useEffect } from "react";
import Comment from "./Comentarios/Comment";
import {getComments as getCommentApi,createComment as createCommentApi } from './Comentarios/api';
import CometarioForm from "./Comentarios/ComentarioForm";
import { AiFillStar} from "react-icons/ai"
import {inform}from "./Movies"
import {user} from "./LoginForm"
import { Link } from "react-router-dom";


const Comments=({valoros=0})=>{
    const stars=Array(5).fill(0);
    const [backendComments,setBackendComments]=useState([]);
    const [activeComment,setActiveComment] =useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    
    const rootComentarios=backendComments.filter((
        backendComment)=>backendComment.Nombre!==null
    );

    const addComment=async (text)=>{
        console.log('Agregando Comentario',text,currentValue);  
        const formData = {
            "usuario":user.idUser,
            "pelicula":inform.Id_Pelicula,
            "punteo":currentValue,
            "comment":text
        }
        console.log(formData);
        try {
            const response = await fetch('http://localhost:9000/addComment', {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'Application/json'
                },
                body:JSON.stringify(formData)
            });
            const data =await response.json();
            

            createCommentApi(data.Nombre,text,currentValue.toString()).then((comment)=>
            {
                setBackendComments([comment,...backendComments]);
                setActiveComment(null);
            })
            setCurrentValue(0);
            
        } catch (error) {
            alert('nose pudeo realizar la consulta');
            return;
        }

    }
    useEffect(()=>{
        console.log("backendComments",setBackendComments);
        getCommentApi().then((data)=>{
            setBackendComments(data);
        });
    },[]);
    
    var handleClick = value => {
        setCurrentValue(value)

    }
    
    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };
    
    const handleMouseLeave = () => {
       setHoverValue(undefined)
    }

    const comments={
        marginTop:"20px",
        marginLeft:"80px",
        marginRight:"80px"
    }
    const commentsTitle={
        fontSize:"30px",
        marginBottom:"30px",
        //position:"absolute",
        //left:"50px"
    }
    const commentsFormTitle={
        fontSize:"18px"
    }
    const commentsContainer={
        marginTop:"40px"
    }
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
        
    };
    const starts={
        display:"inline",
        flexDirection: "row",
        position:"absolute",
        marginTop:"0px",
        marginLeft:"10px"
    }
    return (
        <div style={comments} className="comments">
           <Link to='/movies'>RETURN</Link>
            <h3 style={commentsTitle} className="comments-title">Comentario {inform.Nombre}</h3>
            <div style={commentsFormTitle} className="comment-form-title">
                Calificame:
                <div style={starts}>
                    {stars.map((_,index)=>{
                        return(
                            <AiFillStar
                                key={index}
                                size={21}
                                onClick={(e) => handleClick(index + 1)}
                                onMouseOver={(e) => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                  }}
                            />
                        )
                    }
                    )}
                </div>
            </div>
            <CometarioForm submitLabel="Comentar" handleSubmit={addComment}/>
            <div style={commentsContainer} className="comments-container">
                {rootComentarios.map((rootComent)=>(
                    <Comment key={rootComent.id} 
                    comment={rootComent}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    />
                ))}
            </div>
        </div>
    )
};
//export {}

export default Comments;