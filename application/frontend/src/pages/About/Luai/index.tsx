import React from "react";

import "./style.css";

export default function AboutMe() {
  return (
    <section className="about-us">
      <div className="about">
        <img
          src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Alexander"
          alt="Profile"
          className="pic"
        />

        <div className="text">
          <h2>About Me</h2>

          <p>
            Hello my name is Luai ALmaznai, I'm a Computer Science student at SFSU. I'm looking to
            be a Product Manager or a Software Developer in the near future. Some of my hobbies are
            playing soccer, hanging out with friends, and practicing leetcode problems.
          </p>

          <div className="data">
            <a href="https://github.com" className="link">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
