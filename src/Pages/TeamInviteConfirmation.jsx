/* eslint-disable react-hooks/exhaustive-deps */

import React,{useEffect,useState} from 'react'
import { Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertMessage, AuthTitle, LogoTitle, TextButton } from '../Components';
import { MyRoute } from '../Helpers';
import { useQuery } from '../Helpers/Hooks';
import { TeamServices } from '../Services';

export default function TeamInviteConfirmation() {
  const query = useQuery();
  const navigate = useNavigate();
  const loc = useLocation();
  const [data,setData] = useState({});
  const [show,setShow] = useState(false);

  const acceptInvite = async (user) =>{
    setShow(false)
    const result = await TeamServices.acceptInvite({id:query.get('id')?.trim()});
    console.log('Result of accept',result);
    setData((result));
    setShow(true)
    // const existUser = result?.data;
    //     if(!existUser?.email){
    //       // existUser.email = user?.email
    //       // setData((prev)=>prev.email = user?.email)
    //     }


  }

  const toLogin = () => {
        MyRoute.to(navigate,MyRoute.home.route, {replace:true,state:{user:data}});
    
        }

  const checkInviteeAlreadyHaveAccount = async() =>{
    setShow(false)
    const result = await TeamServices.validateInvite({id:query.get('id')});
    console.log(result);
    setData(result);
    setShow(true)
    setTimeout(()=>{
        if(result?.status === true){
          validateResultAndProceed(result?.data)
        }
    },1500)
  } 

  const validateResultAndProceed = (user)=>{
    if(!user?.uid || !user?.token){
       MyRoute.to(navigate,MyRoute.home.subRoutes.signup.route, {replace:true,state:{user,from:loc.pathname.concat(loc.search)}})
       console.log('validate for ni account',user)
    return ;
   }
    acceptInvite(user)
  }


  useEffect(() => {
    checkInviteeAlreadyHaveAccount();
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
                <AuthTitle title={'Invite confirmation'}/>
                    <i style={{ fontSize:14 }}>Already have account? <TextButton value={'Sign in'} callBack={toLogin} /></i> 
            </div>

            {show && <AlertMessage success={data?.status} message={data?.message} callBack={()=>{}}  />}
        
            </Card.Body>
           
        </Card>
  )
}