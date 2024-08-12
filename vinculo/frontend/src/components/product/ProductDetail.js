// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createReview, getProduct } from "../../actions/productActions";
// import Loader from '../layouts/Loader';
// import { Carousel, Modal, Button } from 'react-bootstrap';
// import MetaData from "../layouts/MetaData";
// import { addCartItem } from "../../actions/cartActions";
// import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
// import { toast } from "react-toastify";
// import ProductReview from "./ProductReview";
// import boysSizeChart from "./boys.jpeg";
// import girlsSizeChart from "./girls.png";
// import infantSizeChart from "./infant.png";

// export default function ProductDetail() {
//     const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
//     const { user } = useSelector(state => state.authState);
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState("");

//     const increaseQty = () => {
//         if (quantity < product.stock) setQuantity(quantity + 1);
//     };

//     const decreaseQty = () => {
//         if (quantity > 1) setQuantity(quantity - 1);
//     };

//     const [showReviewModal, setShowReviewModal] = useState(false);
//     const handleReviewModalClose = () => setShowReviewModal(false);
//     const handleReviewModalShow = () => setShowReviewModal(true);

//     const [showSizeChartModal, setShowSizeChartModal] = useState(false);
//     const handleSizeChartModalClose = () => setShowSizeChartModal(false);
//     const handleSizeChartModalShow = () => setShowSizeChartModal(true);

//     const [rating, setRating] = useState(1);
//     const [comment, setComment] = useState("");

//     const reviewHandler = () => {
//         const formData = new FormData();
//         formData.append('rating', rating);
//         formData.append('comment', comment);
//         formData.append('productId', id);
//         dispatch(createReview(formData));
//     };

//     useEffect(() => {
//         if (isReviewSubmitted) {
//             handleReviewModalClose();
//             toast.success('Review Submitted successfully', {
//                 position: toast.POSITION.BOTTOM_CENTER,
//             });
//             dispatch(clearReviewSubmitted());
//         }
//         if (error) {
//             toast.error(error, {
//                 position: toast.POSITION.BOTTOM_CENTER,
//             });
//             dispatch(clearError());
//         }
//         dispatch(getProduct(id));

//         return () => {
//             dispatch(clearProduct());
//         };
//     }, [dispatch, id, isReviewSubmitted, error]);

//     const getSizeChart = (category) => {
//         switch (category) {
//             case 'Boys':
//                 return boysSizeChart;
//             case 'Girls':
//                 return girlsSizeChart;
//             case 'Infants':
//                 return infantSizeChart;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Fragment>
//             {loading ? <Loader /> : (
//                 <Fragment>
//                     <MetaData title={product.name} />
//                     <div className="row f-flex justify-content-around">
//                         <div className="col-12 col-lg-6 img-fluid" id="product_image">
//                             <Carousel pause="hover">
//                                 {product.images && product.images.map(image => (
//                                     <Carousel.Item key={image._id}>
//                                         <img className="d-block w-100" src={image.image} alt={product.name} height="500" width="500" />
//                                     </Carousel.Item>
//                                 ))}
//                             </Carousel>
//                         </div>

//                         <div className="col-12 col-lg-6 mt-5">
//                             <div className="d-flex flex-column justify-content-between h-100">
//                                 <div>
//                                     <h3>{product.name}</h3>
//                                     <p id="product_id">Product # {product._id}</p>

//                                     <hr />

//                                     <div className="rating-outer">
//                                         <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
//                                     </div>
//                                     <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

//                                     <hr />

//                                     <p id="product_price">${product.price}</p>

//                                     <div className="stockCounter d-inline">
//                                         <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
//                                         <input type="number" className="form-control count d-inline" value={quantity} readOnly />
//                                         <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         id="cart_btn"
//                                         disabled={product.stock === 0 || !selectedSize}
//                                         onClick={() => {
//                                             if (!selectedSize) {
//                                                 toast.error("Please select a size", {
//                                                     position: toast.POSITION.BOTTOM_CENTER,
//                                                 });
//                                                 return;
//                                             }
//                                             dispatch(addCartItem(product._id, quantity, selectedSize));
//                                             toast.success('Cart Item Added!', {
//                                                 position: toast.POSITION.BOTTOM_CENTER,
//                                             });
//                                         }}
//                                         className="btn btn-primary d-inline ml-4"
//                                     >
//                                         Add to Cart
//                                     </button>
//                                     <hr />

//                                     <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

//                                     <hr />

//                                     <h4 className="mt-2">Description:</h4>
//                                     <p>{product.description}</p>
//                                     <hr />
//                                     <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

//                                     <div className="d-flex align-items-center justify-content-between mb-3">
//                                         {product.color && (
//                                             <div className="product-color">
//                                                 <h4>Available Color</h4>
//                                                 <p>{product.color}</p>
//                                             </div>
//                                         )}

//                                         {product.category && (
//                                             <Button variant="info" onClick={handleSizeChartModalShow}>
//                                                 View Size Chart
//                                             </Button>
//                                         )}
//                                     </div>

//                                     {product.sizes && product.sizes.length > 0 && (
//                                         <div className="product-sizes mb-3">
//                                             <h4>Available Sizes</h4>
//                                             <div>
//                                                 {product.sizes.map(size => (
//                                                     <button
//                                                         key={size}
//                                                         className={`btn ${selectedSize === size ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
//                                                         onClick={() => setSelectedSize(size)}
//                                                     >
//                                                         {size}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="mt-auto">
//                                     {user ? (
//                                         <button onClick={handleReviewModalShow} id="review_btn" type="button" className="btn btn-primary mt-4">
//                                             Submit Your Review
//                                         </button>
//                                     ) : (
//                                         <div className="alert alert-danger mt-5">Login to Post Review</div>
//                                     )}
//                                 </div>
//                             </div>

//                             <Modal show={showReviewModal} onHide={handleReviewModalClose}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Submit Review</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <ul className="stars">
//                                         {[1, 2, 3, 4, 5].map(star => (
//                                             <li
//                                                 value={star}
//                                                 onClick={() => setRating(star)}
//                                                 className={`star ${star <= rating ? 'orange' : ''}`}
//                                                 onMouseOver={(e) => e.target.classList.add('yellow')}
//                                                 onMouseOut={(e) => e.target.classList.remove('yellow')}
//                                                 key={star}
//                                             ><i className="fa fa-star"></i></li>
//                                         ))}
//                                     </ul>

//                                     <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3"></textarea>
//                                     <button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white">Submit</button>
//                                 </Modal.Body>
//                             </Modal>

//                             <Modal show={showSizeChartModal} onHide={handleSizeChartModalClose}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Size Chart</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <img src={getSizeChart(product.category)} alt={`${product.category} size chart`} className="img-fluid" />
//                                 </Modal.Body>
//                             </Modal>
//                         </div>
//                     </div>

//                     {product.reviews && product.reviews.length > 0 ? <ProductReview reviews={product.reviews} /> : null}
//                 </Fragment>
//             )}
//         </Fragment>
//     );
// }


import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import Loader from '../layouts/Loader';
import { Carousel, Modal, Button } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import boysSizeChart from "./boys.jpeg";
import girlsSizeChart from "./girls.png";
import infantSizeChart from "./infant.png";

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");

    const increaseQty = () => {
        if (quantity < product.stock) setQuantity(quantity + 1);
    };

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleReviewModalClose = () => setShowReviewModal(false);
    const handleReviewModalShow = () => setShowReviewModal(true);

    const [showSizeChartModal, setShowSizeChartModal] = useState(false);
    const handleSizeChartModalClose = () => setShowSizeChartModal(false);
    const handleSizeChartModalShow = () => setShowSizeChartModal(true);

    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData));
    };

    useEffect(() => {
        if (isReviewSubmitted) {
            handleReviewModalClose();
            toast.success('Review Submitted successfully', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            dispatch(clearReviewSubmitted());
        }
        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            dispatch(clearError());
        }
        dispatch(getProduct(id));

        return () => {
            dispatch(clearProduct());
        };
    }, [dispatch, id, isReviewSubmitted, error]);

    const getSizeChart = (category) => {
        switch (category) {
            case 'Boys':
                return boysSizeChart;
            case 'Girls':
                return girlsSizeChart;
            case 'Infants':
                return infantSizeChart;
            default:
                return null;
        }
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-6 img-fluid" id="product_image">
                            <Carousel pause="hover">
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image._id}>
                                        <img className="d-block w-100" src={image.image} alt={product.name} height="500" width="500" />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-6 mt-5">
                            <div className="d-flex flex-column justify-content-between h-100">
                                <div>
                                    <h3>{product.name}</h3>
                                    <p id="product_id">Product # {product._id}</p>

                                    <hr />

                                    <div className="rating-outer">
                                        <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                                    </div>
                                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                                    <hr />

                                    <p id="product_price"> ₹{product.price}</p>

                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus min-but" onClick={decreaseQty}>-</span>
                                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                                        <span className="btn btn-primary plus add-but" onClick={increaseQty}>+</span>
                                    </div>
                                    <button
                                        type="button"
                                        id="cart_btn"
                                        disabled={product.stock === 0}
                                        onClick={() => {
                                            if (!selectedSize) {
                                                toast.error("Please select the size to proceed further", {
                                                    position: toast.POSITION.BOTTOM_CENTER,
                                                });
                                                return;
                                            }
                                            dispatch(addCartItem(product._id, quantity, selectedSize));
                                            toast.success('Cart Item Added!', {
                                                position: toast.POSITION.BOTTOM_CENTER,
                                            });
                                        }}
                                        className="btn btn-primary d-inline ml-4 atc-but "
                                    >
                                        Add to Cart
                                    </button>
                                    <hr />

                                    <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                                    <hr />

                                    <h4 className="mt-2">Description:</h4>
                                    <p>{product.description}</p>
                                    <hr />
                                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        {product.color && (
                                            <div className="product-color">
                                                <h4>Available Color</h4>
                                                <p>{product.color}</p>
                                            </div>
                                        )}

                                        {product.category && (
                                            <Button variant="info" onClick={handleSizeChartModalShow}>
                                                View Size Chart
                                            </Button>
                                        )}
                                    </div>

                                    {product.sizes && product.sizes.length > 0 && (
                                        <div className="product-sizes mb-3">
                                            <h4>Available Sizes</h4>
                                            <div>
                                                {product.sizes.map(size => (
                                                    <button
                                                        key={size}
                                                        className={`btn ${selectedSize === size ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                                                        onClick={() => setSelectedSize(size)}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto">
                                    {user ? (
                                        <button onClick={handleReviewModalShow} id="review_btn" type="button" className="btn btn-primary mt-4">
                                            Submit Your Review
                                        </button>
                                    ) : (
                                        <div className="alert alert-danger mt-5">Login to Post Review</div>
                                    )}
                                </div>
                            </div>

                            <Modal show={showReviewModal} onHide={handleReviewModalClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul className="stars">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <li
                                                value={star}
                                                onClick={() => setRating(star)}
                                                className={`star ${star <= rating ? 'orange' : ''}`}
                                                onMouseOver={(e) => e.target.classList.add('yellow')}
                                                onMouseOut={(e) => e.target.classList.remove('yellow')}
                                                key={star}
                                            ><i className="fa fa-star"></i></li>
                                        ))}
                                    </ul>

                                    <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3"></textarea>
                                    <button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white">Submit</button>
                                </Modal.Body>
                            </Modal>

                            <Modal show={showSizeChartModal} onHide={handleSizeChartModalClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Size Chart</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <img src={getSizeChart(product.category)} alt={`${product.category} size chart`} className="img-fluid" />
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>

                    {product.reviews && product.reviews.length > 0 ? <ProductReview reviews={product.reviews} /> : null}
                </Fragment>
            )}
        </Fragment>
    );
}
