/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Table,ProgressBar} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertConfirm, AuthTitle, InviteEmail, ListTile, TextButton } from "../Components";
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
  const [progress, setProgress] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowConfirm = () => setShowConfirm(true);

  const handleCloseConfirm = () => setShowConfirm(false);

  const fetchMembers = async () => {
    
    if(!state?.data?.Team?.id) return;
    setProgress(true);
    const teamMembers = await TeamServices.getTeamMembers(
      state?.data?.Team?.id
    );
    if (teamMembers?.status === true) setMembers(teamMembers?.data);
    if (teamMembers?.status === false) setMembers([]);
    setProgress(false)
  };

  const deleteTeam = async () => {
    if(!team?.id || team?.id === '') {
      setShowConfirm(false);
      return;
    }
    setProgress(true)
    const deleteTeam = await TeamServices.delete({ id: team?.id });
    setProgress(false)
    if (deleteTeam?.status === true) {
      setTeam(undefined);
      handleCloseConfirm();
      // await getTeams();
      setMembers([]);
      MyRoute.to(
        navigate,
        MyRoute.dashboard.subRoutes.teams.route.split(":id")[0].concat("0"),
        { replace: true }
      );

      setTimeout(()=>window.location.reload(),500)
    
    }
  };

  const handleMemberDelete = async (data) => {
    setProgress(true)
    const deleteTeamMember = await TeamServices.deleteTeamMember(data);
    setProgress(false)
    if (deleteTeamMember?.status === true) {
      const newMembers = members.filter((val)=>val?.uid !== data?.userId);
      setMembers(newMembers);
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
          <h5>{team?.name || ''}</h5>
          {state?.data?.role === "owner" && (
            <TextButton
              value={"Invite"}
              icon={<i className="bi bi-plus"></i>}
              callBack={handleShow}
              style={{fontWeight: 700}}
            />
          )}
        </Card.Title>
      </Card.Header>
    <Card.Body>
     { progress && <ProgressBar animated striped  now={100} />}
      {!progress && <Table>
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
      </Table>}
      {(members?.length < 1 && !progress) && <AuthTitle title={'no selected team'} style={{ fontSize: 12, color:'grey' }} />}

    </Card.Body>
      <Card.Footer>
        {team && state?.data?.role?.toLowerCase() === 'owner'&& (
          <TextButton callBack={handleShowConfirm} value={"Delete Group"} style={{fontWeight:700}} />
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
