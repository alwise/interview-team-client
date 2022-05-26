import { Modal,Form,Col } from 'react-bootstrap';
import {useState} from 'react';
import { SubmitButton } from './Buttons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { AuthTitle, LogoTitle } from './MyTitle';
import { TeamServices,AuthenticationService as Auth } from '../Services';
import { AlertMessage } from './AlertComponent';
export default function InviteEmail({callback,team}) {
    const [show,setShow] = useState('');
    const [data,setData] = useState('');
    const formik = useFormik({
        initialValues: {
          email: '',
        //   password:''
        },
        validationSchema:Yup.object({
            email: Yup.string().email()
              .required('Required'),
            // lastName: Yup.string()
            //   .max(20, 'Must be 20 characters or less')
            //   .required('Required'),
            // password: Yup.string().required('Required'),
          }),
        onSubmit: async (values) => {
            setShow(false)
            const value = {
                teamId:team?.id,
                email:values?.email,
                status:'Sent',
                metadata:{
                    user:Auth.getCurrentUser()
                }
            }
            const result = await TeamServices.inviteMember(value);
            setData(result)
            setShow(true)
            setTimeout(()=>{
                if(result?.status === true){
                   formik.resetForm();
                   callback();
                  };
            },1500)
        },
        
      });
  
    return (
      <>  
        <Modal show={true} size={'sm'} scrollable onHide={callback}>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton >
            <LogoTitle style={{fontSize: 9}} cardStyle={{marginRight: 3}} />
            <Modal.Title className="" style={{fontSize:14}}>invite to </Modal.Title>
            <AuthTitle style={{ marginLeft: 3,fontSize:14 }} title={` ${team?.name || 'group'}`} />
          </Modal.Header>
          <Modal.Body>
            {show && <AlertMessage success={data?.status} message={data?.message} callBack={()=>setShow(false)}  /> }
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
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Extra info</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group> */}
          
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton value={'Send invite'} callBack={formik.submitForm} />
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
  