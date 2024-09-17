import React from 'react';
import './style.css';

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

            <h2>Rishita Meharishi</h2>
            <h3>Hi, I am  Rishita! My passion for improving existing technologies and 
                contributing to the tech community led me to pursue computer science.
                I am excited to be in CSC 648 and be a team lead.  In my free time, 
                I  running, cooking, painting, and longboarding. I’m also a big fan of sunsets, 
                beaches, and ice cream. 
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};