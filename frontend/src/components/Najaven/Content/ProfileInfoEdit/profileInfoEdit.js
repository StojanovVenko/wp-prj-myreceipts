import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import AuthService from "../../../../service/authService";

const ProfileInfoEdit = (props) => {

    let [name, setName] = useState("");
    let [username, setUsername] = useState("");
    let [mail, setMail] = useState("");
    const history = useHistory();

    useEffect(() => {
        AuthService.getCurrentUser()
            .then(response => {
                setName(response.data.name);
                setUsername(response.data.username);
                setMail(response.data.mail);
            })
            .catch()
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        props.editUser({
            name: name,
            username: username,
            mail: mail
        });
        history.push("/profil");
    };


    const changeName = (e) => {
        const paramValue = e.target.value;
        setName(paramValue);
    };
    const changeUsername = (e) => {
        const paramValue = e.target.value;
        setUsername(paramValue);
    };
    const changeMail = (e) => {
        const paramValue = e.target.value;
        setMail(paramValue);
    };

    const cancleEdit = (e) => {
        history.push("/profil");
    };

    if (name === undefined) return <></>;
    return (
        <div className="text-center">
            <br/>
            <br/>
            <img className="img-profile rounded-circle" src={require('../../../../user.png')} alt=""/>
            <br/>
            <br/>
            <form onSubmit={onFormSubmit}>
                <div className="container w-25">
                    <sub>име</sub>
                    <input className="form-control text-center" type="text"
                           name="name"
                           value={name}
                           onChange={changeName}/>
                    <br/>
                    <sub>корисничко име</sub>
                    <input className="form-control text-center" type="text"
                           name="username"
                           value={username}
                           onChange={changeUsername}/>
                    <br/>
                    <sub>електронска пошта</sub>
                    <input className="form-control text-center" type="text"
                           name="mail"
                           value={mail}
                           onChange={changeMail}/>
                    <hr className="w-50 ml-auto mr-auto"/>

                    <div className="row">
                        <div className="col-sm-6">
                            <button className="btn btn-outline-primary btn-block"
                            onClick={cancleEdit}>Назад
                        </button>
                        </div>
                        <div className="col-sm-6">
                            <input type="submit" value="Зачувај" className="btn btn-outline-primary btn-block"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

};
export default ProfileInfoEdit;
