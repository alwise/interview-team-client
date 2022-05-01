import React,{useState} from 'react'
import {Form,Row,Col,Card} from 'react-bootstrap'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AuthTitle, SubmitButton, AlertMessage} from '../Components';
import { AuthenticationService as Auth } from '../Services';

export default function AuthUpdateCredentials() {
    const [data,setData] = useState({  })
    const existingData = Auth.getCurrentUser();
    const [show,setShow] = useState(false);
    const handleAlertClose = () =>setShow(false);


    const formik = useFormik({
        initialValues: {
          name:existingData?.name || '',
          email: existingData?.email || '',
        },
        validationSchema:Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email()
              .required('Required'),
            // password: Yup.string().required('Required'),
          }),
        onSubmit: async (values) => {
            setShow(false)
            const result = await Auth.update({...existingData,...values});
            setData(result)
            setShow(true);
            const currentData = {...Auth.getCurrentUser(),...values};
            Auth.setUserData(currentData);
            setTimeout(()=>{
                if(result?.status === true)
                    window.location.reload();
            },500)
        },
        
      });

  return (
      

            <Card.Body className='ms-3 me-3 mt-0 text-start'>

            <div className='mb-3 mt-0' >
                <AuthTitle title={'Update profile'} style={{fontWeight: 500 }}/> 
            </div>

            {show && <AlertMessage success={data?.status} message={data?.message} callBack={handleAlertClose}  />}
        
            <Form noValidate onSubmit={formik.handleSubmit}>
        
            <Row className="mb-3">
              {/* Name  */}
                <Form.Group as={Col} md="12" controlId="name1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder='Felix Elvis'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid= {formik.touched.name && !formik.errors.name}
                    isInvalid={formik.touched.name && formik.errors.name}   
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.name} 
                    </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                 {/* Email  */}
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="email1">
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

            </Row>
                <div className="text-end col-xs-12 col-md-12">

                    <SubmitButton className="col-xs-12 col-md-12 p-2 mb-3" value="Update" type={"submit"} callBack={formik.submitForm}  />

                 
                </div>
            
            </Form>
            </Card.Body>
           
   
   
  );
}


