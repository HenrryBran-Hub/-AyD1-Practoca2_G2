import React from "react";
import {AiFillStar} from "react-icons/ai"

const Comment=({comment})=>{
    const commenta= {
        display:"flex",
        marginBottom:"28px",
    }
    const commentImageContainer={
        marginRight:"12px"
    }
    const imagen={
        borderRadius:"50px",
        width:"50px",
        height:"50px"
    }
    const commentRightPart={
        width:"100%"
    }
    const commentContent={
        display:"flex"
    }
    const commentAutor={
        marginRight:"8px",
        fontSize:"20px",
        color:"rgb(0, 100, 0)"
    }
    const commentText={
        fontSize:"18px"
    }
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9" 
    };
    const estrellas={
        position:"relative",
        marginTop:"2px"

    }
    return(
        <div style={commenta} className="comment">
            <div style={commentImageContainer} className="comment-image-cointainer">
                <img 
                style={imagen} 
                src={require("../Comentarios/user.png")}
                alt=""
                />
            </div>
            <div style={commentRightPart} className="comment-right-part">
                <div style={commentContent} className="comment-content">
                    <div style={commentAutor} className="comment-autor">{comment.Nombre}</div>
                     <div style={estrellas}> 
                        {
                            [...new Array(5)].map((star,index)=>{
                                return (<AiFillStar                                    
                                    color={index<comment.Punteo ? colors.orange : colors.grey}
                                />)            
                            } )
                        }
                    </div>
                </div>
                <div style={commentText} className="comment-text">{comment.Comentario}</div>
            </div>
        </div>
    )
};
export default Comment;