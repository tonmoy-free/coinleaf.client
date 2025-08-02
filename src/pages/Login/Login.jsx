import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import goolgeIcon from "../../assets/icon/google.png";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import useAxios from '../../hooks/useAxios';
import useUserRole from '../../hooks/useUserRole';


const Login = ({ pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle || 'CoinLeaf | Login'; // default pageTitle
    }, [pageTitle]);

    const { signIn, setUser, user, loading, setLoading, gSignIN } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailPasswordError, setEmailPasswordError] = useState("");
    const axiosInstance = useAxios();
    const { role } = useUserRole();

    useEffect(() => {
        if (user) {
            const destination =
                role === "worker"
                    ? "/dashboard/worker-home"
                    : role === "buyer"
                        ? "/dashboard/buyer-home"
                        : role === "admin"
                            ? "/dashboard/admin-home"
                            : "/";
            navigate(destination);
            console.log("fmf")
        }
    }, [user, role, navigate]);



    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        setEmailError("");
        setPasswordError("");

        let hasError = false;
        if (email == "") {
            setEmailError("***Email input field cannot be null.***");
            hasError = true;
        }
        if (password == "") {
            setPasswordError("***Password input field cannot be null.***");
            hasError = true;
        }

        if (hasError) {
            return;
        }
        // console.log(email, password)
        signIn(email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                // alert("wkj")

                // Get user details from DB
                const res = await axiosInstance.get(`/users/${email}`);
                const dbUser = res.data[0];

                if (!dbUser) {
                    Swal.fire({
                        icon: "error",
                        title: "User Not Found",
                        text: "User record not found in DB.",
                    });
                    return;
                }

                const role = dbUser.role;
                console.log(role)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });


                setLoading(false);
                // If redirected by PrivateRoute -> go back there first
                const destination = location.state ||
                    (dbUser.role === "worker" ? "/dashboard/worker-home" :
                        dbUser.role === "buyer" ? "/dashboard/buyer-home" :
                            dbUser.role === "admin" ? "/dashboard/admin-home" :
                                "/");

                navigate(destination);

                // navigate(location.state || "/dashboard/home");
                // alert("login successfully");


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // alert(errorCode, errorMessage);

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email or Password is wrong.",
                });
                setLoading(false);
            });

    }




    const handleGSingnIn = async () => {
        try {
            const userCredential = await gSignIN();
            const user = userCredential.user;

            const userProfile = {
                email: user.email,
                name: user.displayName,
                photoUrl: user.photoURL,
                role: "worker",
                coins: 10,
                creationTime: new Date().toISOString(),
                lastSignInTime: new Date().toISOString(),
            };

            // Post to backend — will create if needed
            const userRes = await axiosInstance.post('/users/google', userProfile);
            console.log(userRes.data);

            // Fetch full DB user (role may be updated in DB)
            const res = await axiosInstance.get(`/users/${user.email}`);
            const dbUser = res.data[0];

            if (!dbUser) {
                Swal.fire({
                    icon: "error",
                    title: "User Not Found",
                    text: "User record not found in DB.",
                });
                return;
            }

            setUser(user);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            const destination = location.state ||
                (dbUser.role === "worker" ? "/dashboard/worker-home" :
                    dbUser.role === "buyer" ? "/dashboard/buyer-home" :
                        dbUser.role === "admin" ? "/dashboard/admin-home" :
                            "/");

            navigate(destination);

        } catch (err) {
            setLoading(false);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Login failed",
                text: err.message,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }



    return (
        <div className='px-8 md:px-0 lg:px-0 min-h-screen flex justify-center items-center'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-gray-800">
                <div className="card-body">


                    <h2 className='text-center font-bold text-2xl text-primary mt-5 dark:text-white'>Login To Your Account</h2>
                    <form onSubmit={handleLogin} className="fieldset">
                        {/* email */}
                        <label className="label dark:text-white">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        {
                            emailError && <p className="text-red-600">{emailError}</p>
                        }

                        {/* password */}
                        <label className="label dark:text-white">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        {
                            passwordError && <p className="text-red-600">{passwordError}</p>
                        }

                        <div><Link to="/login/forgotPassword" className='hover:underline hover:font-semibold text-secondary'>Forgot password?</Link></div>
                        <button className="btn btn-outline  btn-primary hover:bg-secondary hover:border-secondary mt-4 dark:text-white dark:border-secondary">Login</button>

                    </form>
                    <button type='button' onClick={handleGSingnIn} className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary">
                        <div className='flex justify-center items-center gap-2 '>
                            <img className='w-4 mt-[3px]' src={goolgeIcon} alt="" />
                            <div>Login with Google</div>
                        </div>
                    </button>


                    <p className='text-center mt-5 mb-2 dark:text-white'>Don't have an account ? <Link className='hover:underline hover:font-semibold text-secondary' to="/login/register">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;