import React, { MouseEventHandler, useEffect, useState } from 'react';
import { SlRefresh } from 'react-icons/sl';
import { AiOutlineDelete } from 'react-icons/ai';
import dashboard from './assets/dashboard.png';
import axios from 'axios';
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Cal = { _id: string; name: string; calculation: string[] };
type Res = {
  msg: string;
};

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

const Table: React.FC = () => {
  const [calculations, setCalculations] = useState<Cal[]>([]);

  const userJSON = localStorage.getItem('user');
  const userId = userJSON ? JSON.parse(userJSON)._id : '';

  const value = { userId };

  const fetchApi = async (): Promise<void> => {
    try {
      const { data } = await axios.post<Cal[]>(
        'https://mern-calculator-api.onrender.com/api/calculator/calculation/get',
        value
      );
      setCalculations(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const handleDelete: MouseEventHandler<SVGElement> = async (e) => {
    const id = e.currentTarget.id;
    try {
      const { data } = await axios.delete<Res>(
        `https://mern-calculator-api.onrender.com/api/calculator/calculation/delete/${id}`
      );

      toast.success(data.msg, toastOptions);
    } catch (error) {
      console.log(error);
    }
    fetchApi();
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center overflow-x-hidden flex-col gap-4 w-[50vw] relative h-screen pt-24">
        <p className="text-[14px] font-bold text-left w-[60%]">
          Please operate on only two numbers at a time and save before clearing
          the entire data
        </p>
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 shadow-md overflow-y-auto h-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 w-full flex-grow ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Calculation
              </th>
              <th scope="col" className="px-6 py-3">
                <img
                  src={dashboard}
                  alt=""
                  className="h-[22px]"
                  onClick={fetchApi}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {calculations.map((cal: Cal, index: number) => (
              <React.Fragment key={index}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {cal.name}
                  </th>
                  <td className="px-6 py-4 text-cyan-500 font-semibold cursor-pointer">
                    {cal.calculation.map((c, i) => (
                      <div key={i}>{c}</div>
                    ))}
                  </td>
                  {/* <>
                  {show && (
                      <div className="absolute bg-white flex h-[50%] w-[25%] rounded-2xl  backdrop-blur-sm justify-center p-5 border-2 top-0 left-0 bottom-0 right-0 m-auto border-slate-400">
                      <div className="flex w-full ">
                      <div className="w-full flex justify-between h-[20px] items-center ">
                      <div className="w-full text-center text-[14px] font-semibold text-gray-800">
                      {cal.name}
                      </div>
                      <AiOutlineClose
                            className="text-[20px] cursor-pointer hover:scale-[1.05] transition-all ease duration-500"
                            onClick={() => setShow(!show)}
                            />
                            </div>
                            <div className="">
                            {cal.calculation.map((c, i) => (
                                <div key={i}>{c}</div>
                                ))}
                                </div>
                      </div>
                      </div>
                      )}
                    </> */}
                  <td className="flex items-center justify-center gap-5 mt-4">
                    <SlRefresh
                      className="cursor-pointer text-[17px] hover:scale-[1.04] duration-300 transition-all ease"
                      onClick={fetchApi}
                    />
                    <AiOutlineDelete
                      className="cursor-pointer text-[19px] hover:scale-[1.04] duration-300 transition-all ease"
                      id={cal._id}
                      onClick={handleDelete}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
