const InputWithLabel = (props) => {
    let { id, label, type } = props
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <br></br>
            <input
                id={id}
                type={type}
            />
            <br></br>
            <br></br>
            
        </>
    );
}

export default InputWithLabel;