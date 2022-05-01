/* eslint-disable eqeqeq */
// import {useState} from 'react';
import {Alert} from 'react-bootstrap'
export function AlertMessage({success,message,callBack}) {
    // const [show, setShow] = useState(true);
  
      return (
        <Alert  className='p-2 ms-1 me-2 mt-2' variant={success == true ? "success" : "danger"} dismissible onClose={callBack && callBack} >
          <Alert.Heading className='p-3' style={{ fontSize:16}} >{message || 'Welcome to the team.'}</Alert.Heading>
          {/* <p>
            {message || 'Welcome to the team.'}
          </p> */}
        </Alert>
      )
  }
