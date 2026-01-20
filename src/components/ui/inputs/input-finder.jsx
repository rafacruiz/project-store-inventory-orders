
function InputFinder ({ onChange, inputOption }) {

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };

    return (
        <input 
            type="text" 
            className="form-control"
            id={`name-${inputOption.id}-finder`}
            placeholder={ inputOption.placeholder } 
            onChange={ handleChange } />
    );
}

export default InputFinder;