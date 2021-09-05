import React, { useState } from "react";
import Popup from 'reactjs-popup';
import Loader from "react-loader-spinner";

const PopUpComponent = ({ button ,dispatch }) => {
    const [opened, setOpened] = useState(0)
    const openedStyle = {
        color: '#04AA6D',
        borderBottom: '1px solid #04AA6D'
    }
    return (
        <Popup
            trigger={button}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">talabat </div>
                    <div className="content">
                        <div className='contentHeader'>
                            <p style={!opened ? openedStyle : undefined} onClick={() => setOpened(0)}>Login</p>
                            <p style={opened ? openedStyle : undefined} onClick={() => setOpened(1)}>Create Account</p>
                        </div>
                    </div>
                    {opened ? (<Register setOpened={setOpened} />) : <Login dispatch={dispatch} />}
                </div>
            )}
        </Popup>
    );
};

const Login = ({dispatch}) => {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [waitingSubmit,setWaitingSubmit] = useState(false);
    const [error, setError] = useState('');
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    const handlePassChange = (event) => {
        setPass(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setWaitingSubmit(true);
        fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNo: phone, password: pass })
        })
            .then(response => response.json())
            .then(data => {
               
                if (data.status === 'ERROR' || data.status  === 'failed') {
                    setError(data.message||'Error Occuered');
                }
                else {
                    dispatch({type:'login',payload:{data:data}})
                }
               setWaitingSubmit(false);
            });

    }
    return (
        <form>
            <div className='formContainer'>

                <label for="phone"><b>Phone</b></label>
                <input type="text" placeholder="Enter Phone" value={phone} onChange={handlePhoneChange} required></input>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" value={pass} onChange={handlePassChange} required></input>


                <p className='error'>{error}</p>
                <button type="submit" class="registerbtn" onClick={handleSubmit} > {waitingSubmit?((<Loader type="TailSpin" color="#00BFFF" height={40} width={40} />)):'Login'}</button>
            </div>

        </form>
    )
}

const Register = ({ setOpened }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [error, setError] = useState('');
    const [waitingSubmit,setWaitingSubmit] = useState(false);
    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setWaitingSubmit(true);
        if(pass != pass2)
        {
            setError('Password does not match')
            setWaitingSubmit(false);
            return;
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phoneNo: phone, password: pass })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ERROR') {
                    setError(data.message);
                }
                else{
                    setOpened(0);
                }
                setWaitingSubmit(false);
            });
    }
    return (
        <form>
            <div className='formContainer'>
                <p>Please fill in this form to create an account.</p>
                <hr></hr>
                <label for="name"><b>Name</b></label>
                <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required></input>

                <label for="phone"><b>Phone</b></label>
                <input type="text" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required></input>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" value={pass} onChange={(e) => setPass(e.target.value)} required></input>

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" value={pass2} onChange={(e) => setPass2(e.target.value)} required></input>

                <hr></hr>
                {
                    /*
                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p> -->
                    */
                }
                <p className='error'>{error}</p>
                <button type="submit" className="registerbtn" onClick={handleRegister}>{waitingSubmit?((<Loader type="TailSpin" color="#00BFFF" height={40} width={40} />)):'Login'}</button>

            </div>

            <div className="container signin">
                <p>Already have an account? <a onClick={() => setOpened(0)}>Sign in</a>.</p>
            </div>
        </form>
    )
}
export default PopUpComponent;
