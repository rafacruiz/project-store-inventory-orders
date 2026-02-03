import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { ButtonBack } from '../../../ui';
import * as ShopManager from '../../../../services/shopManager-service';
import toast from "react-hot-toast";

const category = [
    { value: 'Fruit', label: 'Fruit'},
    { value: 'Vegetable', label: 'Vegetable'}
]

const validations = {
    skuProduct: { required: 'Sku is required' },
    nameProduct: { required: 'Name is required' },
    categoryProduct: { required: 'Category is required' },
    descriptionProduct: { required: 'Description is required'},
};

function ProductAdd () {

    const navigate = useNavigate();

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
            borderColor: errors.categoryProduct
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
            await ShopManager.setProductCreate(data);
            reset();
            navigate('/products');
        } catch (error) {
            if ( error.status === 400) {
                const message = error?.message || 'Bad Request';
                console.error(message);
                toast.error(message);
            } else {
                console.error(error || 'Unexpected error');
            }
        }
    };

    return (
        <>
            <form onSubmit={ handleSubmit(onSubmit) } className="d-flex flex-column py-2 gap-3">
                <div className="form-floating">
                    <input 
                        type="number" 
                        className={`form-control ${errors.skuProduct ? 'is-invalid' : ''}`}
                        id="skuProduct" 
                        placeholder="Sku" 
                        {...register('skuProduct', validations.skuProduct)} />
                    {errors.skuProduct && (<div className="invalid-feedback">{errors.skuProduct.message}</div>)}
                    <label>Sku Product</label>
                </div>

                <div className="form-floating">
                    <input 
                        type="text" 
                        className={`form-control ${errors.nameProduct ? 'is-invalid' : ''}`}
                        id="nameProduct" 
                        placeholder="Name" 
                        {...register('nameProduct', validations.nameProduct)} />
                    {errors.nameProduct && (<div className="invalid-feedback">{errors.nameProduct.message}</div>)}
                    <label>Name Product</label>
                </div>

                <div className="form-floating">
                    <Controller 
                        name="categoryProduct"
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
                    {errors.categoryProduct && (<div className="invalid-feedback d-block">{errors.categoryProduct.message}</div>)}
                </div>
                
                <div className="form-floating">
                    <textarea 
                        className={`form-control ${errors.descriptionProduct ? 'is-invalid' : ''}`}
                        placeholder="Leave a description here" 
                        id="descriptionProduct"
                        {...register('descriptionProduct', validations.descriptionProduct)} >
                    </textarea>
                    {errors.descriptionProduct && (<div className="invalid-feedback">{errors.descriptionProduct.message}</div>)}
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