import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const CreatePage = () => {
  const [link, setLink] = useState('')
  const {request} = useHttp()
  const auth = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
        <div className='input-field'>
          <input
            placeholder='Insert link'
            id='link'
            type='text'
            onChange={(event) => {setLink(event.target.value)}}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor='link'>Insert link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;