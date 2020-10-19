import React, {useEffect, useState} from 'react';

const commonPassword = require('common-password-checker')
// import userdata from '../../../../data/users.json';
import FailureLogin from "../../components/FailureLogin";
import Home from "../HomePage/index"
import './styles.less'
import Register from './RegisterUser'

const Login = () => {
    const [isLogin, setLogin] = useState(false);
    const [failedLoginAttempt, setFailedLoginAttempt] = useState(false);
    const [disableLogin, setDisableLogin] = useState(true)
    const [loginState, setLoginState] = useState({
        username: "",
        password: ""
    })
    const [isRegisterFormActive, setRegisterFormActive] = useState(false)
    const checkNIST = (value) => {
        disbalePaste()
        const passwordLengthRule = (val) => (val.length >= 8 && val.length <= 66);
        const allowSpecialChar = (val) => true;
        const isPasswordCommon = (val) => !commonPassword(val);
        return passwordLengthRule(value) && allowSpecialChar(value) && isPasswordCommon(value);
    }

    const handleChange = (e) => {
        const {id, value} = e.target;
        // checkNIST(value) ? setDisableLogin(false) : setDisableLogin(true)
        setLoginState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const authenticate = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: loginState.username, password: loginState.password})
        };
        fetch('/api/checkLogin', requestOptions)
            .then(resp =>
                resp.json()
            )
            .then(respJson => {
                respJson ? setLogin(true) : setFailedLoginAttempt(true);
            })
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        authenticate();
    }
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        setRegisterFormActive(true);
    }
    const disbalePaste = () => {
        const myInput = document.getElementById('password');
        myInput.onpaste = function (e) {
            e.preventDefault();
        }
    }
    // const checkLoginStatus = () => {
    //     // console.log(loginState)
    //     userdata.isLogin ? setLogin(true) : setLogin(false);
    //
    // }
    // useEffect(() => {
    //     checkLoginStatus();
    // }, []);

    return (
        <div>

            {isRegisterFormActive ? <Register/> :

                !isLogin ?
                    <div>
                        <div className="row h-100">
                            <div className="col-sm-12 my-auto ">
                                <div className="card card-block w-25 mx-auto formMargins">
                                    <form>
                                        <div className="form-group text-left">
                                            <label>User Name</label>
                                            <input
                                                className="form-control"
                                                id="username"
                                                placeholder="Enter username"
                                                value={loginState.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group text-left">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <fieldset>
                                                <input type="password"
                                                       className="form-control"
                                                       id="password"
                                                       placeholder="Password"
                                                       value={loginState.password}
                                                       onChange={handleChange}
                                                />
                                            </fieldset>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={handleSubmitClick}
                                            // disabled={disableLogin}
                                        >
                                            Login
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary buttonMargins"
                                            onClick={handleSubmitRegister}
                                        >
                                            Register
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {
                            failedLoginAttempt ? <FailureLogin/> : <div></div>
                        }
                    </div> : <Home/>
            }
        </div>

    )
}

export default Login;
