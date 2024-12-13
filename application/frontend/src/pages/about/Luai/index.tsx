import styles from "./style.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.about}>
        <img
          src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Alexander"
          alt="Profile"
          className={styles.pic}
        />

        <div className={styles.text}>
          <h2>About Me</h2>

          <p>
            Hello my name is Luai ALmaznai, I'm a Computer Science student at SFSU. I'm looking to
            be a Product Manager or a Software Developer in the near future. Some of my hobbies are
            playing soccer, hanging out with friends, and practicing leetcode problems.
          </p>

          <div className={styles.data}>
            <a href="https://github.com" className={styles.link}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
