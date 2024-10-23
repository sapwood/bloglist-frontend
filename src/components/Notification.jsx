const Notification=({message,errorStatus})=>{
    if (message===null){
        return null
    }
    const errorClass = errorStatus ? "correct" : "error"
    return (
        
        <div className={errorClass}>
            {message}
        </div>
    )
}

export default Notification