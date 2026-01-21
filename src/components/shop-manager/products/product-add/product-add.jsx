import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { ButtonBack } from '../../../ui';
import * as ShopManager from '../../../../services/shopManager-services';


function ProductAdd () {

    const navigate = useNavigate();

    const validations = {
        NameProduct: { required: 'Name is required' },
        CategoryProduct: { required: 'Category is required' },
        DescriptionProduct: { required: 'Description is required'},
    };

    const category = [
        { value: 'Fruit', label: 'Fruit'},
        { value: 'Vegetable', label: 'Vegetable'}
    ]

    const { register, 
            handleSubmit,
            reset,
            control,
            formState: { errors, isValid } 
        } = useForm({ mode: 'all' });

    const selectStyles = {
        menu: (base) => ({
            ...base,
            zIndex: 10,
        }),
        control: (base, state) => ({
            ...base,
            minHeight: '55px',
            borderRadius: '.375rem',
            borderColor: errors.CategoryProduct
            ? '#dc3545'
            : state.isFocused 
            ? '#86b7fe' 
            : '#ced4da',
            boxShadow: state.isFocused
            ? '0 0 0 0.25rem rgba(13,110,253,.25)'
            : 'none',
        }),
    };

    const onSubmit = async (data) => {
        try {
            await ShopManager.setCreateProduct(data);
            reset();
            navigate('/products');
        } catch (error) {
            const { status } = error;
            if ( status === 400) {
                const { message } = error.response?.data || {};
                console.error(message);
            }
        }
    };

    return (<>
            <form onSubmit={ handleSubmit(onSubmit) } className="d-flex flex-column py-2 gap-3">
                <div className="form-floating">
                    <input 
                        type="text" 
                        className={`form-control ${errors.NameProduct ? 'is-invalid' : ''}`}
                        id="NameProduct" 
                        placeholder="Name" 
                        {...register('NameProduct', validations.NameProduct)} />
                    {errors.NameProduct && (<div className="invalid-feedback">{errors.NameProduct.message}</div>)}
                    <label>Name Product</label>
                </div>

                <div className="form-floating">
                    <Controller 
                        name="CategoryProduct"
                        control={ control }
                        defaultValue=""
                        rules={{ required: 'Category is required' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <Select
                                styles={ selectStyles }
                                options={ category }
                                value={ category.find(option => option.value === value) || null }
                                onChange={ option => onChange(option?.value) || '' }
                                placeholder="Select category"
                                onBlur={ onBlur }
                            />
                        )}
                    />
                    {errors.CategoryProduct && (<div className="invalid-feedback d-block">{errors.CategoryProduct.message}</div>)}
                </div>
                
                <div className="form-floating">
                    <textarea 
                        className={`form-control ${errors.DescriptionProduct ? 'is-invalid' : ''}`}
                        placeholder="Leave a description here" 
                        id="DescriptionProduct"
                        {...register('DescriptionProduct', validations.DescriptionProduct)} >
                    </textarea>
                    {errors.DescriptionProduct && (<div className="invalid-feedback">{errors.DescriptionProduct.message}</div>)}
                    <label>Description Product</label>
                </div>

                <div className="form-floating">
                    <input 
                        type="text" 
                        className='form-control'
                        id="ImageProduct" 
                        placeholder="Image Url" 
                        {...register('ImageProduct')} />
                    <label>Image Url Product</label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={!isValid}>Save</button>
                <ButtonBack to={'/products'} />
            </form>
        </>);
}

export default ProductAdd;