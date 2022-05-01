/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import {Card} from 'react-bootstrap'

import {LogoTitle,AuthTitle, TextButton, AlertMessage} from '../Components';
import { AuthenticationService as Auth } from '../Services';
import { useNavigate } from 'react-router-dom';
import { MyRoute, useQuery } from '../Helpers';

export default function AuthResetPassword() {
    const [data,setData] = useState({  })
    const [show,setShow] = useState(false);
    const navigate = useNavigate();
    const params = useQuery();

    const handleAlertClose = () =>setShow(false);

    const toLogin = ()=> MyRoute.to(navigate,MyRoute.home.route, {replace:true})
   
      const verify = async () => {
        setShow(false)
        const result = await Auth.resetPassword({id:params.get('id')});
        Auth.setUserData(result?.data);
        setData(result)
          console.log(data)
        setShow(true)
    }



  useEffect(() => {
         verify();
    return () => {
      
    };
  }, [])
  return (
        <Card className="text-justify col-xs-12 col-md-4" >
            <Card.Title className='ms-1 mb-0'>
                <LogoTitle/>
            </Card.Title>
            <Card.Body className='ms-3 me-3 mt-0'>

            <div className='mb-3 mt-0' >
                <AuthTitle title={'Request password reset'}/>
                    <i style={{ fontSize:14 }}>Already have account? <TextButton value={'Sign in'} callBack={toLogin} /></i> 
            </div>

            {show && <AlertMessage success={data?.status} message={data?.message} callBack={handleAlertClose}  />}
        
            </Card.Body>
           
        </Card>
   
  );
}

