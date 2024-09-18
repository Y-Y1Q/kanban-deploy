import React from 'react';
import './style.css';


export default function AboutMe() {
  return (
    <div className="luaiabout-wrapper">
      <div className="luaiabout-left">
        <div className="luaiabout-left-content">
          <div>
            <div className="luaishadow">
              <div className="luaiabout-img">
                <img src="https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian" alt="about image" />
              </div>
            </div>

            <h2>Luai Almaznai</h2>
            <h3>Description</h3>
          </div>
        </div>
      </div>

      <div className="luaiabout-right">
        <h1>
          Hello<span>!</span>
        </h1>
        <h2>Here's who I am & what I do</h2>
        <div className="luaiabout-btns">
          <button
            type="button"
            className="luaibtn btn-pink"
            onClick={() => window.location.href = 'http://www.google.com'}
          >
            Resume / CV
          </button>
          <button
            type="button"
            className="luaibtn btn-white"
            onClick={() => window.location.href = 'http://www.github.com'}
          >
            GitHub
          </button>
        </div>

        <div className="luaiabout-para">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, aspernatur possimus ullam quaerat, laboriosam ex voluptate aliquid laborum, obcaecati ratione accusamus! Ea nisi modi dolor nam numquam? Temporibus, molestias amet.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus iure tempora alias laudantium sapiente impedit!
          </p>
        </div>
      </div>
    </div>
  );
};
