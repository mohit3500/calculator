import React, { useEffect, useState } from 'react';
import Background from './assets/back.jpg';
import Animation2 from './Animation2';
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Animation from './Animation';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPwd, setConfirmPwd] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const values = { username, email, password, confirmPwd };

  type ToastOptions = {
    position: ToastPosition;
    autoClose: number;
    pauseOnHover: boolean;
  };

  const toastOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 5000,
    pauseOnHover: true,
  };

  const handleValidate = () => {
    if (password !== confirmPwd) {
      toast.error('Password and confirm password should be same', toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error('Username should be grater than 3 character', toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error(
        'Password should be equal or greater than 5 characters ',
        toastOptions
      );
      return false;
    } else if (email === '') {
      toast.error('Email is required', toastOptions);
      return false;
    }

    return true;
  };

  type User = {
    id: number;
    username: string;
    email: string;
  };

  type UserData = {
    user(user: any): User;
    msg: string;
    token: string;
  };

  type PostUserData = {
    msg(msg: any): string;
    token(token: any): string;
    user(user: any): string;
    data(data: any): UserData[];
  };

  const fetchApi = async () => {
    try {
      const { data } = await axios.post<PostUserData>(
        'https://mern-calculator-api.onrender.com/api/register',
        values
      );
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      setSuccess(data.msg);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ msg: any }>;
        setError(axiosError.response?.data?.msg);
      } else {
        setError('An Error Occurred');
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidate()) {
      fetchApi();
    }
  };

  useEffect(() => {
    {
      error && toast.error(error, toastOptions);
    }
  }, [error]);

  useEffect(() => {
    {
      success &&
        toast.success(success, toastOptions) &&
        setTimeout(() => {
          navigate('/');
        }, 2000);
    }
  }, [success]);
  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen relative">
        <img src={Background} alt="" className="h-screen w-screen" />
        {loading ? (
          <div className="absolute flex items-center justify-center top-0  m-auto w-screen h-screen">
            <Animation />
          </div>
        ) : (
          <>
            <div className="absolute top-0 bottom-0 h-[450px] md:w-[700px] w-[350px] m-auto left-0 right-0 rounded-2xl flex justify-center overflow-hidden border-[1.5px] border-white backdrop-blur-[8px] ">
              <div className="flex-[0.5] rounded-xl  items-center border-white border-[1.5px] hidden md:flex">
                {<Animation2 />}
              </div>
              <div className="flex-[0.5] py-5">
                <form
                  className="text-center flex flex-col"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="text-[30px] text-white font-semibold tracking-[0.5px] py-5">
                    Register
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="border-b-2 md:mx-14 border-white">
                      <input
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-transparent py-2 text-[14px] border-none outline-none w-full h-full px-1 placeholder:text-white text-white"
                      />
                    </div>
                    <div className="border-b-2 md:mx-14 border-white">
                      <input
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent py-2 text-[14px] border-none outline-none w-full h-full px-1 placeholder:text-white text-white"
                      />
                    </div>
                    <div className="border-b-2 md:mx-14 border-white">
                      <input
                        type="password"
                        placeholder="Enter Password"
                        name="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent py-2 text-[14px] border-none outline-none w-full h-full px-1 placeholder:text-white text-white"
                      />
                    </div>
                    <div className="border-b-2 md:mx-14 border-white">
                      <input
                        type="password"
                        placeholder="Enter Confirm Password"
                        name="confirm-pwd"
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        className="bg-transparent py-2 text-[14px] border-none outline-none w-full h-full px-1 placeholder:text-white text-white"
                      />
                    </div>
                    <button className="py-2 px-5 bg-[#304d6d] text-white w-[150px] rounded-lg md:mx-24 hover:bg-[#132f54] border-[1.5px] border-white hover:border-[#132f54] duration-500 transition-all ease text-[15px]">
                      Submit
                    </button>
                  </div>
                </form>
                <p className="text-center mt-2 text-[13px] text-white">
                  Already have account?
                  <Link to={'/login'}>
                    <span className="text-[14px]  text-[#daab97] font-medium cursor-pointer">
                      {' '}
                      Login
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
