/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import { Card,Col,Row } from 'react-bootstrap'
import { Outlet,useNavigate } from 'react-router-dom';
import {  UserProfileSummary,LogoTitle } from '../Components';
import { MyRoute } from '../Helpers';
import  {TeamAvailable} from '../Pages';
import { AuthenticationService as Auth } from '../Services';


export default function UserDashboardLayout() {
  const navigate = useNavigate()
  useEffect(() => {

    if(!Auth.getCurrentUser()?.token){
      MyRoute.to(navigate,MyRoute.home.route,{replace:true});
    }

    return () => {
      
    };
  }, [])

  return (
     
      <Row className='p-lg-5 p-sm-2'>

        <Col md={3} >
        <Card className='text-center'>
            <UserProfileSummary/>

        </Card>
        <Card className='text-start mt-2'>
       
            <TeamAvailable />
            
        </Card>
        
        </Col>

        <Col md={9} className="text-center " >
             <Card>
             <Card.Header>
             <Card.Title className='ms-1 mb-0' >
                <LogoTitle />
            </Card.Title>
             </Card.Header>
              <Card.Body>
               <Outlet />
              </Card.Body>
                
             </Card>
        </Col>

      </Row>

  )
}
