import React from "react";
import './style.css';

export default function AboutMe() {
    return (
        <section className="zabout-us">
            <div className="zabout">


                {/* Edit url of your profile image below
                 you can use online avatar https://www.dicebear.com/playground/
                 or upload your own image
                */}
                <img
                    src="https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
                    alt="Profile"
                    className="zpic"
                />

                <div className="ztext">
                    <h2>About Me</h2>
                    <h5>hello & <span>welcome</span></h5>
                    <p>
                    Hi, My name is Zaw Win Tun. I am studying at SFSU. I work part-time and am studying full-time this semester. 
                    In my free time, I like to hang out with friends, go hiking, try new restaurants, and play games, and even when 
                    I have more time, I do go on trips or visit new cities that I have never been to. 
                        
                    </p>

                    <div className="zdata">
                        <a href="https://github.com" className="zlink">
                            GitHub
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};
