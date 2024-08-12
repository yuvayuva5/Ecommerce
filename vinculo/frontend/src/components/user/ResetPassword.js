import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearAuthError } from '../../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const { isAuthenticated, error }  = useSelector(state => state.authState);
    const navigate = useNavigate();
    const { token } = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        
        dispatch(resetPassword(formData, token));
    }

    useEffect(() => {
        if (isAuthenticated) {
            toast('Password Reset Success!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            });
            navigate('/');
            return;
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError()) }
            });
            return;
        }
    }, [isAuthenticated, error, dispatch, navigate]);

    return (
        <div className="app-container">
            <header>
                {/* Header content */}
            </header>
            <main className="content">
                <div className="row wrapper">
                    <div className="col-12 col-md-10 col-lg-6" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <form onSubmit={submitHandler} className="shadow-lg">
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/6357/6357048.png"
                                alt="Visual Aid"
                                className="form-image"
                            />
                            <h1 className="mb-3">New Password</h1>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm_password_field">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                />
                            </div>

                            <div className="form-submit"   style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    id="new_password_button"
                                    type="submit"
                                    style={{ 
                                        backgroundColor: '#102C57', 
                                        color: '#fff', 
                                        borderRadius: '20px', 
                                        padding: '10px 20px', 
                                        fontSize: '14px', 
                                        width: '150px',
                                        transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        borderWidth:'0px'
                                    }}
                                    className="btn btn-block"
                                >
                                    Set Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <footer>
                {/* Footer content */}
            </footer>
            <style jsx>{`
                .app-container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }

                main.content {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }

                .wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }

                .col-12, .col-md-10, .col-lg-6 {
                    max-width: 100%;
                    padding: 0 15px;
                }

                .form-image {
                    width: 100px;
                    height: auto;
                }

                .btn {
                    background-color: #102C57;
                    color: #fff;
                    border-radius: 20px;
                    padding: 10px 20px;
                    font-size: 14px;
                    width: 150px;
                    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border-width: 0;
                }

                .btn:hover {
                    background-color: #0A1C3B;
                    transform: scale(1.05);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
                }

                .btn:active {
                    background-color: #102C57;
                    transform: scale(1);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }

                @media (max-width: 768px) {
                    .form-image {
                        width: 80px;
                    }

                    .btn {
                        width: 100%;
                        font-size: 16px;
                        padding: 12px;
                    }

                    .col-12, .col-md-10, .col-lg-6 {
                        padding: 0 10px;
                    }
                }
            `}</style>
        </div>
    )
}
