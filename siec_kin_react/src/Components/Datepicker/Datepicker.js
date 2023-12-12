import { useState, forwardRef, useEffect } from 'react';
import './Datepicker.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillCalendarFill, BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function Datepicker({ onDataReceived }) {
  const [dataToSend, setDataToSend] = useState('Data from child');
  const currDate = new Date();

  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="date-button" onClick={onClick} ref={ref}>
      {value}
    </button>));

  useEffect(() => {
    onDataReceived(currDate);
  }, []);
  return (
    <>
      <DatePicker wrapperClassName='date-picker'
        selected={startDate}
        onChange={(date) => { onDataReceived(date); setStartDate(date) }}
        customInput={<ExampleCustomInput />}
        showPreviousDays
        showNextMonths
      />
      <BsArrowLeft /> {/* Ikona strzałki w lewo */}
    </>
  )
}