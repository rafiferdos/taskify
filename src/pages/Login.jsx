import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { useForm } from "react-hook-form"
// import { Helmet } from "react-helmet-async";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const {theme} = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'

    const handleSocialLogin = (socialProvider) => {
        socialProvider().then(result => {
            if (result.user) {
                console.log(result.user)
                navigate(from)
            }
        })
    }


    const { signInUser, signInWithGoogle, signInWithGithub } = useContext(AuthContext)

    const [msg, setMsg] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        
        const { name, password } = data
        signInUser(name, password)
            .then((result) => {
                navigate(from)
                if (result.user) {
                    console.log(result.user)
                    notify()
                }
            })
            .catch ((error) => {
                if (error) {
                    invalidEmailNotify(error.message)
                    setMsg(error.message)
                }
            })
    }

    const notify = () => {
        return toast.info(msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const invalidEmailNotify = (invalidMsg) => {
        return toast.error(invalidMsg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <div className="hero min-h-screen lg:w-3/6 md:w-4/6 mx-auto">
                {/* <Helmet>
                    <title>Neko&apos;s Island | Login</title>
                </Helmet> */}
                <div className="hero-content flex-col lg:flex-row-reverse lg:gap-16">
                    <div className="text-center lg:text-left" data-aos="fade-left" data-aos-duration="1000">
                        <h1 className="font-bold text-2xl lg:text-6xl md:text-4xl bg-gradient-to-r from-orange-700 via-blue-500 to-purple-800 text-transparent bg-clip-text animate-gradient bg-300% font-madimi">Login now!</h1>
                        <p className="py-6 opacity-60">We can&apos;t wait for you to get logged in here and save your information to avoid unnecessary reload data loss, so why wait? Let&apos;s jump into it.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-200" data-aos="fade-right" data-aos-duration="1000">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered input-primary" {...register("name", { required: true })} />
                                {
                                    errors.name && <span className='text-red-400 text-sm md:text-lg'>This field is required</span>
                                }
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? 'text' : 'password'} placeholder="password" className="input input-bordered input-primary" {...register("password", { required: true })} />
                                <span className="absolute top-12 right-3 cursor-pointer">{showPassword ? (
                                    <IoEyeOffSharp className="text-xl" onClick={togglePasswordVisibility} />
                                ) : (
                                    <IoEye className="text-xl" onClick={togglePasswordVisibility} />
                                )}</span>
                                {
                                    errors.password && <span className='text-red-400 text-sm md:text-lg'>This field is required</span>
                                }
                            </div>
                            <div className="divider divider-primary">Or</div>
                            <div className="form-control">
                                <button
                                    onClick={() => handleSocialLogin(signInWithGoogle)}
                                    // onClick={() => signInWithGoogle()}
                                    type="button"
                                    className={theme === 'light' ? "py-2 mb-4 px-4 flex justify-center items-center shadow-red-300 hover:shadow-red-400 shadow-xl bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" : "py-2 mb-4 px-4 flex justify-center items-center shadow-red-800 hover:shadow-red-900 shadow-xl bg-red-700 hover:bg-red-800 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"}>
                                    <svg width="20" height="20" fill="currentColor" className="mr-2"
                                        viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
                                        </path>
                                    </svg>
                                    Continue with Google
                                </button>
                                <button
                                    onClick={() => handleSocialLogin(signInWithGithub)}
                                    // onClick={() => signInWithGithub()}
                                    type="button"
                                    className={theme === 'light' ? "py-2 px-4 flex justify-center items-center shadow-xl shadow-gray-300 hover:shadow-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " : "py-2 px-4 flex justify-center items-center shadow-xl shadow-gray-700 hover:shadow-gray-600 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-800 text-white w-full transition ease-in duration-200 text-center text-base font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        className="mr-2" viewBox="0 0 1792 1792">
                                        <path
                                            d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                                        </path>
                                    </svg>
                                    Continue with GitHub
                                </button>
                                <div className="flex justify-between items-center">
                                    <p className='opacity-60 lg:text-lg text-sm'>New Here?</p>
                                    <Link className='btn btn-ghost hover:bg-transparent underline text-purple-500'
                                        to='/register'>Register</Link>
                                </div>
                                <button className="btn btn-primary btn-outline">Login</button>
                                {/* <p>{errorMessage}</p> */}
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer theme={theme === 'light' ? 'light' : 'dark'} />
            </div>
        </>
    )
}
export default Login