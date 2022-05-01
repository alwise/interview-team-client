import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { LogoTitle } from ".";
import { Colors } from "../Utilities";
export default function Header() {
  return (
    <Navbar
      className="bg-light mb-3"
      style={{
        backgroundColor: "transparent",
        height: 68,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        borderBottomStyle: "solid",
        opacity: 0.8,
      }}
    >
      <Container
        className="container-fluid"
        style={{ height: 68, backgroundColor: "transparent" }}
      >
        <Navbar.Brand
          href="#"
          className="mt-0"
          style={{
            backgroundColor: Colors.primary,
            padding: 0,
            paddingBottom: 10,
            height: 80,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            opacity: 1.0,
          }}
        >
          <LogoTitle
            cardStyle={{
              fontWeight: 700,
              width: 100,
              height: "99%",
              padding: 5,
              paddingTop: 16,
              opacity: 1.0,
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <b style={{ color: Colors.primary }} className="me-2">
              {"l"}
            </b>
          </Navbar.Text>
          <Navbar.Text>
            <i className="bi bi-instagram me-2"></i>
          </Navbar.Text>
          <Navbar.Text>
            <i className="bi bi-facebook"></i>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
