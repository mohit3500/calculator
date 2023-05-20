import React, { useEffect, useState } from 'react';
import Table from './Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type PropComponent = {
  name: string;
};

const Calculator: React.FC<PropComponent> = ({ name }) => {
  const navigate = useNavigate();
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleDigitClick = (digit: string): void => {
    if (displayValue === '0' && parseFloat(displayValue) === parseFloat('0')) {
      let value = parseInt(digit).toString();
      setDisplayValue(value);
    } else {
      setDisplayValue((displayValue + digit).substring(0, 13));
    }
  };

  const handleOperatorClick = (nextOperator: string): void => {
    const inputValue = parseFloat(displayValue);

    calculateResult();

    setPreviousValue(inputValue);
    setOperator(nextOperator);
    setDisplayValue('');
  };

  const handleEqualClick = (): void => {
    if (operator && previousValue !== null) {
      calculateResult();
      setPreviousValue(null);
      setOperator(null);
    }
  };

  const calculateResult = (): void => {
    const inputValue = parseFloat(displayValue);
    let result: number | null = null;

    if (operator && previousValue !== null) {
      switch (operator) {
        case '+':
          result = previousValue + inputValue;
          break;
        case '-':
          result = previousValue - inputValue;
          break;
        case '*':
          result = previousValue * inputValue;
          break;
        case '/':
          result = previousValue / inputValue;
          break;
        default:
          break;
      }
    }
    if (result !== null) {
      setDisplayValue(result.toString());
      setHistory([
        ...history,
        `${previousValue} ${operator} ${inputValue} = ${result}`,
      ]);
    }
  };

  const handleClearClick = (): void => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setHistory([]);
  };

  const handleAbsoluteClick = (): void => {
    setDisplayValue('-' + displayValue);
    if (displayValue[0] === '-') {
      setDisplayValue(displayValue.replace('-', ''));
    }
  };

  const handlePercentClick = (): void => {
    const inputValue = (parseFloat(displayValue) / 100).toString();
    setDisplayValue(inputValue);
  };

  const handleDecimalClick = (): void => {
    let flag = true;
    for (let i = 0; i < displayValue.length; i++) {
      if (displayValue[i] === '.') {
        flag = false;
      }
    }
    if (flag) {
      setDisplayValue(displayValue + '.');
    }
  };

  const userJSON = localStorage.getItem('user');
  const userId = userJSON ? JSON.parse(userJSON)._id : '';

  const values = {
    name,
    userId,
    calculation: history,
  };

  const fetchApi = async (): Promise<void> => {
    try {
      await axios.post(
        'https://mern-calculator-api.onrender.com/api/calculator/calculation',
        values
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    fetchApi();
  };

  useEffect(() => {
    if (name === '') {
      navigate('/');
    }
  }, [name]);

  return (
    <>
      <div className="h-screen w-screen flex bg-slate-100 overflow-x-hidden  ">
        <div className="flex flex-col w-[350px] m-auto p-[20px] rounded-[20px] pt-5 h-[430px]  backdrop-blur-md shadow-lg bg-white ">
          <div className=" rounded-[4px] p-[10px] mb-[10px] flex justify-end items-end text-[30px] font-semibold h-[115px]">
            {previousValue} {operator} {displayValue.substring(0, 14)}
          </div>
          <div className="grid grid-cols-4 gap-[12px]">
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold text-cyan-500"
              onClick={() => handleClearClick()}
            >
              AC
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold text-cyan-500"
              onClick={() => handleAbsoluteClick()}
            >
              +/-
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold text-cyan-500"
              onClick={() => handlePercentClick()}
            >
              %
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold text-orange-600"
              onClick={() => handleOperatorClick('/')}
            >
              /
            </button>

            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('7')}
            >
              7
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('8')}
            >
              8
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('9')}
            >
              9
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold text-orange-600"
              onClick={() => handleOperatorClick('*')}
            >
              *
            </button>

            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('4')}
            >
              4
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('5')}
            >
              5
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('6')}
            >
              6
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold text-orange-600"
              onClick={() => handleOperatorClick('-')}
            >
              -
            </button>

            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('1')}
            >
              1
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('2')}
            >
              2
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('3')}
            >
              3
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold text-orange-600"
              onClick={() => handleOperatorClick('+')}
            >
              +
            </button>

            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('0')}
            >
              0
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDigitClick('00')}
            >
              00
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-[#f2f2f2] cursor-pointer text-[15px] font-semibold "
              onClick={() => handleDecimalClick()}
            >
              .
            </button>
            <button
              className="rounded-[8px] p-[10px] bg-orange-600 cursor-pointer text-[15px] font-semibold text-white"
              onClick={() => handleEqualClick()}
            >
              =
            </button>
          </div>
          <button
            className="absolute -bottom-14 right-0 bg-cyan-600  p-2 px-4 rounded-3xl text-[13px] text-white hover:bg-cyan-700 duration-300 transition-all ease"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        <Table />
      </div>
    </>
  );
};

export default Calculator;
