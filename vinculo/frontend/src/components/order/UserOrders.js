import { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const { userOrders = [] } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersAction);
    }, [dispatch]);

    const setOrders = () => {
        const data = {
            columns: [
                { label: "Order ID", field: 'id', sort: "asc" },
                { label: "Number of Items", field: 'numOfItems', sort: "asc" },
                { label: "Amount", field: 'amount', sort: "asc" },
                { label: "Status", field: 'status', sort: "asc" },
                { label: "Actions", field: 'actions', sort: "asc" }
            ],
            rows: []
        };

        userOrders.forEach(userOrder => {
            data.rows.push({
                id: userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: `$${userOrder.totalPrice}`,
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered')
                    ? (<p style={{ color: 'green' }}>{userOrder.orderStatus}</p>)
                    : (<p style={{ color: 'red' }}>{userOrder.orderStatus}</p>),
                actions: (
                    <Link to={`/order/${userOrder._id}`} className="btn btn-primary">
                        <i className='fa fa-eye'></i>
                    </Link>
                )
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <div style={styles.wrapper}>
                <div style={styles.content}>
                    <h1>My Orders</h1>
                    <div style={styles.tableWrapper}>
                        <MDBDataTable
                            bordered
                            striped
                            hover
                            data={setOrders()}
                            responsive
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '80px',  // Adjust this if your header is of different height
        paddingBottom: '80px', // Adjust this if your footer is of different height
    },
    content: {
        flex: 1,
        padding: '1rem',
    },
    tableWrapper: {
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
    },
};

// Add responsive styling using CSS
const stylesCSS = `
    @media (max-width: 768px) {
        .table-responsive {
            overflow-x: auto;
        }
        .table-responsive::-webkit-scrollbar {
            display: none;
        }
        .btn-primary {
            font-size: 0.8rem;
            padding: 0.5rem 0.75rem;
        }
        h1 {
            font-size: 1.5rem;
            text-align: center;
        }
        .mdb-datatable thead th {
            font-size: 0.875rem;
        }
        .mdb-datatable tbody td {
            font-size: 0.875rem;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesCSS;
document.head.appendChild(styleSheet);
