import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import pimage from "../../assets/icon/profile.png"

import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import useAxios from '../../hooks/useAxios';

const EditProfile = ({ pageTitle }) => {
    const { user, upProfile, previewUrl, setPreviewUrl } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [photoUrlError, setPhotoUrlError] = useState("");
    const [success, setSuccess] = useState("");
    const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();
    const [imageFile, setImageFile] = useState(null);
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    useEffect(() => {
        document.title = pageTitle || 'CoinLeaf | Edit Profile'; // default pageTitle ArtiLeaf
    }, [pageTitle]);


    useEffect(() => {

    }, [nameError, upProfile, success, user?.displayName, Swal]);


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;

        if (name === "") {
            setNameError("***Name input field cannot be null.***");
            return;
        }

        try {
            let finalPhotoUrl = user?.photoURL;

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
                const res = await axiosInstance.post(imageUploadUrl, formData);
                finalPhotoUrl = res.data.data.url;
            }

            console.log("Using Photo URL:", finalPhotoUrl);

            //  Firebase update (name + photo)
            await upProfile(name, finalPhotoUrl);

            //  DB update
            const updatedUser = {
                name: name,
                photoUrl: finalPhotoUrl,
                lastSignInTime: new Date().toISOString(),
            };

            await axiosSecure.put(`/users/${user.email}`, updatedUser);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile Updated Successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            setNameError("");
            setPhotoUrlError("");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='px-8 md:px-0 lg:px-0 min-h-[calc(100vh_-_200px)] flex justify-center items-center mb-20 mt-8'>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-gray-800">
                <div className="card-body">
                    <h2 className='text-center font-bold text-2xl text-primary dark:text-white'>Update Profile</h2>
                    <div className='flex justify-center items-center '>
                        <div className='flex justify-center items-center border-3 border-secondary rounded-full h-30 w-30 p-1 overflow-hidden ' >

                            <img className='w-full rounded-full' src={user?.photoURL ? user?.photoURL : pimage} alt="" />
                        </div>
                    </div>


                    <h2 className='text-center font-bold text-xl text-primary dark:text-white'>{user.displayName}</h2>
                    <form onSubmit={handleUpdateProfile} className="fieldset">
                        <label className="label dark:text-white">Change Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input dark:hover:border-secondary"
                            placeholder="Name"
                            defaultValue={user?.displayName}
                        />
                        {nameError && <p className="text-red-600">{nameError}</p>}

                        <label className="label dark:text-white">Change Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="input dark:hover:border-secondary"
                        />
                        {photoUrlError && <p className="text-red-600">{photoUrlError}</p>}

                        {previewUrl && (
                            <>
                                <label className="label dark:text-white">Change Profile Photo Preview</label>
                                <div className="mt-4 flex justify-center">
                                    <img src={previewUrl} alt="Preview" className="w-30 h-30  border" />
                                </div>
                            </>

                        )}

                        <button
                            type="submit"
                            className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary mt-4 dark:text-white dark:border-secondary"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;