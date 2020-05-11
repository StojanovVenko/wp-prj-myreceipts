import React from "react";

class Gradovi extends React.Component {
    constructor(props){
        super(props);

        console.log(props.location.gradoviProps);

    }

    render() {

        return(<h1>Gradovi</h1>)
    }

}
export default Gradovi;
