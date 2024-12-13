import { useNavigate } from "react-router-dom";

import "./AboutUs.css";

export default function AboutUs() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Rishita Meharishi",
      role: "Team Leader",
      path: "/about/rishita",
      img: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Christian",
    },
    {
      name: "Luai Almaznai",
      role: "Frontend Lead",
      path: "/about/luai",
      img: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Alexander",
    },
    {
      name: "L Chow",
      role: "Backend Lead",
      path: "/about/l",
      img: "https://api.dicebear.com/9.x/icons/svg?seed=Chase",
    },
    {
      name: "Zaw Win Tun",
      role: "Scrum Master",
      path: "/about/zaw",
      img: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=George",
    },
    {
      name: "Yee Yang",
      role: "Github Master",
      path: "/about/yee",
      img: "/img/doge.jpg",
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <section>
      <div className="row">
        <h1 className="about-h1">SFSU CSC648 Fall 2024</h1>
        <h2 className="about-h2">Section 01 Team 01</h2>
        <p className="about-p">Team Meeting Shedule: Wed 2 - 3pm</p>
        <p className="about-p">Hi! We are building a job application tracker web app</p>
        <p className="about-p">We used text message & Discord for group communicaiton</p>
        <a className="about-p" href="/study-plan.html">
          Our study plan for next 4 weeks{" "}
        </a>
      </div>
      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="column" key={index}>
            <div className="card" onClick={() => handleCardClick(member.path)}>
              <div className="img-container">
                <img src={member.img} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
