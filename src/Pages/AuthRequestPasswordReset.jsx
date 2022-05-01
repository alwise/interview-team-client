import React,{useState} from 'react'
import {Form,Row,Col,Card} from 'react-bootstrap'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {LogoTitle,AuthTitle, TextButton, SubmitButton, AlertMessage} from '../Components';
import { AuthenticationService as Auth } from '../Services';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyRoute } from '../Helpers';

export default function AuthRequestPasswordReset() {
    const [data,setData] = useState({  })
    const [show,setShow] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation()
    const handleAlertClose = () =>setShow(false);
    const toLogin = ()=> MyRoute.to(navigate,MyRoute.home.route, {replace:true,state})
    const formik = useFormik({
        initialValues: {
          email: '',
          password:''
        },
        validationSchema:Yup.object({
            email: Yup.string().email()
              .required('Required'),
            password: Yup.string().min(4,"must be at least 4 characters")
              .required('Required'),
          }),
        onSubmit: async (values) => {
            setShow(false)
            const result = await Auth.requestPasswordReset(values);
            Auth.setUserData(result?.data);
            setData(result)
            //   console.log(data)
            setShow(true)
        },
        
      });

  return (
      
        <Card className="text-justify col-xs-12 col-md-4" >
            <Card.Title className='ms-1 mb-0'>
                <LogoTitle/>
            </Card.Title>
            <Card.Body className='ms-3 me-3 mt-0 mb-3'>

            <div className='mb-3 mt-0' >
                <AuthTitle title={'Request password reset'}/>
                    <i style={{ fontSize:14 }}>Already have account? <TextButton value={'Sign in'} callBack={toLogin} /></i> 
            </div>

            {show && <AlertMessage success={data?.status} message={data?.message} callBack={handleAlertClose}  />}
        
            <Form noValidate onSubmit={formik.handleSubmit}>
        
            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationFormik01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder='team@jam.com'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid= {formik.touched.email && !formik.errors.email}
                    isInvalid={formik.touched.email && formik.errors.email}   
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.email} 
                    </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik02">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid= {formik.touched.password && !formik.errors.password}  
                    isInvalid= {formik.touched.password && formik.errors.password}  
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.password} 
                    </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
                <div className="text-end col-xs-12 col-md-12">
                    <SubmitButton className="col-xs-12 col-md-12 p-2" value="Reset password" type={"submit"} callBack={formik.submitForm}  />

                    {/* <TextButton  value={'Forgot password?'} style={{fontWeight: 'bolder'}}  /> */}

                    {/* <SubmitButton className="col-xs-12 col-md-12 mt-4 mb-3 p-2" style={{ backgroundColor: 'grey' }} value="Sign up" type={"button"} callBack={toRegister}/> */}
                </div>
            
            </Form>
            </Card.Body>
           
        </Card>
   
  );
}

