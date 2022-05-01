/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  LogoTitle,
  AuthTitle,
  TextButton,
  SubmitButton,
  AlertMessage,
} from "../Components";
import { AuthenticationService as Auth } from "../Services";
import { MyRoute } from "../Helpers";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthRegister() {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState(state?.user);
  const handleAlertClose = () => setShow(false);
  const toSignIn = () =>
    MyRoute.to(navigate, MyRoute.home.route, { replace: true, state });
  const toUserDashboard = () =>
    MyRoute.to(navigate, MyRoute.dashboard.subRoutes.teams.home, {
      replace: true,
      state,
    });
  const toCompleteInvite = () =>
    MyRoute.to(navigate, state?.from, { replace: true, state });

  useEffect(() => {
    setUser(state?.user);
    return () => {};
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: user?.email || "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setShow(false);
      const result = await Auth.register(values);
      Auth.setUserData(result?.data);
      setData(result);
      setShow(true);
      setTimeout(() => {
        if (result?.status === true) {
          if(state?.from){
            toCompleteInvite();
            return ;
          }
          toUserDashboard();
        }
      }, 800);

    },
  });

  return (
    <Card className="text-justify col-xs-12 col-md-4">
      <Card.Title className="ms-1 mb-0">
        <LogoTitle />
      </Card.Title>
      <Card.Body className="ms-3 me-3 mt-0">
        <div className="mb-3 mt-0">
          <AuthTitle title={"Create an account"} />
          <i style={{ fontSize: 14 }}>
            already have account?{" "}
            <TextButton value={"Sign in"} callBack={toSignIn} />
          </i>
        </div>

        {show && (
          <AlertMessage
            success={data?.status}
            message={data?.message}
            callBack={handleAlertClose}
          />
        )}

        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            {/* Name  */}
            <Form.Group as={Col} md="12" controlId="name1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Felix Elvis"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.name && !formik.errors.name}
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
                readOnly={user?.email}
                placeholder="team@jam.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.email && !formik.errors.email}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.password && !formik.errors.password}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="text-end col-xs-12 col-md-12">
            <p className="text-center" style={{ fontSize: 12, color: "grey" }}>
              By submitting, you accepted out T & C
            </p>

            <SubmitButton
              className="col-xs-12 col-md-12 p-2 mb-3"
              value="Create account"
              type={"submit"}
              callBack={formik.submitForm}
            />

            {/* <TextButton  value={'Forgot password?'} style={{fontWeight: 'bolder'}}  /> */}

            {/* <SubmitButton className="col-xs-12 col-md-12 mt-4 mb-3 p-2" style={{ backgroundColor: 'grey' }} value="Sign up" type={"button"}/> */}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
