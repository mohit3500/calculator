import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import Animation1 from './Animation1';
import Calculator from './Calculator';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PropComponent = {
  name: string;
  setName: (val: string) => void;
};

const CalculatorHome: React.FC<PropComponent> = ({ name, setName }) => {
  const navigate = useNavigate();
  const [cal, setCal] = useState<boolean>(false);

  type ToastOptions = {
    position: ToastPosition;
    autoClose: number;
    pauseOnHover: boolean;
  };

  const toastOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 2000,
    pauseOnHover: true,
  };

  if (!name) {
    toast.error(
      'Provide a Calculation name to proceed to calculator',
      toastOptions
    );
  }

  useEffect(() => {
    {
      cal && navigate('/calculator');
    }
  }, [cal]);

  const tokenJSON = localStorage.getItem('token');
  const token = tokenJSON ? JSON.parse(tokenJSON) : '';

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  return (
    <div className="h-screen w-screen bg-slate-100 flex flex-col items-center">
      <ToastContainer />
      <form
        className="flex justify-center mt-16 bg-white w-[350px] items-center rounded-lg overflow-hidden"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setCal(true);
        }}
      >
        <input
          type="text"
          placeholder="Enter Calculation Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="outline-none bg-transparent border-none w-full h-full p-3 text-[13px] pl-4"
        />
        <button className="bg-cyan-500 h-full w-[30%] text-[14px] text-white ">
          Save
        </button>
      </form>

      {cal ? (
        <>
          <Calculator name={name} />
        </>
      ) : (
        <div className="h-[400px] w-[650px] mt-5">
          <p className="text-[16px] text-center font-semibold tracking-[0.5px]">
            Enter Calculation Name to access Calculator
          </p>
          <Animation1 />
        </div>
      )}
    </div>
  );
};

export default CalculatorHome;
