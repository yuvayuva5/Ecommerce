import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector((state) => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phoneNumber); // Changed to match backend schema
        formData.append("address", address);
        formData.append("avatar", avatar);
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phone || ""); // Assuming user.phone is available from backend
            setAddress(user.address || ""); // Assuming user.address is available from backend
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        if (isUpdated) {
            toast("Profile updated successfully", {
                type: "success",
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile()),
            });
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(clearAuthError());
                },
            });
            return;
        }
    }, [user, isUpdated, error, dispatch]);

    const rowwrapper = {
        paddingTop: '30px', // Adjust based on header height
        paddingBottom: '100px' // Adjust based on footer height
    };

    return (
        <div style={rowwrapper} className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
                    <img 
                        src={avatarPreview} // Update src with avatarPreview state
                        alt="Visual Aid" 
                        style={{ width: '100px', height: 'auto', margin: 'auto', display: 'block' }} // Adjust width as needed
                    />
                    <h1 className="mt-2 mb-5" style={{ textAlign: 'center', marginBottom: '20px' }}>Update Profile</h1>

                    <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_field">Phone Number</label>
                        <input
                            type="text"
                            id="phone_field"
                            className="form-control"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength="10" // Ensure phone number length
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address_field">Address</label>
                        <input
                            type="text"
                            id="address_field"
                            className="form-control"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="avatar_upload">Profile</label>
                        <div className="d-flex align-items-center">
                            <div>
                                <figure className="avatar mr-3 item-rtl">
                                    <img
                                        src={avatarPreview}
                                        className="rounded-circle"
                                        alt="Avatar Preview"
                                    />
                                </figure>
                            </div>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="avatar"
                                    className="custom-file-input"
                                    id="customFile"
                                    onChange={onChangeAvatar}
                                />
                                <label className="custom-file-label" htmlFor="customFile">
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button 
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
                                borderWidth: '0px'
                            }}
                            className="btn update-btn btn-block mt-4 mb-3" 
                            onMouseOver={e => {
                                e.target.style.backgroundColor = '#0A1C3B';
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseOut={e => {
                                e.target.style.backgroundColor = '#102C57';
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                            }}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
