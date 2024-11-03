// resume.ts

interface Resume {
  fullname: string;
  ai_info: string | null;
  ai_edu: string | null;
  ai_skills: string | null;
  ai_exp: string | null;
  ai_proj: string | null;
}

const resume_test: Resume = {
  fullname: "Test Name",
  ai_info: `<ul>
      <li>PHONE</li>
      <li>
        <a href="mailto:{EMAIL}">EMAIL</a>
      </li>
      <li>
        <a href="https://linkedin.com">LINKEDIN</a>
      </li>
      <li>
        <a href="https://github.com">GITHUB</a>
      </li>
      <li>
        <a href="https://example.com">PORTFOLIO</a>
      </li>
    </ul>`,
  ai_edu: `<p>
      <strong>University of XXX</strong> - Bachelors of Science, Computer
      Science, GPA (only &gt;= 3.7)
      <span class="spacer"></span>
      Graduation Month Year
    </p>`,
  ai_skills: `<p>
      <strong>Front End</strong> | React, NextJS, Javascript, TypeScript,
      Material UI
    </p>
    <p>
      <strong>Back End</strong> | Golang, Java, C, C++, PostgreSQL, MongoDB,
      MySQL, Spring Boot, Express, Gin
    </p>
    <p>
      <strong>Testing/Deployment</strong> | Jest, Mocha, Chai, AWS:EC2, AWS:ECS,
      Terraform, JUnit
    </p>
    <p>
      <strong>Developer Tools</strong> | Docker, microservices, Git, npm, Vite,
      ESBuild, Postman
    </p>`,

  ai_exp: `<p>
    <strong>Job Title, Company</strong> - City, State
    <span class="spacer"></span>
    Month Year - Present
  </p>
  <ul>
    <li>STAR - Situation Task Action Result</li>
    <li>XYZ - Accomplished X as measured by Y by doing Z</li>
    <li>CAR - Challenge Action Result</li>
  </ul>

  <div class="vertical-spacer"></div>
  <p>
    <strong>Job Title, Company</strong> - City, State
    <span class="spacer"></span>
    Month Year - Month Year
  </p>
  <ul>
    <li>Start each bullet with a strong, past-tense action verb</li>
    <li>
      Each bullet point should be 1-2 lines long and max 1 sentence long.
    </li>
    <li>
      Don't let bullets spill onto the next line with only 1-4 words on it,
      it's a huge waste of space
    </li>
  </ul>

  <div class="vertical-spacer"></div>
  <p>
    <strong>Job Title, Company</strong> - City, State
    <span class="spacer"></span>
    Month Year - Month Year
  </p>
  <ul>
    <li>
      Optimized existing monolithic back-end of an e-commerce website to
      handle 360,000 requests per minute with low latency
      <strong>(&lt;20 ms)</strong> and error rate
      <strong>(&lt;0.1%)</strong> by horizontally microservice to 5 AWS EC2
      instances
    </li>
    <li>
      Leveraged K6 and Loader.io to identify performance bottlenecks, then
      implemented caching to lower frequency of database retrieval to allow
      for a throughput increase of <strong>733%</strong>
    </li>
    <li>
      Reduced query times to database from 6,000 ms to
      <strong>12 ms</strong> by using aggregator functions and indexing
      foreign keys
    </li>
  </ul>`,

  ai_proj: `<p>
      <strong>Project Title</strong>
      <span class="spacer"></span>
      project-link.com
    </p>
    <ul>
      <li>
        The more work experience you have, the less relevant outside-work
        projects tend to become
      </li>
      <li>
        If you have something that really stands out, consider listing it here
      </li>
      <li>
        Implemented server-side rendering with Next.js to improve page load
        time, achieving Lighthouse SEO score of 100
      </li>
    </ul>
  
    <div class="vertical-spacer"></div>
  
    <p>
      <strong>Project Title</strong>
      <span class="spacer"></span>
      project-link.com
    </p>
    <ul>
      <li>
        Only list real projects, not mandatory school projects or trivial
        tutorial projects found online
      </li>
      <li>Something that someone uses to solve a problem</li>
      <li>
        Something that has users (can be just you, as long as you use it often)
        and is actively maintained and not just rotting in a GitHub repo, never
        to see a PR for the rest of its life
      </li>
    </ul>`,
};

export default resume_test;
