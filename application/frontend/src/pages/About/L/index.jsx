import React from "react";
import './style.css';

export default function AboutMe() {
    return (
        <section className="about-us">
            <div className="about">


                {/* Edit url of your profile image below
                 you can use online avatar https://www.dicebear.com/playground/
                 or upload your own image
                */}
                <img
                    src="https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Christian"
                    alt="Profile"
                    className="pic"
                />


                {/* Edit description below */}
                <div className="text">
                    <h2>About Me</h2>
                    <h5>Lorem ipsum dolor & <span>Lorem ipsum dolor</span></h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
                        natus ad sed harum itaque ullam enim quas, veniam accusantium, quia
                        animi id eos adipisci iusto molestias asperiores explicabo cum vero
                        atque amet corporis! Soluta illum facere consequuntur magni. Ullam
                        dolorem repudiandae cumque voluptate consequatur consectetur, eos
                        provident necessitatibus reiciendis corrupti!
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
};
