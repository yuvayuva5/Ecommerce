import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import Carousel from 'react-bootstrap/Carousel';
import Header from './layouts/Header'; // Assuming you have a Header component
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(null, null, null, null, currentPage))
    }, [error, dispatch, currentPage])

    return (
        <Fragment>

            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <Carousel className="custom-carousel">
                        <Carousel.Item>
                            <img
                                className="d-block w-100 caro-image"
                                src="images/caro1.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 caro-image"
                                src="images/caro2.png"
                                alt="Second slide" 
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 caro-image"
                                src="images/caro3.png"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <center>
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-12 mb-5">
                                    <h1 id="products_heading "className="categories">Categories</h1>

                                    <div className="image-container">
                                        <img
                                            src="/images/girl.jpg"
                                            alt="Girls Category"
                                        />
                                        <Link to="/girls">
                                            <div className="label" >Girls</div>
                                        </Link>
                                    </div>

                                    <div className="image-container">
                                        <img
                                            src="/images/boys.jpg"
                                            alt="Boys Category"
                                        />
                                        <Link to="/boys">
                                            <div className="label">Boys</div>
                                        </Link>
                                    </div>

                                    <div className="image-container">
                                        <img
                                            src="/images/infant.jpg"
                                            alt="Infants Category"
                                        />
                                        <Link to="/infant">
                                        <div className="label">Infant</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </center>



                    <h1 id="products_heading" className="categories">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row ">
                            {products && products.map(product => (
                                <Product col={3} key={product._id} product={product} />
                            ))}
                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5 ">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div> : null}
                </Fragment>
            }
        </Fragment>
    )
}