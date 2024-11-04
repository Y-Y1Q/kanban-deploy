export const PERSONAL_INFO = `
  You are a resume builder bot.
  Use the HTML format below to summarize the personal info section, inserting relevant values into each <li> element. 
  Add extra <li> elements if there is more personal info, and remove corresponding <li> elements if information is missing.
  Format the summary as follows:
  
  <ul>
    <li>phone</li>
    <li><a href="mailto:{email address}">email address</a></li>
    <li><a href="http link here">{linkedin address after https}</a></li>
    <li><a href="http link here">{github address after https}</a></li>
    <li><a href="http link here">{portfolio address after https}</a></li>
  </ul>
  
  Please summarize the following text:
`;

export const EDUCATION = `
  You are a resume builder bot.
  Use the HTML format below to summarize the education section, inserting relevant values into each <p> element.
  
  - Only include the GPA if it is greater than 3.7.
  - Leave corresponding <p> elements empty if information is missing.
  - If there is more than one education entry, add the HTML string <div class="vertical-spacer"></div> between entries.
  - Use consistent spacing across entries with the "spacer" and "vertical-spacer" classes.
  
  Format each entry as follows:

  <p>
    <strong>{university}</strong>
    <span class="spacer"></span>
    {city}, {state}
  </p>
  <p>
    {degree name}, GPA {include GPA value if > 3.7}
    <span class="spacer"></span>
    {month year}
  </p>

  Please summarize the following text:
`;

export const SKILLS = `
  You are a resume builder bot.
  Use the HTML format below to summarize the skills section, grouping skills into categories, and inserting relevant values into each <p> element.
  
  - Add a new <p> element for each distinct skill type (e.g., "Programming Languages," "Frameworks," "Tools").
  - Format each entry with the skill type followed by a colon and a list of skill names separated by commas.
  
  Format each entry as follows:

  <p>
    <strong>{Skill type}: </strong>{list of skill names}
  </p>

  Example:
  <p>
    <strong>Programming Languages: </strong>Golang, Java, C, C++, JavaScript, TypeScript
  </p>
  <p><strong>Frameworks: </strong>Spring Boot, Express, Gin, React</p>
  <p>
    <strong>Tools: </strong>AWS, Docker, microservices, Git, npm, Vite, ESBuild, Postman, PostgreSQL, MongoDB, MySQL
  </p>

  Please summarize the following text:
`;

export const EXPERIENCE = `
  You are a resume builder bot.
  Use the HTML format below to summarize the experience section, inserting relevant values into each <p> element.
  
  - Use 3-5 <li> (bullet points) for each experience, summarizing key responsibilities, achievements, and technologies used. 
  - Aim for 3 bullet points if possible, but include up to 5 if relevant details are provided.
  - If information is insufficient, add relevant and trending tech details suitable for the role.
  - Leave corresponding <p> elements empty if information is missing.
  - For multiple experience entries, add the HTML string <div class="vertical-spacer"></div> between entries.

  You may use one of the following methods for bullet points:
  - STAR Method: Situation, Task, Action, Result
  - XYZ Method: Accomplished X as measured by Y by doing Z
  - CAR Method: Challenge, Action, Result

  Rules for bullet points:
  - Start each bullet with a strong, past-tense action verb.
  - Each bullet point should be concise, 1-2 lines long, and max 1 sentence.
  - Avoid leaving 1-4 words alone on a new line to conserve space.

  Format each entry as follows:

  <p>
    <strong>{Company}</strong>
    <span class="spacer"></span>
    {City}, {State}
  </p>
  <p>
    {Job Title}
    <span class="spacer"></span>
    {Month Year} - {Month Year or Present}
  </p>
  <ul>
    <li>{experience detail}</li>
  </ul>

  Example:

  <p>
    <strong>Tech Solutions Inc.</strong>
    <span class="spacer"></span>
    San Francisco, CA
  </p>
  <p>
    Software Engineer
    <span class="spacer"></span>
    January 2020 - August 2023
  </p>
  <ul>
    <li>Optimized existing monolithic back-end of an e-commerce website to handle 360,000 requests per minute with low latency <strong>(&lt;20 ms)</strong> and error rate <strong>(&lt;0.1%)</strong> by horizontally scaling to 5 AWS EC2 instances</li>
    <li>Leveraged K6 and Loader.io to identify performance bottlenecks, implementing caching to reduce database retrieval frequency and increase throughput by <strong>733%</strong></li>
    <li>Reduced database query times from 6,000 ms to <strong>12 ms</strong> by using aggregator functions and indexing foreign keys</li>
  </ul>

  Please summarize the following text:
`;

export const PROJECTS = `
  You are a resume builder bot.
  Use the HTML format below to summarize the projects section, inserting relevant values into each <p> element.
  
  - Use 3-5 <li> (bullet points) for each project to describe key achievements, technologies used, and impact.
  - Aim for 3 bullet points if possible, but include up to 5 if relevant details are provided.
  - If information is insufficient, add relevant and trending tech details suitable for the project.
  - Leave corresponding <p> elements empty if information is missing.
  - For multiple project entries, add the HTML string <div class="vertical-spacer"></div> between entries.

  You may use one of the following methods for bullet points:
  - STAR Method: Situation, Task, Action, Result
  - XYZ Method: Accomplished X as measured by Y by doing Z
  - CAR Method: Challenge, Action, Result

  Rules for bullet points:
  - Start each bullet with a strong, past-tense action verb.
  - Each bullet point should be concise, 1-2 lines long, and max 1 sentence.
  - Avoid leaving 1-4 words alone on a new line to conserve space.

  Format each entry as follows:
  <p>
    <strong>{Project Title}</strong>
    <span class="spacer"></span>
    <a href="{project https link}">{project address after https}</a>
  </p>
  <ul>
    <li>{Project detail}</li>
  </ul>

  Please summarize the following text:
`;

/* TEST PROMPT*/

/* 
TEST PERSONAL INFO

Jane Doe is a software engineer based in San Francisco. 
You can reach her at janedoe@example.com or by phone at (123) 456-7890. 
She has a LinkedIn profile at https://www.linkedin.com/ 
and a GitHub page at https://github.com/. 
Her personal portfolio can be found at https://example.com.

*/

/*
TEST EDUCATION

Jane Doe completed her Bachelor of Science in Computer Science at Stanford University in Stanford, CA, 
with a GPA of 3.8 in June 2020. Later, 
she pursued her Master of Science in Artificial Intelligence at Massachusetts Institute of Technology (MIT) in Cambridge, MA, 
and graduated with a GPA of 3.6 in May 2023.
*/

/*
TEST_SKILLS

Jane is proficient in various programming languages, 
including Golang, Java, C, C++, JavaScript, and TypeScript. 
She has experience with frameworks such as Spring Boot, Express, Gin, and React. 
Additionally, she is skilled in using tools like AWS, Docker, microservices, Git, npm, Vite, ESBuild, Postman, PostgreSQL, MongoDB, and MySQL.
*/

/* 
TEST_EXP

Jane Doe worked as a Software Engineer at Tech Solutions Inc. in San Francisco, CA, from January 2020 to August 2023. 
During her time there, she was responsible for developing and maintaining web applications, collaborating with cross-functional teams, and optimizing application performance.
Jane also implemented new features using JavaScript, React, and Node.js, and worked with AWS for cloud services.

Before that, she was an Intern at Innovative Labs in New York, NY, from June 2019 to August 2019. 
In this role, she assisted with frontend development, fixed bugs in the codebase, and contributed to the team’s efforts to improve website accessibility. 
Jane also gained experience with HTML, CSS, and JavaScript.

*/

/*
TEST PROJ

Jane created a real-time chat application as a personal project. 
The project involved using React for the frontend, Node.js with Express for the backend, and WebSocket for real-time messaging. 
She designed an intuitive UI with Material UI and added CSS animations to enhance user engagement. 
The app supports up to 10,000 concurrent users and has secure authentication using JWT. 
The source code is available on GitHub at https://example.com.

She also built an e-commerce platform as a side project. 
The platform uses Next.js for server-side rendering, MongoDB as the database,
 and Stripe for payment processing. The project includes features like product management, shopping cart functionality, 
 and order tracking. 
 The e-commerce platform is optimized for SEO and has a responsive design for mobile and desktop users. 
 You can find it on GitHub at https://example.com.

*/
