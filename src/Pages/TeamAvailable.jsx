/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Card, Badge, ListGroup } from "react-bootstrap";
import { Colors } from "../Utilities";
import { useStoreActions, useStore } from "easy-peasy";
// import { AuthenticationService } from "../Services";
import { useState } from "react";
// import ReactInterval from 'react-interval';
import { MyRoute } from "../Helpers";
import { useNavigate } from "react-router-dom";
import { CreateTeamDialog } from "../Components";
import { TextButton } from "../Components/Buttons";

export default function TeamAvailable() {
  const store = useStore();
  const getTeams = useStoreActions((action) => action?.getTeams);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    await getTeams();
    setData((prev) => (prev = store.getState()?.teams));
  };

  const toSelectedTeam = (name, data) =>
    MyRoute.to(
      navigate,
      MyRoute.dashboard.subRoutes.teams.route.split(":id")[0].concat(`${name}`),
      { replace: true, state: { data } }
    );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <b>My Teams</b>
        <TextButton value={"+ New"} callBack={() => setShow(true)} />
      </Card.Header>
      <Card.Body>
        {data?.length < 1 && (
          <p className="text-center " style={{ color: "grey" }}>
            no team
          </p>
        )}
        {data?.map((val, ind, arr) => (
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start text"
            key={ind}
            action
            variant="secondary"
            onClick={() => toSelectedTeam(val?.Team?.id, val)}
          >
            {val?.Team?.name}
            <Badge
              bg={Colors.primary}
              style={{ backgroundColor: Colors.primary }}
              pill
            >
              {val?.role}
            </Badge>
          </ListGroup.Item>
        ))}
      </Card.Body>
      {show && (
        <CreateTeamDialog
          callback={() => {
            setShow(false);
            fetchData();
          }}
        />
      )}
    </Card>
  );
}
