import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const  CustomPicker = (props) => {

    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);

    const changeStartDate = (date) => {
        props.setNewDate(date, endDate);
        setStartDate(date);
    };

    const changeEndDate = (date) => {
        props.setNewDate(startDate, date);
        setEndDate(date);
    };

    return (
        <div>
            Изберете временски период<br/>
            <DatePicker
                className="form-control mb-2 text-center"
                selected={startDate}
                onChange={date => {
                changeStartDate(date)}}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <br/>

            <DatePicker
                className="form-control text-center"
                selected={endDate}
                onChange={date => {
                    changeEndDate(date);}}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
            />
        </div>
    );

};
export default CustomPicker;
