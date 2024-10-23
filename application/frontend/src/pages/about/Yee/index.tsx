import styles from "./style.module.css";

export default function AboutMe() {
  return (
    <div className={styles.yaboutWrapper}>
      <div className={styles.yaboutLeft}>
        <div className={styles.yaboutLeftContent}>
          <div>
            <div className={styles.yshadow}>
              <div className={styles.yaboutImg}>
                <img src="/img/doge.jpg" alt="about image" />
              </div>
            </div>

            <h2>Yee Yang</h2>
            <h3>csc648-01-fa24-Team01 Git Master</h3>
          </div>
        </div>
      </div>

      <div className={styles.yaboutRight}>
        <h1>
          Hello<span>!</span>
        </h1>
        <h2>Here's who I am & what I do</h2>
        <div className={styles.yaboutBtns}>
          <button
            type="button"
            className={`${styles.ybtn} ${styles.ybtnPink}`}
            onClick={() => (window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0")}
          >
            Resume
          </button>
          <button
            type="button"
            className={`${styles.ybtn} ${styles.ybtnWhite}`}
            onClick={() => (window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0")}
          >
            GitHub
          </button>
        </div>

        <div className={styles.yaboutPara}>
          <p className={styles.yaboutP}>
            I'm a CS student at San Francisco State University, specializing in backend development
            with <b>Go</b>, <b>Express.js</b> <b>Java Spring Boot</b>. I can also handle simple
            frontend tasks with <b>JavaScript/TypeScript & React</b>. I’m looking for <b>2025</b>{" "}
            summer SDE internship.
          </p>
          <p className={styles.yaboutP}>
            In my free time, I enjoy skiing and video gaming! Recently playing Elden Ring and Black
            Myth: Wukong.
          </p>
        </div>
      </div>
    </div>
  );
}
