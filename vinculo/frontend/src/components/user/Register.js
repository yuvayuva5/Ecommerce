import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom';

export default function Register() {
    const location = useLocation();
    const [userData, setUserData] = useState({
        name: location.state?.name || "",
        email: location.state?.email || "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        dispatch(register(formData));
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return;
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return;
        }
    }, [error, isAuthenticated, dispatch, navigate]);

    return (
        <div className="row wrapper" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            // backgroundColor: '#ffffff', 
            fontFamily: 'Arial, sans-serif', 
            position: 'relative',
            overflow: 'hidden', // Prevent scrolling
            margin: 0,
            color: '#102C57', // Set default text color
            padding: '0 20px' // Padding for mobile view
        }}>
             <img src="/images/reg.jpg" alt="Side" style={{ 
                position: 'absolute', 
                left: '0', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                width: '300px', 
                height: '200px',
                display: 'none', // Hide image on mobile
                '@media (min-width: 768px)': { // Show image on tablet and desktop
                    display: 'block'
                }
            }} />
            <div className="col-10 col-lg-5" style={{ 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', 
                borderRadius: '1rem', 
                backgroundColor: '#ffffff', 
                padding: '20px', 
                width: '100%', 
                maxWidth: '500px', 
                position: 'relative',
                overflow: 'hidden', // Prevent scrolling within the container
                marginTop: '0', // Ensure container is at the top of the viewport
                '@media (max-width: 767px)': { // Adjust padding and max-width for mobile
                    padding: '10px',
                    maxWidth: '100%'
                }
            }}>
                <form onSubmit={submitHandler} className="shadow-lg form-container" encType='multipart/form-data'  style={{ 
                    backgroundColor: '#ffffff', 
                    color: '#102C57', // Set form text color
                    fontFamily: 'Arial, sans-serif', 
                    borderRadius: '1rem', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
                }}>
                    <h1 className="mb-3" style={{ 
                            color: '#102C57', 
                            fontSize: '2rem', 
                            marginRight: '0', 
                            marginBottom: '10px',
                            '@media (min-width: 768px)': { // Adjust font size and margin for tablet and desktop
                                fontSize: '2.5rem',
                                marginRight: '20px',
                                marginBottom: '0'
                            }
                        }}>Register</h1>

                    <div className="form-group">
                        <label htmlFor="name_field"  style={{ color: '#102C57' }}>Name</label>
                        <input 
                            name='name' 
                            onChange={onChange} 
                            type="text" 
                            id="name_field" 
                            className="form-control input-field" 
                            placeholder="Enter your name"   
                            value={userData.name}
                            style={{ 
                                borderColor: '#102C57', 
                                borderRadius: '0.5rem', 
                                fontFamily: 'Arial, sans-serif', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                transition: 'border-color 0.3s' 
                            }}
                            required
                            onFocus={e => e.target.style.borderColor = '#CFD8DC'}
                            onBlur={e => e.target.style.borderColor = '#102C57'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field" style={{ color: '#102C57' }}>Email</label>
                        <input
                            type="email"
                            id="email_field"
                            name='email'
                            onChange={onChange}
                            className="form-control input-field"
                            placeholder="Enter your email" 
                            value={userData.email}
                            style={{ 
                                borderColor: '#102C57', 
                                borderRadius: '0.5rem', 
                                fontFamily: 'Arial, sans-serif', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                transition: 'border-color 0.3s' 
                            }}
                            required
                            onFocus={e => e.target.style.borderColor = '#CFD8DC'}
                            onBlur={e => e.target.style.borderColor = '#102C57'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_field"  style={{ color: '#102C57' }}>Password</label>
                        <input
                            name='password'
                            onChange={onChange}
                            type="password"
                            id="password_field"
                            className="form-control input-field"
                            placeholder="Enter your password"  style={{ 
                                borderColor: '#102C57', 
                                borderRadius: '0.5rem', 
                                fontFamily: 'Arial, sans-serif', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                transition: 'border-color 0.3s' 
                            }}
                            required
                            minLength="6"
                            onFocus={e => e.target.style.borderColor = '#CFD8DC'}
                            onBlur={e => e.target.style.borderColor = '#102C57'}
                        />
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3 btn-register "
                        disabled={loading} 
                        style={{
                            backgroundColor: '#2a292b',
                            borderColor: '#102C57',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '0.875rem',
                            borderRadius: '1.5rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            color: '#ffffff',
                            transition: 'background-color 0.3s ease',
                            width: '50%', // Reduce button width
                            margin: '0 auto' // Center the button
                        }}
                        onMouseEnter={e => e.target.style.backgroundColor = '#CFD8DC'}
                        onMouseLeave={e => e.target.style.backgroundColor = '#102C57'}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    );
}
