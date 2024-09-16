import React from 'react';

export default function AboutMe() {
  return (
    <div className="about-wrapper">
      <div className="about-left">
        <div className="about-left-content">
          <div>
            <div className="shadow">
              <div className="about-img">
                <img src="https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian" alt="about image" />
              </div>
            </div>

            <h2>Your Name</h2>
            <h3>Description</h3>
          </div>
        </div>
      </div>

      <div className="about-right">
        <h1>
          Hello<span>!</span>
        </h1>
        <h2>Here's who I am & what I do</h2>
        <div className="about-btns">
          <button
            type="button"
            className="btn btn-pink"
            onClick={() => window.location.href = 'http://www.google.com'}
          >
            Resume / CV
          </button>
          <button
            type="button"
            className="btn btn-white"
            onClick={() => window.location.href = 'http://www.github.com'}
          >
            GitHub
          </button>
        </div>

        <div className="about-para">
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
