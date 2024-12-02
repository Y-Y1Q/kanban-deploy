import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EzJobs API",
      version: "1.0.0",
      description: "API Documentation for EzJobs",
    },
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "connect.sid",
      },
    },
  },
  apis: ["./src/routes/api_docs.ts"],
};

const swaggerConfig = swaggerJsdoc(swaggerOptions);
export default swaggerConfig;
