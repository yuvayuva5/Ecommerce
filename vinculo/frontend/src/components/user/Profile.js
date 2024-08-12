import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaShoppingCart, FaKey, FaPhone, FaAddressCard, FaSignOutAlt } from 'react-icons/fa';
import { logout } from "../../actions/userActions";
import './profile.css'; // Ensure this import is correct

export default function Profile() {
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();

    const styles = {
        profileContainer: {
            backgroundColor: '#f7f7f7',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            paddingTop: '30px', // Adjust based on header height
            paddingBottom: '100px' // Adjust based on footer height
        },
        avatarProfile: {
            position: 'relative',
            display: 'inline-block',
            marginTop: '20px',
            // width: '150px', // Default size for larger screens
            // height: '150px' // Default size for larger screens
        },
        avatarImage: {
            border: '5px solid #fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        },
        card: {
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            padding: '20px'
        },
        header: {
            color: '#333',
            marginTop: '15px'
        },
        paragraph: {
            color: '#666',
            fontSize: '16px'
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            marginTop: '15px',
            textDecoration: 'none',
            padding: '10px',
            color: 'white',
            borderRadius: '5px'
        },
        btnPrimary: {
            backgroundColor: '#102C57',
            border: 'none'
        },
        btnDanger: {
            backgroundColor: '#D4AF37',
            border: 'none'
        },
        icon: {
            marginRight: '8px'
        }
    };

    const handleLogout = () => {
       dispatch(logout);
    };

    return (
        <div style={styles.profileContainer}>
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3 text-center">
                    <figure style={styles.avatarProfile}>
                        <img
                            className="rounded-circle img-fluid"
                            style={styles.avatarImage}
                            src={user.avatar ?? './images/default_avatar.png'}
                            alt=''
                        />
                    </figure>
                    <Link to="/myprofile/update" id="edit_profile" style={{ ...styles.button, ...styles.btnPrimary }} className="btn-block my-5">
                        <FaUserEdit style={styles.icon} /> Edit Profile
                    </Link>
                </div>

                <div className="col-12 col-md-5">
                    <div style={styles.card}>
                        <h5 style={styles.header}>Full Name</h5>
                        <p style={styles.paragraph}>{user.name}</p>

                        <h5 style={styles.header}>Email Address</h5>
                        <p style={styles.paragraph}>{user.email}</p>

                        <h5 style={styles.header}>Phone Number</h5>
                        <p style={styles.paragraph}><FaPhone style={styles.icon} /> {user.phone}</p>

                        <h5 style={styles.header}>Address</h5>
                        <p style={styles.paragraph}><FaAddressCard style={styles.icon} /> {user.address}</p>

                        <h5 style={styles.header}>Joined</h5>
                        <p style={styles.paragraph}>{String(user.createdAt).substring(0, 10)}</p>

                        <Link to="/orders" style={{ ...styles.button, ...styles.btnDanger }} className=" btn-block mt-5">
                            <FaShoppingCart style={styles.icon} /> My Orders
                        </Link>

                        <Link to="/myprofile/update/password" style={{ ...styles.button, ...styles.btnPrimary }} className=" btn-block mt-2">
                            <FaKey style={styles.icon} /> Change Password
                        </Link>
                        
                        <button
                            className="btn-logout btn-block mt-5"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt style={styles.icon} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


