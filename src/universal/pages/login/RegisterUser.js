import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import "./styles.less"
const commonPassword = require('common-password-checker')

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isButtonDisable, setIsButtonDisable] = useState(true)
    const [registerSuccessfulMsg,setRegisterSuccessfulMsg] =useState('')
    const linkTarget = {
        pathname: "/",
        key: Math.random, // we could use Math.random, but that's not guaranteed unique.
    }
    const disablePaste = () => {
        const myInput = document.getElementById('password');
        myInput.onpaste = function (e) {
            e.preventDefault();
        }
    }

    const checkNIST = (value) => {
        disablePaste()
        const passwordLengthRule = (val) => (val.length >= 8 && val.length <= 66);
        const allowSpecialChar = (val) => true;
        const isPasswordCommon = (val) => !commonPassword(val);
        return passwordLengthRule(value) && allowSpecialChar(value) && isPasswordCommon(value);
    }
    const handleUserNameChange = (e) => {
        const {id, value} = e.target;
        setUsername(value);

    }
    const handlePasswordChange = (e) => {
        const {id, value} = e.target;
        checkNIST(value) ? setIsButtonDisable(false) : setIsButtonDisable(true)
        setPassword(value)
    }
    const registerUserIntoDB = () => {
        fetch(`/api/registerUser?username=${username}&password=${password}`)
            .then(resp => {
                if (resp.status === 200) {
                    setRegisterSuccessfulMsg('Congrats! Registration Successful.')
                }
            })
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        registerUserIntoDB();
    }
    return (
        <div className="row h-100 container">
            <div className="col-sm-12 my-auto ">
                <div className="card card-block w-25 mx-auto formMargins">
                    <form>
                        <div className="form-group text-left">
                            <label>User Name</label>
                            <input
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                value={username}
                                onChange={handleUserNameChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <fieldset>
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       placeholder="Password"
                                       value={password}
                                       onChange={handlePasswordChange}
                                />

                            </fieldset>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isButtonDisable}
                            onClick={handleSubmitClick}
                        >
                            Register
                        </button>
                        <label>{registerSuccessfulMsg}</label>
                        <Link
                            className="linkRoute"
                            to="/" onClick={() => window.location.reload()}
                        >
                            {'Login?'}
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;
