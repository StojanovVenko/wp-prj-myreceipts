import React from "react";

const SmetkaInfo = (props) => {

    console.log("final: " + props.info[0]);

    let sum = 0.0;
    let asd;
    let proizvodi = props.info.map((proizvod, index) => {
        console.log(proizvod)

        {sum += proizvod[7] * proizvod[8]}
        asd = <div className="col-sm-4">
            {proizvod[3]}
            <hr/>
            {proizvod[5]}
            <hr/>
            <hr/>
            {sum};
        </div>;
        return <p>{proizvod[7]} x {proizvod[8]} - {proizvod[9]} </p>
    });


    return(

        <div className="row">
            {asd}
            <div className="col-sm">
                {proizvodi}
            </div>
        </div>

    )

};
export default SmetkaInfo;