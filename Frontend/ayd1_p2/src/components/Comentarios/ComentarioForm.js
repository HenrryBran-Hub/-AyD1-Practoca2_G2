import { useState } from "react";

const CometarioForm=({
    handleSubmit,
    submitLabel,
    hasCancelButton=false,
    handleCancel,
    initialText=""
})=>{
    const [text,setText]=useState(initialText);
    const [isHover,setIsHover] =useState(false);
    const isTextareaDisabled= text.length===0;
    const onSubmit=(event)=>{
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }

    const handleMouseEnter=()=>{
        setIsHover(true);
    }

    const handleMouseLeave=()=>{
        setIsHover(false);
    }
    const commentFormTextarea={
        display:"inline-block",
        width:"100%",
        height:"40px",
        marginBotton:"8px",
        marginTop:"8px",
        boder:"2px solid #4CAF50",
        borderColor:"#4CAF50",
        borderRadius:"10px",
        padding:"10px"
    }

    const commentFormButtom={
        display:"inline-block",
        fontSize:"16px",
        padding:"8px 16px",
        backgroundColor:"#f44336",
        borderRadius:"12px",
        textAlign:"center",
        textDecoration:"none",
        border:"none",
        color:"white",
        cursor: isHover ? 'pointer':'default',
        opacity: isHover ? '1':'0.7',
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea 
            style={commentFormTextarea} 
            className="comment-form-textarea" 
            value={text} 
            onChange={(e)=>setText(e.target.value)}
            />
            <button 
            style={commentFormButtom} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="comment-form-button" 
            disabled={isTextareaDisabled}>
            {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                type="button"
                className="comment-form-button comment comment-form-cancel-button"
                onClick={handleCancel}>Cancel</button>
            )}
        </form>
    )
};
export default CometarioForm;