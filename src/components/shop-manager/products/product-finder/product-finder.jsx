
function ProductFinder ({ onChange }) {

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };

    return (
        <div className="py-2">
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control"
                    id="name-product-finder" 
                    placeholder="Finder products..." 
                    onChange={ handleChange } />
            </div>
        </div>
    );
}

export default ProductFinder;