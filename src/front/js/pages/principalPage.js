import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "../component/sidebar";
import { Card } from "../component/card";
import { GeneralBalance } from "../component/balanceGeneral";
import "../../styles/container.css";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../component/modal";


export const PrincipalPage = () => {
    const { store, actions } = useContext(Context)
    const [userAccounts, setUserAccounts] = useState([])
    const totalBalance = userAccounts.reduce((acc, item) => acc + item.balance, 0);
    
    let navigate = useNavigate();
    async function getAccountsUser() {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZtLJEdvHSwRXZt17-888_aVJrmBrvu6RtYBoKMpKm9sEC-AxXi3sRWKgbFwf-p4hj2-84XL-87bz_Y0G7zB8iX-0y0kE4onkjgxSurJ2xjcvjN5j0SznVQpWIrQcTHHpW6OV8NIiNT91dMN_DBpqn7Ku0inf13JGgK7eJyftdxiu-_vwQHTzVbsiQN30MKU5UG7jMXXLPbrbXHRtaabX2EnUEHxglQZieSfFmtvDEvoGq26C0ixTRdmpVddBdux-ENmx93bhGaMFMQoE6ieOHEM83IjYztMG5XWr9WXCNyA1uGfaxE2rWP9qtlcvPoOYfgN6ci_aqRSxMumE5s_yvdu62T4sRgFVhMGDTrKF4hsNtkxzk7-6yHbnQMbXGg1BrVNUA7nZp5aj6i7lp67WQpPN3HqPkM0hUFDodFluRq3WaibUehanTF0-ewI7h5X1LsMbv-lO1qi7d2QsYT2jxyfxqO17Iz9os0znyuhBTZk7naL3yyXiwLpwzk6yyLHiEotFHha8NPLbJ9qdLu_rKxVO8xQyG8xYErsUqSl-x9PArSo6oudhd59gqyVxuPsQSVcKz-trvEPExQEVUXHK8gYdpnK3HwpenhoR-GqCxXjWtG1qXiRC78se1u9qYaFloMPMnqfZjkeHQAN5y_f2-2PcaX76KvzDWCwqsuWuYk5mq4yJxc6vdF2w0A2oIpPJn-s9aIA-0G9zo2FneXGU6WH10y8G430F-E9YqNjfepj32J53HEfcQS5mcl_WV8V98etWQS7FserlTT__EW-eM1dI3UvVAHV5ptaSNhbqaI8OXBjfm0onnpmrN5QqBn3W9tQRO6q1A_H7UhRGVUb5IFb-TKC033oG4rYb__EwxNQ1rx3uaXqahbtxSDNnASci2j_jHRQOIp68krpmiZT_BTb80OYh8znnE-L-JdM25WYEoIi5WUKtjyl5P0Wi_-ZN8IkCqcCuruodh4wn9L5TjeyLeXYTcBN8ltxypEXbt6F5g");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/${store.user.id}/accounts`, requestOptions);
            const result = await response.json();
            setUserAccounts(result.result);
            console.log(result.result);

        } catch (error) {
            console.error(error);

        };
    }
    useEffect(() => {
        actions.verifyToken();
        actions.initializeStore();
        getAccountsUser()
        if (!store.auth) {
            navigate("/");
        }
    }, []);

    if (!store.auth) {
        actions.logout()
        navigate("/");
    }
    
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <h2>Balance general</h2>
                    <div className="scrollmenu">
                        <GeneralBalance balance={totalBalance} />
                    </div>
                    <div className="scrollmenu">
                        {userAccounts.map((item) => {
                            return (
                                <Card id={item.id} name={item.name} balance={item.balance} coin={item.coin} type={item.type} />
                            )

                        })}
                    </div>
                </div>
                <Modal />
            </div>
        </div>
    );
}