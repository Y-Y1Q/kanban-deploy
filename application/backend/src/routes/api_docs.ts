/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Sign up a new user
 *     description: Register a new user with a username, password, and email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: Password123
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Sign in a user
 *     description: Allows a user to sign in by providing valid credentials. Creates a session upon successful login.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       400:
 *         description: Bad Request - Missing fields or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Retrieve jobs for the authenticated user
 *     description: Fetch all job applications associated with the authenticated user.
 *     tags:
 *       - Jobs
 *     security:
 *           - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The job ID
 *                       title:
 *                         type: string
 *                         description: The job title
 *                       company:
 *                         type: string
 *                         description: The company name
 *                       status:
 *                         type: string
 *                         description: The job application status
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/jobs/add:
 *   post:
 *     summary: Add a new job entry to the specified column.
 *     description: Authenticated users can add job entries to their job application tracker.
 *     tags:
 *       - Jobs
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - column_id
 *               - jobData
 *             properties:
 *               column_id:
 *                 type: string
 *                 description: The ID of the column where the job entry will be added.
 *               jobData:
 *                 type: object
 *                 description: The job data to be added.
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the job.
 *                   company:
 *                     type: string
 *                     description: The company offering the job.
 *                   location:
 *                     type: string
 *                     description: The location of the job.
 *                   [additional fields for jobData...]:
 *                     [type & description...]
 *     responses:
 *       201:
 *         description: Job entry added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Job entry added successfully.
 *       400:
 *         description: Bad request. Missing or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to add job entry.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to add job entry.
 */

/**
 * @swagger
 * /api/contacts/search:
 *   get:
 *     summary: Search contacts by a specific parameter
 *     description: Returns a list of contacts that match the provided search parameter. Requires authentication.
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: query
 *         name: searchParam
 *         required: false
 *         schema:
 *           type: string
 *         description: A string used to search contacts.
 *     responses:
 *       200:
 *         description: A list of contacts matching the search parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the contact.
 *                   name:
 *                     type: string
 *                     description: Name of the contact.
 *                   email:
 *                     type: string
 *                     description: Email of the contact.
 *       404:
 *         description: No contacts were found matching the search parameter.
 *       500:
 *         description: Server error while retrieving contacts.
 *     security:
 *         - cookieAuth: []
 */

/**
 * @swagger
 * /api/contacts/add:
 *   post:
 *     summary: Add a new contact
 *     tags:
 *       - Contacts
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone_num
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the contact
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the contact
 *               company:
 *                 type: string
 *                 description: Company the contact is associated with
 *               position:
 *                 type: string
 *                 description: Job title of the contact
 *               phone_num:
 *                 type: string
 *                 description: Phone number of the contact
 *               user_note:
 *                 type: string
 *                 description: Additional notes about the contact
 *     responses:
 *       201:
 *         description: Contact successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the newly created contact
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 company:
 *                   type: string
 *                 position:
 *                   type: string
 *                 phone_num:
 *                   type: string
 *                 user_note:
 *                   type: string
 *       400:
 *         description: Validation error or missing session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error adding contact.
 */

/**
 * @swagger
 * /api/chatbot:
 *   post:
 *     summary: Get a chatbot response from OpenAI
 *     description: Sends a user message to the OpenAI chatbot and returns the chatbot's response.
 *     tags:
 *       - Chatbot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message sent by the user to the chatbot.
 *                 example: "Hello, how are you?"
 *     responses:
 *       200:
 *         description: Successful response from the chatbot.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message from the chatbot.
 *                   example: "I'm good, thank you! How can I help you today?"
 *       400:
 *         description: Bad Request. Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Message is required"
 *       500:
 *         description: Internal Server Error. Failed to get a response from the chatbot.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to get response from chatbot"
 */

/**
 * @swagger
 * /api/ai-resume:
 *   get:
 *     summary: Get user AI resume input
 *     description: Fetches the AI resume input for the authenticated user. If no input exists, indicates as such.
 *     tags:
 *       - AI Resume
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success response with the user's resume data or input existence status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasInput:
 *                   type: boolean
 *                   description: Indicates if the user has input data.
 *                 resumeData:
 *                   type: object
 *                   description: The user's AI resume input data (if available).
 *                   nullable: true
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
