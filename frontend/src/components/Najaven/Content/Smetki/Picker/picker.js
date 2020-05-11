import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomPicker = (props) => {

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
            <DatePicker
                className="form-control"
                selected={startDate}
                onChange={date => {
                    // setStartDate(date);
                changeStartDate(date)}}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            {/*<br/>*/}
            <br/>
            <br/>

            <DatePicker
                className="form-control"
                selected={endDate}
                onChange={date => {
                    // setEndDate(date);
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
