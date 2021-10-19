import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
  const [formData, setFormData] = useState({
    email: '', password: ''
  })
  const { loading, request, error, clearError } = useHttp()
  const message = useMessage()
  const auth = useContext(AuthContext)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/registration', 'POST', {...formData})
      message(data.message)
    } catch (e) {

    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...formData})
      auth.login(data.token, data.userId)
    } catch (e) {

    }
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h2>Cut a link</h2>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>

              <div className='input-field'>
                <input
                  placeholder='Input your email'
                  id='email'
                  type='text'
                  name='email'
                  className='yellow-input'
                  onChange={changeHandler}
                  value={formData.email}
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field'>
                <input
                  placeholder='Input your password'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  onChange={changeHandler}
                  value={formData.password}
                />
                <label htmlFor='password'>Password</label>
              </div>

            </div>
          </div>
          <div className='card-action'>
            <button onClick={loginHandler} disabled={loading} className='btn yellow darken-4' style={{ marginRight: 15 }}>Login</button>
            <button onClick={registerHandler} disabled={loading} className='btn grey lighten-1 black-text'>SignUp</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;