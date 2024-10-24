-- Up Migration

-- Mock data for testing
-- Insert into users table, pwd: SFSUcsc648
INSERT INTO users (username, email, password) 
VALUES ('test', 'test@example.com', '$2a$12$rIm35EX/UiFlj72.IIG7b.l7.czeUdFpmfIehsdBhhCRY8o/ZdJ2e');

-- Insert into columns table
INSERT INTO columns (name, position, color) 
VALUES 
('Interested', 1, '#0693E3'),
('Pending', 2, '#9900ef'),
('In Progress', 3, '#008B02'),
('Offer', 4, '#37D67A'),
('Declined', 5, '#f47373'),
('Ghosted', 6, '#abb8c3'),
('Follow Up', 7, '#ff6900');

-- Insert into jobs table
INSERT INTO jobs (user_id, column_id, current_status, company, position, salary, type, location, link, description, user_note, date_applied, date_scheduled)
VALUES 
(1, 1, 'Interested', 'Company A', 'Software Engineer', '80k', 'Full-Time', 'San Jose', 'https://example.com/job1', 'Job description 1', 'Excited about this role', '2024-01-01', '2024-01-15 10:00:00'),
(1, 2, 'Pending', 'Company B', 'Data Scientist', '85k', 'Contract', 'New York', 'https://example.com/job2', 'Job description 2', 'Awaiting response', '2024-02-01', '2024-02-20 15:00:00'),
(1, 3, 'In Progress', 'Company C', 'Backend Developer', '90k', 'Full-Time', 'Chicago', 'https://example.com/job3', 'Job description 3', 'Scheduled interview', '2024-03-01', '2024-03-10 11:00:00'),
(1, 4, 'Offer', 'Company D', 'Frontend Developer', '100k', 'Part-Time', 'Los Angeles', 'https://example.com/job4', 'Job description 4', 'Offer accepted', '2024-04-01', '2024-04-15 14:00:00'),
(1, 5, 'Declined', 'Company E', 'Product Manager', '110k', 'Full-Time', 'Houston', 'https://example.com/job5', 'Job description 5', 'Declined offer', '2024-05-01', '2024-05-25 12:00:00'),
(1, 6, 'Ghosted', 'Company F', 'UI/UX Designer', '95k', 'Full-Time', 'Austin', 'https://example.com/job6', 'Job description 6', 'No response from recruiter', '2024-06-01', '2024-06-20 16:00:00'),
(1, 7, 'Follow Up', 'Company G', 'Mobile Developer', '105k', 'Remote', 'Remote', 'https://example.com/job7', 'Job description 7', 'Following up', '2024-07-01', '2024-07-30 09:00:00'),
(1, 1, 'Interested', 'Company H', 'DevOps Engineer', '115k', 'Full-Time', 'San Francisco', 'https://example.com/job8', 'Job description 8', 'Initial interest', '2024-08-01', '2024-08-10 10:30:00'),
(1, 2, 'Pending', 'Company I', 'Cloud Architect', '120k', 'Contract', 'Seattle', 'https://example.com/job9', 'Job description 9', 'Pending feedback', '2024-09-01', '2024-09-20 13:00:00'),
(1, 3, 'In Progress', 'Company J', 'Fullstack Developer', '125k', 'Full-Time', 'Boston', 'https://example.com/job10', 'Job description 10', 'Second round of interviews', '2024-10-01', '2024-10-15 11:30:00');

-- Insert into docs table
INSERT INTO docs (user_id, title, filepath)
VALUES 
(1, 'Resume', '/files/testuser_resume.pdf'),
(1, 'Cover Letter', '/files/testuser_cover_letter.pdf'),
(1, 'Portfolio', '/files/testuser_portfolio.pdf'),
(1, 'Reference Letter', '/files/testuser_reference_letter.pdf'),
(1, 'Recommendation Letter', '/files/testuser_recommendation_letter.pdf'),
(1, 'Technical Assessment', '/files/testuser_assessment.pdf'),
(1, 'Certification', '/files/testuser_certification.pdf'),
(1, 'Diploma', '/files/testuser_diploma.pdf'),
(1, 'Job Offer', '/files/testuser_job_offer.pdf'),
(1, 'Contract', '/files/testuser_contract.pdf');

-- Insert into doc_jobs table
INSERT INTO doc_jobs (doc_id, job_id)
VALUES 
(1, 1), (2, 1), (3, 2), (4, 3), (5, 4), 
(6, 5), (7, 6), (8, 7), (9, 8), (10, 9);

-- Insert into contacts table
INSERT INTO contacts (user_id, name, position, company, email, phone_num, user_note)
VALUES 
(1, 'John Doe', 'Recruiter', 'Company A', 'john.doe@companya.com', '123-456-7890', 'First point of contact'),
(1, 'Jane Smith', 'Hiring Manager', 'Company B', 'jane.smith@companyb.com', '987-654-3210', 'Provided detailed feedback'),
(1, 'Alice Johnson', 'HR', 'Company C', 'alice.johnson@companyc.com', '555-555-5555', 'Very supportive during interviews'),
(1, 'Bob Brown', 'CTO', 'Company D', 'bob.brown@companyd.com', '111-111-1111', 'Offered mentorship'),
(1, 'Sara Davis', 'CEO', 'Company E', 'sara.davis@companye.com', '222-222-2222', 'Final decision maker'),
(1, 'Mark White', 'Team Lead', 'Company F', 'mark.white@companyf.com', '333-333-3333', 'Discussed team culture'),
(1, 'Lisa Black', 'VP of Engineering', 'Company G', 'lisa.black@companyg.com', '444-444-4444', 'Discussed growth opportunities'),
(1, 'Tom Green', 'DevOps Engineer', 'Company H', 'tom.green@companyh.com', '555-666-7777', 'Technical deep dive'),
(1, 'Emily Purple', 'Cloud Architect', 'Company I', 'emily.purple@companyi.com', '666-777-8888', 'Followed up after interview'),
(1, 'James Blue', 'Product Manager', 'Company J', 'james.blue@companyj.com', '777-888-9999', 'Offered support during process');

-- Insert into contact_jobs table
INSERT INTO contact_jobs (contact_id, job_id)
VALUES 
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), 
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

-- Insert into ai_resume table
INSERT INTO ai_resume (user_id, doc_id, personal_information, relevant_skills, education, experience, projects)
VALUES 
(1, 1, 'Test User - San Jose, CA', 'JavaScript, React, Node.js', 'B.S. Computer Science', 'Software Engineer at XYZ', 'Built Kanban board app'),
(1, 2, 'Test User - San Jose, CA', 'Python, Data Science', 'M.S. Data Science', 'Data Analyst at ABC Corp', 'Developed data analysis tool'),
(1, 3, 'Test User - San Jose, CA', 'DevOps, AWS, Docker', 'B.S. Information Technology', 'DevOps Engineer at DEF Ltd.', 'Automated deployment pipelines'),
(1, 4, 'Test User - San Jose, CA', 'Fullstack, HTML, CSS', 'B.S. Software Engineering', 'Frontend Developer at GHI Inc.', 'Redesigned frontend UI'),
(1, 5, 'Test User - San Jose, CA', 'Cloud Computing, Kubernetes', 'M.S. Cloud Computing', 'Cloud Engineer at JKL Tech', 'Managed cloud infrastructure'),
(1, 6, 'Test User - San Jose, CA', 'Project Management, Agile', 'MBA', 'Product Manager at MNO Inc.', 'Led cross-functional team'),
(1, 7, 'Test User - San Jose, CA', 'Mobile Development, Swift', 'B.S. Mobile Computing', 'iOS Developer at PQR Mobile', 'Built mobile application'),
(1, 8, 'Test User - San Jose, CA', 'Cybersecurity, Penetration Testing', 'M.S. Cybersecurity', 'Security Engineer at STU Security', 'Secured enterprise systems'),
(1, 9, 'Test User - San Jose, CA', 'AI, Machine Learning', 'Ph.D. in AI', 'ML Engineer at VWX AI', 'Developed AI models'),
(1, 10, 'Test User - San Jose, CA', 'Blockchain, Cryptography', 'B.S. Cryptography', 'Blockchain Developer at YZ Crypto', 'Created blockchain solutions');

-- Insert into ai_interview_prep table
INSERT INTO ai_interview_prep (user_id, company, job_position, job_description, ai_response)
VALUES 
(1, 'Company A', 'Software Engineer', 'Develop and maintain software applications.', 'Describe a project where you had to solve a complex problem.'),
(1, 'Company B', 'Data Scientist', 'Analyze large datasets to find insights.', 'Tell me about a time you worked with unstructured data.'),
(1, 'Company C', 'Backend Developer', 'Design backend systems and APIs.', 'Explain your experience with RESTful APIs.'),
(1, 'Company D', 'Frontend Developer', 'Create responsive web applications.', 'What challenges have you faced with cross-browser compatibility?'),
(1, 'Company E', 'Product Manager', 'Lead product development efforts.', 'How do you prioritize features in a product roadmap?'),
(1, 'Company F', 'UI/UX Designer', 'Design user interfaces and improve UX.', 'How do you incorporate user feedback into design?'),
(1, 'Company G', 'Mobile Developer', 'Build and maintain mobile applications.', 'Tell me about your experience with mobile app performance optimization.'),
(1, 'Company H', 'DevOps Engineer', 'Automate deployment pipelines.', 'Describe your experience with CI/CD pipelines.'),
(1, 'Company I', 'Cloud Architect', 'Design cloud infrastructure solutions.', 'What cloud services have you worked with, and how did you optimize costs?'),
(1, 'Company J', 'Fullstack Developer', 'Develop both frontend and backend applications.', 'How do you ensure efficient communication between frontend and backend systems?');

-- Down Migration