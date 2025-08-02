import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const ForgotPassword = ({pageTitle}) => {

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Forgot Password'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { restPassword, user, eamilCheckFirebase } = useContext(AuthContext);
    const [handleM, setHandleM] = useState("");
    const [emailError, setEmailError] = useState("");


    const handleForgotPassword = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        // const signInMethods = await eamilCheckFirebase(email);
        setEmailError("");
        setHandleM("");
        if (email == "") {
            setEmailError("***Email input field cannot be null.***");
            return;
        }


        restPassword(email)
            .then(() => {
                // alert("Password reset email sent")
                setHandleM("Password reset email sent")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Password reset email sent Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // alert(errorCode, errorMessage);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email is wrong.If you new register a new account.",
                });
            });

    }
    return (
        <div className='px-8 md:px-0 lg:px-0 min-h-screen flex justify-center items-center'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h2 className='text-center font-bold text-2xl mt-5 text-primary dark:text-secondary'>Forgot Password</h2>
                    <form onSubmit={handleForgotPassword} className="fieldset">
                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" value={user?.email} />
                        {handleM && <p className='text-green-500 font-bold'>{handleM}</p>}
                        {
                            emailError && <p className="text-red-600">{emailError}</p>
                        }

                        <button className="btn btn-outline  btn-secondary mt-4">Send</button>
                    </form>


                    <p className='text-center mt-5 mb-2'>Don't have an account ? <Link className='hover:underline hover:font-bold text-secondary' to="/login/register">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;