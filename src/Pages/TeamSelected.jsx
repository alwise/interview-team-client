/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Table} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertConfirm, InviteEmail, ListTile, TextButton } from "../Components";
import { MyRoute } from "../Helpers";
import { useStoreActions } from "easy-peasy";
// import { useQuery } from '../Helpers';
import { TeamServices } from "../Services";

export default function TeamSelected() {
  const getTeams = useStoreActions((action) => action?.getTeams);
  const param = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [team, setTeam] = useState({});
  const [members, setMembers] = useState([]);
  const [show, setShow] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowConfirm = () => setShowConfirm(true);

  const handleCloseConfirm = () => setShowConfirm(false);

  const fetchMembers = async () => {
    const teamMembers = await TeamServices.getTeamMembers(
      state?.data?.Team?.id
    );
    if (teamMembers?.status === true) setMembers(teamMembers?.data);
  };

  const deleteTeam = async () => {
    const deleteTeam = await TeamServices.delete({ id: team?.id || "" });
    if (deleteTeam?.status === true) {
      await getTeams();
      MyRoute.to(
        navigate,
        MyRoute.dashboard.subRoutes.teams.route.split(":id")[0].concat("0"),
        { replace: true }
      );
      handleCloseConfirm();
    }
  };

  const handleMemberDelete = async (data) => {
    const deleteTeamMember = await TeamServices.deleteTeamMember(data);
    if (deleteTeamMember?.status === true) {
      await getTeams();
      MyRoute.to(
        navigate,
        MyRoute.dashboard.subRoutes.teams.route.split(":id")[0].concat(state?.data?.Team?.id),
        { replace: true }
      );
      handleCloseConfirm();
    }
  };

  useEffect(() => {
    setTeam(state?.data?.Team);
    fetchMembers();
    return () => {};
  }, [param]);

  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-start d-flex justify-content-between ">
          <h5>{team?.name}</h5>
          {state?.data?.role === "owner" && (
            <TextButton
              value={"Invite"}
              icon={<i className="bi bi-plus"></i>}
              callBack={handleShow}
            />
          )}
        </Card.Title>
      </Card.Header>
       <Table>
          <tbody>
              {members?.map((member, index, arr) => (
                <ListTile
                  key={index}
                  uid={member?.uid}
                  isAdmin={state?.data?.role?.toLowerCase() === 'owner'}
                  name={member?.name}
                  email={member?.email}
                  photoUrl={member?.profilePhoto}
                  handleDelete={()=>handleMemberDelete({userId:member?.uid,teamId:team?.id})}
                  callback={fetchMembers}
                />
              ))}
          </tbody>
      </Table>
      <Card.Footer>
        {team && state?.data?.role?.toLowerCase() === 'owner'&& (
          <TextButton callBack={handleShowConfirm} value={"Delete Group"} />
        )}
      </Card.Footer>

      {show && <InviteEmail callback={handleClose} team={team} />}
      {showConfirm && (
        <AlertConfirm
          title={"Delete"}
          message={`Delete ${team?.name} permanently? `}
          onClose={handleCloseConfirm}
          callback={deleteTeam}
        />
      )}
  
      
    </Card>
  );
}
