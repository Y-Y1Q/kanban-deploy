import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";

export default function AboutUs(){
    const navigate = useNavigate();

    const teamMembers = [
        {
            name: "Rishita Meharishi",
            role: "Team Leader",
            path: "/about/rishita",
            img: "https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
        },
        {
            name: "Luai Almaznai",
            role: "Frontend Lead",
            path: "/about/luai",
            img: "https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
        },
        {
            name: "L Chow",
            role: "Backend Lead",
            path: "/about/l",
            img: "https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
        },
        {
            name: "Salah Hussain",
            role: "Github Master",
            path: "/about/salah",
            img: "https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
        },
        {
            name: "Zaw Win Tun",
            role: "Scrum Master",
            path: "/about/zaw",
            img: "https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
        },
        {
            name: "Yee Yang",
            role: "Support",
            path: "/about/yee",
            img: "https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
        },
    ];

    const handleCardClick = (path) => {
        navigate(`${path}`);
    };

    return (
        <section>
            <div className="row">
                <h1 className="about-h1">SFSU CSC648 Fall 2024</h1>
                <h2 className="about-h2">Section 01 Team 01</h2>
            </div>
            <div className="row">
                {teamMembers.map((member, index) => (
                    <div className="column" key={index}>
                        <div className="card" onClick={() => handleCardClick(member.path)}>
                            <div className="img-container">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                />
                            </div>
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};