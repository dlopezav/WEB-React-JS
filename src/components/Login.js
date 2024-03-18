import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postServiceData } from '../util.js';

function Login({ setToken, removeToken, getToken }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const navigate = useNavigate();

  // Event handler for updating login state
  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  // Event handler for updating password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {login: login, password: password};
    postServiceData("authenticate", params)
    .then((data) => {
      console.log("data is : " + data); 
      if (data && data.ok === 1) {
        setCanLogin(true);
        
      } else {
        setLogin('');
        setPassword('');
        setCanLogin(false);
        console.log("Invalid username or password");
      }
    });
    
  };

  useEffect(() => {
    const tokenExists = getToken();
    if (tokenExists) {
      navigate('/users', { replace: true });
    }
  }, [getToken, navigate]);

  useEffect(() => {
    if (canLogin) {
      removeToken();
      setToken('Pipe was here');
      navigate('/users', { replace: true });
    }
  }, [canLogin, removeToken, setToken, navigate]);

  

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="">Library Login</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form id="c_form-h" onSubmit={handleSubmit}>
              <div className="form-group row">
                <label htmlFor="inputlogin" className="col-2 col-form-label">Login</label>
                <div className="col-10">
                  <input type="text" className="form-control" id="inputlogin" placeholder="username" name="login" value={login} onChange={handleLoginChange} required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputpassword" className="col-2 col-form-label">Password</label>
                <div className="col-10">
                  <input type="password" className="form-control" id="inputpassword" placeholder="password" name="password" value={password} onChange={handlePasswordChange} required />
                </div>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
