import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';

const Register = ({ pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle || 'CoinLeaf | Register';
    }, [pageTitle]);

    const { createUser, upProfileRegistration, user, loading, setLoading, setUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [error, setError] = useState("");
    const [photoUrlError, setPhotoUrlError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [success, setSuccess] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [photoUrl, setPhotoUrl] = useState();
    const [role, setRole] = useState("worker");
    const axiosInstance = useAxios();

    // useEffect(() => {
    //     if (user && !loading) {
    //         navigate("/");
    //     }
    // }, [user, navigate, loading]);

    useEffect(() => {
        if (user && !loading && location.pathname !== "/register") {
            navigate("/");
        }
    }, [user, navigate, loading, location]);




    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        // const photoUrl = e.target.photoUrl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setNameError("");
        // setPhotoUrlError("");
        setSuccess("");
        setEmailError("");
        setPasswordError("");

        // console.log(name ,email,password,confirmPassword)

        let hasError = false;

        if (name == "") {
            setNameError("***Name input field cannot be null.***");
            hasError = true;
        }
        if (!photoUrl) {
            setPhotoUrlError("***Photo URL input field cannot be null.***");
            hasError = true;
        }
        if (email == "") {
            setEmailError("***Email input field cannot be null.***");
            hasError = true;
        }
        if (password == "") {
            setPasswordError("***Password input field cannot be null.***");
            hasError = true;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError("***Password must contain at least one uppercase letter.***");
            hasError = true;
        } else if (!/[a-z]/.test(password)) {
            setPasswordError("***Password must contain at least one lowercase letter.***");
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError("***Password must be 6 or more characters.***");
            hasError = true;
        }

        if (hasError) {
            return;
        }
        try {
            const userCredential = await createUser(email, password)

            console.log(userCredential.user);
            const user = userCredential.user;

            // toast("Registration Successful.")
            // Update user profile in firebase 
            await upProfileRegistration(user, name, photoUrl);
            setUser({
                ...user,
                displayName: name,
                photoURL: photoUrl
            });

            // Coin Allocation
            const coins = role === "buyer" ? 50 : 10;

            const userProfile = {
                email: email.toLowerCase(),
                name,
                photoUrl,
                role,
                coins,
                // creationTime: user?.metadata?.creationTime,
                // lastSignInTime: user?.metadata?.lastSignInTime
                creationTime: new Date().toISOString(),
                lastSignInTime: new Date().toISOString(),
            }

            //save user info in db
            const userRes = await axiosInstance.post('/users', userProfile);
            console.log(userRes.data);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Successful.",
                showConfirmButton: false,
                timer: 1500
            });

            // navigate(`${location.state ? location.state : "/dashboard/home"}`);

            const destination = location.state ||
                (role === "worker" ? "/dashboard/worker-home" :
                    role === "buyer" ? "/dashboard/buyer-home" :
                        role === "admin" ? "/dashboard/admin-home" :
                            "/");

            navigate(destination);

        } catch (err) {
            setLoading(false)
            if (err.code === "auth/email-already-in-use") {
                setError("Email is already registered");

                console.log('if', err)
                Swal.fire({
                    position: "top-end",
                    icon: "error", // ✅ use a valid icon
                    title: "Email already in use",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                setError("Registration failed");
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Registration failed",
                    text: err.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();   //Javascript ar direct code
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`


        const res = await axios.post(imageUploadUrl, formData)

        setPhotoUrl(res.data.data.url)
    }


    return (
        // <div className=' min-h-[calc(100vh_-_200px)] flex justify-center items-center'>
        <div className='px-8 md:px-0 lg:px-0 min-h-screen flex justify-center items-center'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-gray-800">
                <div className="card-body">


                    <h2 className='text-center font-bold text-2xl text-primary mt-5 dark:text-white'>Create an account</h2>
                    <form onSubmit={handleRegister} className="fieldset">
                        {/* Full Name */}
                        <label className="label dark:text-white">Name</label>
                        <input type="text" name='name' className="input" placeholder="First Name" />
                        {
                            nameError && <p className="text-red-600">{nameError}</p>
                        }

                        {/* Photo URL */}
                        {/* <label className="label dark:text-white">Photo URL</label>
                        <input type="text" name='photoUrl' className="input" placeholder="Photo url" />
                        {
                            photoUrlError && <p className="text-red-600">{photoUrlError}</p>
                        } */}


                        {/* image field */}
                        <label className="label dark:text-white">Photo</label>
                        <input type="file"
                            onChange={handleImageUpload}
                            className="input"

                            placeholder="Your Profile Picture" />

                        <img src={photoUrl} alt="" className='w-50' />
                        {
                            photoUrlError && <p className="text-red-600">{photoUrlError}</p>
                        }


                        {/* email */}
                        <label className="label dark:text-white">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input"
                            placeholder="Email"
                            onChange={() => setError("")}
                        />
                        {
                            emailError && <p className="text-red-600">{emailError}</p>
                        }

                        {/* password */}
                        <label className="label dark:text-white">Password</label>
                        <input
                            type="password"
                            name='password'
                            className="input"
                            placeholder="Password"
                            onChange={() => setError("")}
                        />
                        {
                            passwordError && <p className="text-red-600">{passwordError}</p>
                        }

                        <label className="label dark:text-white">Select Role</label>
                        <select onChange={(e) => setRole(e.target.value)} className="select select-bordered w-full">
                            <option value="worker">Worker</option>
                            <option value="buyer">Buyer</option>
                        </select>

                        {/* ConfirmPassword */}
                        {/* <label className="label">Confirm Password</label>
                        <input type="password" name='confirmPassword' className="input" placeholder="Confirm Password" /> */}

                        {error && (
                            <p className="text-sm mt-2 px-2 py-1 bg-red-100 text-red-700 border border-red-400 rounded">
                                {error}
                            </p>
                        )}

                        <button type='submit' className="btn btn-outline  btn-primary hover:bg-secondary hover:border-secondary mt-4 dark:text-white dark:border-secondary">Create an account</button>
                    </form>
                    <p className='text-center mt-5 mb-2 dark:text-white'>Already have an account ? <Link className='hover:underline hover:font-bold text-secondary' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;