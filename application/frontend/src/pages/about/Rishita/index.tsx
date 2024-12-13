import styles from "./style.module.css";

export default function AboutMe() {
  return (
    <div className={styles.raboutWrapper}>
      <div className={styles.raboutLeft}>
        <div className={styles.raboutLeftContent}>
          <div>
            <div className={styles.rshadow}>
              <div className={styles.raboutImg}>
                <img src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=Christian" />
              </div>
            </div>

            <h2>Rishita Meharishi</h2>
            <h3>
              Hi, I am Rishita! My passion for improving existing technologies and contributing to
              the tech community led me to pursue computer science. I am excited to be in CSC 648
              and be a team lead. In my free time, I enjoy running, cooking, painting, and
              longboarding. I’m also a big fan of sunsets, beaches, and ice cream.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
