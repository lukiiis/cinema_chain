import { useState, forwardRef, useEffect} from 'react';
import './Datepicker.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Datepicker({onDataReceived, onDateSend}){

        const [startDate, setStartDate] = useState(new Date());
        const [selectedDate, setSelectedDate] = useState(null);
        const [shouldUpdateDate, setShouldUpdateDate] = useState(true);



        useEffect(() => {
          if (onDateSend && shouldUpdateDate) {
            setSelectedDate(onDateSend());
            setShouldUpdateDate(true); // set flag to false
            console.log("2");
          }
        }, [onDateSend, shouldUpdateDate]);



        const setDatePicker = (date) => {
          setSelectedDate(date.toISOString().split('T')[0]);
          onDataReceived(date)
          setShouldUpdateDate(false); //  flag to false, avoid overwriting date
        };

        const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
            
        <button className="date-button" onClick={onClick} ref={ref}>
            {selectedDate}
        </button>)
        );
    

    return(
        <>
        <DatePicker wrapperClassName='date-picker'
        selected={startDate}
          onChange={(date) => {
          if (onDataReceived) {
            onDataReceived(date);
          }
          if (onDateSend) {
            onDateSend(date);
          }
          setStartDate(date);
          setDatePicker(date)

          console.log(shouldUpdateDate)
        }}
        customInput={<ExampleCustomInput />}
        showPreviousDays
        showNextMonths
      />
      </>
    )
}