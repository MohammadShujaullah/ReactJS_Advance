import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from './indexx';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";






function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();        // new for me

    const [error, setError] = useState("");  // initially empty string i passed.

    const login = async (data) => {
        setError("");    //seterror ko khaali krdia ,at the time of login
        try {
            const session = await authService.login(data)
            if (session) {   // if login ho jata ha to fir , Aapp userdata lelo
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))    // or phir userdata ajata ha , to dispatch krdo

                navigate('/')    // jab user login hojae, to use root pr bhe do ,means main home page pr

            }
        } catch (error) {
            setError(error.message);
        }
    }


    return (<div
        className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                    >Sign in</Button>
                </div>
            </form>
        </div>
    </div>)
}

export default Login
// same as href, in which URL is provided
// regiter ke ander,phle Keyvalue daalete han, fir object daalte han,object ke ander 2 chiizen required, and validate, (validate will take some patterns)
