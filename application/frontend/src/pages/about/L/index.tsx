import styles from "./style.module.css";

export default function AboutMe() {
  return (
    <section className={styles.laboutUs}>
      <div className={styles.labout}>
        <img
          src="https://api.dicebear.com/9.x/icons/svg?seed=Chase"
          alt="avatar"
          className={styles.lpic}
        />

        <div className={styles.ltext}>
          <h2>L Chow</h2>

          <h3></h3>

          <p>Hello, I'm a Senior who is on their last semester here at SFSU!</p>

          <p>
            I'm trying to become a Software Developer, preferably working in either Java or Python,
            but also trying to explore other types of jobs as well.
          </p>

          <p>
            On my free time, I enjoy watching anime, listening to music and going on hikes/walks.
          </p>

          <div className={styles.ldata}>
            <a href="https://github.com/lchowGH" className={styles.llink}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
