import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCash } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
import { CiHome, CiSettings } from "react-icons/ci";
import { IoAnalytics, IoPersonOutline, IoHelp } from "react-icons/io5";
import '../../styles/Navbar.css'

export function Navbar() {
	const [collapsed, setCollapsed] = useState(false);

	const toggleSidebar = () => {
		setCollapsed(!collapsed);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		location.replace("/");
	}

	return (
		<div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
			<button className="toggle-button" onClick={toggleSidebar}>
				{collapsed ? ">" : "<"}
			</button>

			<div className="sidebar-menu">
				<ul>
					<li>
						<CiHome /> <Link to="/home">Home</Link>
					</li>
					<li>
						<BsCash /> <Link to="/currency">Currency Conversion</Link>
					</li>
					<li>
						<FaRegEnvelope /> <Link to="/messages">Messages</Link>
					</li>
					<li>
						<IoAnalytics /> <Link to="/analytics">Analytics</Link>
					</li>
					<li>
						<MdOutlineGroups /> <Link to="/groups">Groups</Link>
					</li>
					<li>
						<IoPersonOutline /> <Link to="/profile">Profile</Link>
					</li>
					<li>
						<CiSettings /> <Link to="/settings">Settings</Link>
					</li>
				</ul>
			</div>

			<div className="sidebar-bottom">
				<ul>
					<li>
						<IoHelp /> <Link to="/help">Help</Link>
					</li>
					<li className="logout">
						<IoIosLogOut /> <Link to="/" onClick={handleLogout}>Logout</Link>
					</li>
				</ul>
			</div>

			<div className="sidebar-footer">
				<span>© 2025 SafeHaven</span>
			</div>
		</div>
	);
};
