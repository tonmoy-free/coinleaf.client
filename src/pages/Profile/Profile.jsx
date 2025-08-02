import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import pimage from "../../assets/icon/profile.png"
import { AuthContext } from '../../provider/AuthProvider';


const Profile = ({ pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle || 'ArtiLeaf | Profile'; // default pageTitle ArtiLeaf
    }, [pageTitle]);

    const { user, upProfile } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [photoUrlError, setPhotoUrlError] = useState("");
    const [success, setSuccess] = useState("");


    useEffect(() => {

    }, [nameError, upProfile, success])


    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;

        if (name == "") {
            setNameError("***Name input field cannot be null.***");
            return;
        }
        if (photoUrl == "") {
            setPhotoUrlError("***Photo URL input field cannot be null.***");
            return;
        }



        upProfile(name, photoUrl)
            .then(() => {
                setNameError("");
                setPhotoUrlError("");
                console.log("Profile updated");
                setSuccess("Profile updated");
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div data-aos="flip-right">
            <div className='px-8 md:px-0 lg:px-0 min-h-[calc(100vh_-_200px)] flex justify-center items-center mb-20 mt-8'>
                <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-gray-800">
                    <div className="card-body">
                        <h2 className='text-center font-bold text-2xl text-primary dark:text-white '>Profile</h2>
                        <div className='flex justify-center items-center '>
                            <div className='flex justify-center items-center border-3 border-secondary rounded-full h-30 w-30 p-1 overflow-hidden ' >
                                {/* <img className='w-full' src={user.photoURL} alt="" /> */}
                                <img className='w-full rounded-full' src={user?.photoURL ? user?.photoURL : pimage} alt="" />
                            </div>
                        </div>


                        <h2 className='text-center font-bold text-xl text-primary dark:text-white'>{user.displayName}</h2>
                        <h2 className='text-center font-semibold text-lg text-primary dark:text-white'>Email : {user?.email}</h2>
                        <form onSubmit={handleUpdateProfile} className="fieldset">
                            <Link to="/editProfile" type='submit' className="btn btn-outline  btn-primary hover:bg-secondary hover:border-secondary mt-4 dark:text-white dark:border-secondary">Edit Profile</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;