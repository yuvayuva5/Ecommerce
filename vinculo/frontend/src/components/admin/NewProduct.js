import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [color, setColor] = useState("");
    const [sizes, setSizes] = useState([]);
    const [sizeInput, setSizeInput] = useState("");

    const { loading, isProductCreated, error } = useSelector(state => state.productState);

    const categories = [
        'Boys', 'Girls', 'Infants'
    ];

    const sizeOptions = [
        'S', 'M', 'L', 'XL', 'XXL'
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const addSize = () => {
        if (sizeInput && !sizes.includes(sizeInput)) {
            setSizes([...sizes, sizeInput]);
            setSizeInput(""); // Clear the input field after adding
        }
    };

    const removeSize = (sizeToRemove) => {
        setSizes(sizes.filter(size => size !== sizeToRemove));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('seller', seller);
        formData.append('category', category);
        formData.append('color', color);
        sizes.forEach(size => formData.append('sizes', size));
        images.forEach(image => formData.append('images', image));

        dispatch(createNewProduct(formData));
    };

    useEffect(() => {
        if (isProductCreated) {
            toast('Product Created Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            });
            navigate('/admin/products');
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()); }
            });
        }
    }, [isProductCreated, error, dispatch, navigate]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="8"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    onChange={e => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="color_field">Color</label>
                                <input
                                    type="text"
                                    id="color_field"
                                    className="form-control"
                                    onChange={e => setColor(e.target.value)}
                                    value={color}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sizes_field">Sizes</label>
                                <div className="d-flex align-items-center">
                                    <select
                                        id="sizes_field"
                                        className="form-control mr-2"
                                        style={{ flex: '1' }} // Adjust width of select input
                                        value={sizeInput}
                                        onChange={e => setSizeInput(e.target.value)}
                                    >
                                        <option value="">Select Size</option>
                                        {sizeOptions.map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={addSize}
                                    >
                                        Add Size
                                    </button>
                                </div>
                                <div className="mt-2">
                                    {sizes.length > 0 && (
                                        <ul className="list-unstyled">
                                            {sizes.map(size => (
                                                <li key={size} className="d-flex justify-content-between align-items-center">
                                                    {size}
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm ml-2"
                                                        onClick={() => removeSize(size)}
                                                    >
                                                        &times;
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>Images</label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onImagesChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.map(image => (
                                    <img
                                        className="mt-3 mr-2"
                                        key={image}
                                        src={image}
                                        alt="Image Preview"
                                        width="55"
                                        height="52"
                                    />
                                ))}
                            </div>

                            <button
                                id="login_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3"
                            >
                                CREATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
