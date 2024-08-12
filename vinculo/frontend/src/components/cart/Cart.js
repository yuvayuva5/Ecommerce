import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';

export default function Cart() {
  const { items } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    if (item.quantity < item.stock) {
      dispatch(increaseCartItemQty(item.product, item.size));
    }
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseCartItemQty(item.product, item.size));
    }
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  const containerStyle = {
    marginTop: '60px', // Adjust based on header height
    marginBottom: '60px', // Adjust based on footer height
    minHeight: 'calc(100vh - 120px)', // Adjust based on header and footer height
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
  };

  const cartItemStyle = {
    borderBottom: '1px solid #dee2e6',
    paddingBottom: '15px',
    marginBottom: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#102C57',
    borderColor: '#102C57',
  };

  return (
    <Fragment>
      <div style={containerStyle}>
        {items.length === 0 ? (
          <h2 className="mt-5 text-center">Your Cart is Empty</h2>
        ) : (
          <Fragment>
            <h2 className="mt-5 text-center">Your Cart: <b>{items.length} items</b></h2>
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {items.map(item => (
                  <Fragment key={`${item.product}_${item.size}`}>
                    <div style={cartItemStyle}>
                      <div className="row align-items-center">
                        <div className="col-4 col-lg-3">
                          <img src={item.image} alt={item.name} className="img-fluid" />
                        </div>

                        <div className="col-8 col-lg-3">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <p>Size: {item.size}</p>
                        </div>

                        <div className="col-6 col-lg-2 mt-2 mt-lg-0 price">
                          <p id="card_item_price"> ₹{item.price}</p>
                        </div>

                        <div className="col-6 col-lg-4 mt-2 mt-lg-0 cart-count">
                          <div className="d-flex justify-content-center justify-content-lg-start align-items-center">
                            <button
                              className="btn minus  customsize1"
                              // style={buttonStyle}
                              onClick={() => decreaseQty(item)}
                            >
                              -
                            </button>
                            <input type="number" className="form-control count d-inline mx-2" value={item.quantity} readOnly />
                            <button
                              className="btn plus customsize"
                              // style={buttonStyle}
                              onClick={() => increaseQty(item)}
                            >
                              +
                            </button>
                            <i
                              id="delete_cart_item"
                              onClick={() => dispatch(removeItemFromCart(item.product, item.size))}
                              className="fa fa-trash btn btn-danger ml-2"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <hr />
              </div>

              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary" className="text-center text-lg-left">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>Subtotal: <span className="order-summary-values">{items.reduce((acc, item) => (acc + item.quantity), 0)} (Units)</span></p>
                  <p>Est. total: <span className="order-summary-values"> ₹{items.reduce((acc, item) => (acc + item.quantity * item.price), 0)}</span></p>
                  <hr />
                  <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                </div>
              </div>
            </div>   
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}