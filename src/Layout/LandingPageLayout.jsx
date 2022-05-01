
import React from 'react';
import { Outlet } from "react-router-dom";
import { Header, Typiest } from '../Components';
import {Container} from 'react-bootstrap';
import { Colors } from '../Utilities';
export default function LandingPageLayout() {
  return (
    <>
       <Header/>
      
        <div className="col mt-5 ms-2 me-2 d-flex justify-content-center" >
      
          <Outlet  />
        </div>

        <Container className='mt-5 p-1 text-center bg-light m-auto' style={{fontWeight: 800,fontSize:18,color:Colors.primary,width:'fit-content', borderRadius: 3}}>
         <Typiest/>
      </Container>
       
    </>
  );
}
