import React from "react";

import "./style.css";

export default function AboutMe() {
  return (
    <div className="yabout-wrapper">
      <div className="yabout-left">
        <div className="yabout-left-content">
          <div>
            <div className="yshadow">
              <div className="yabout-img">
                <img src="/doge.jpg" alt="about image" />
              </div>
            </div>

            <h2>Yee Yang</h2>
            <h3>csc648-01-fa24-Team01 Git Master</h3>
          </div>
        </div>
      </div>

      <div className="yabout-right">
        <h1>
          Hello<span>!</span>
        </h1>
        <h2>Here's who I am & what I do</h2>
        <div className="yabout-btns">
          <button
            type="button"
            className="ybtn ybtn-pink"
            onClick={() => (window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0")}
          >
            Resume
          </button>
          <button
            type="button"
            className="ybtn ybtn-white"
            onClick={() => (window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0")}
          >
            GitHub
          </button>
        </div>

        <div className="yabout-para">
          <p className="yabout-p">
            I'm a CS student at San Francisco State University, specializing in backend development
            with <b>Go</b>, <b>Express.js</b> <b>Java Spring Boot</b>. I can also handle simple
            frontend tasks with <b>JavaScript/TypeScript & React</b>. I’m looking for <b>2025</b>{" "}
            summer SDE internship.
          </p>
          <p className="yabout-p">
            In my free time, I enjoy skiing and video gaming! Recently playing Elden Ring and Black
            Myth: Wukong.
          </p>
        </div>
      </div>
    </div>
  );
}
