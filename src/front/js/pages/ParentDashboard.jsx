import React, { useContext, useState, useEffect, useRef } from "react";
import ParentSideBar from "../component/leftMenuParent/ParentSideBar.jsx";
import MainDashboard from "../component/leftMenuParent/MainDashboard.jsx";
import styled from "styled-components";
import img from "./../../img/background.jpg";
import { Context } from "../store/appContext.js";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProfileForm from "../component/ProfileForm.jsx";
import ChatComponent from "../component/chatComponent";
import ParentReview from "../component/leftMenuParent/ParentReview.jsx"

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  background-image: url(${img});
  background-size: cover;
  overflow-y: auto;
  aspect-ratio: 16 / 9;
`;



const menuItems = [
  {
    key: "/dashboard/parent",
    label: "Dashboard",
    icon: <i className="bi bi-speedometer2"></i>,
  },
  {
    key: "/dashboard/parent/review",
    label: "Revisar",
    icon: <i className="bi bi-journal-check"></i>,
  },
  {
    key: "/dashboard/parent/profile",
    label: "Perfil",
    icon: <i className="bi bi-person-lines-fill"></i>,
  },
];



const ParentDashboard = () => {
  const [activeKey, setActiveKey] = useState("home");
  const { store, actions } = useContext(Context);
  const [infoEventos, setInfoEventos] = useState([]);
  const [infoEstudiantes, setInfoEstudiantes] = useState([]);
  const navigate = useNavigate();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const location = useLocation();
  const messagingDivRef = useRef(null);
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleSelect = key => {
    navigate(key);
  };

  useEffect(() => {
    if (location.state?.scrollTo === "Mensajería" && messagingDivRef.current) {
      messagingDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!store.personalInfo) {
        await actions.getParentInfo();
      }
    };

    fetchPersonalInfo();
  }, [store.personalInfo]);

  useEffect(() => {
    if (store.personalInfo) {
      setInfoEventos(store.personalInfo.calendario);
      setInfoEstudiantes(store.personalInfo.statusResume);
    }
  }, [store.personalInfo]);


  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        paddingTop: "100px",
      }}>
      <ParentSideBar
        items={menuItems}
        activeKey={activeKey}
        onSelect={handleSelect}
      />


      <Content>
        <Routes>
          <Route
            path="/"
            element={
              <MainDashboard
                dataEvents={infoEventos}
                estudiantes={infoEstudiantes}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfileForm user={store.personalInfo ?? {}} />}
          />
          <Route path="/review/:studentId?/:subject?" element={<ParentReview />} />
        </Routes>
        <div id="Mensajería" ref={messagingDivRef}>{store.isChatVisible && <ChatComponent />}</div>
      </Content>
    </div>
  );
};

export default ParentDashboard;
