
function InputFinder ({ onChange, inputOption }) {

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };

    return (

        <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
                <i className="fa fa-search text-muted"></i>
            </span>
            <input 
                type="text" 
                className="form-control border-start-0"
                id={`name-${inputOption?.id}-finder`}
                placeholder={ inputOption?.placeholder } 
                onChange={ handleChange } />
        </div>
    );
}

export default InputFinder;