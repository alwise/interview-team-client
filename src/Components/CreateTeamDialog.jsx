import { Modal,Form,Col } from 'react-bootstrap';
import {useState} from 'react';
import { SubmitButton } from './Buttons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { LogoTitle } from './MyTitle';
import { TeamServices,AuthenticationService as Auth } from '../Services';
import { AlertMessage } from './AlertComponent';
export default function CreateTeamDialog({callback}) {

    const [show,setShow] = useState('');
    const [data,setData] = useState('');
    const formik = useFormik({
        initialValues: {
          name: '',
        //   password:''
        },
        validationSchema:Yup.object({
            name: Yup.string()
              .required('Required'),
            // lastName: Yup.string()
            //   .max(20, 'Must be 20 characters or less')
            //   .required('Required'),
            // password: Yup.string().required('Required'),
          }),
        onSubmit: async (values) => {
            setShow(false)
            const result = await TeamServices.create({...values});
            if(result?.status === true){
              await TeamServices.addTeamOwner({teamId:result?.data?.id,userId:Auth.getCurrentUser()?.uid,role:'owner'});
            }
            setData(result)
            setShow(true)
            setTimeout(()=>{
                if(result?.status === true){formik.resetForm();callback()};
            },800)
        },
        
      });
  
    return (
      <>  
        <Modal show={true} size={'sm'} scrollable onHide={callback}>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton >
            <LogoTitle style={{fontSize: 9}} cardStyle={{marginRight: 5}} />
            <Modal.Title  style={{fontSize:14}}>Create team</Modal.Title>
         
          </Modal.Header>
          <Modal.Body>
            {show && <AlertMessage success={data?.status} message={data?.message} callBack={()=>setShow(false)}  /> }
            
            <Form.Group as={Col} md="12" controlId="validationFormik02">
            <Form.Label>Team name</Form.Label>
            <Form.Control
                type="text"
                name="name"
                placeholder='ai-group'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid= {formik.touched.name && !formik.errors.name}  
                isInvalid= {formik.touched.name && formik.errors.name}  
            />
            <Form.Control.Feedback type="invalid">
                {formik.errors.name} 
                </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton value={'Send invite'} callBack={formik.submitForm} />
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
  