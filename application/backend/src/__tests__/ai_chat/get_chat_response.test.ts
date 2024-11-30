import { getMockReq, getMockRes } from "@jest-mock/express";
import { getChatbotResponse } from "../../controllers/ai_interview_prep/ctrl_generateQuestions";
import OpenAI from "openai";

jest.mock("openai");

describe("getChatbotResponse", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = getMockReq();
    res = getMockRes().res;
  });

  test("should return 400 if no message is provided", async () => {
    req.body = {};

    await getChatbotResponse(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Message is required" });
  });

  test("should return 200 with chatbot response", async () => {
    req.body = { message: "Hello" };

    const mockResponse = {
      choices: [
        {
          message: {
            content: "Hello, how can I help you?",
          },
        },
      ],
    };

    (OpenAI.prototype.chat as any) = {
      completions: {
        create: jest.fn().mockResolvedValue(mockResponse),
      },
    };

    await getChatbotResponse(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Hello, how can I help you?" });
  });

  test("should return 500 if OpenAI API response error occurs", async () => {
    req.body = { message: "Hello" };

    const mockError = {
      response: {
        data: "API response error",
      },
    };
    (OpenAI.prototype.chat as any) = {
      completions: {
        create: jest.fn().mockRejectedValue(mockError),
      },
    };

    await getChatbotResponse(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to get response from chatbot" });
  });

  test("should return 500 if no response received from OpenAI API", async () => {
    req.body = { message: "Hello" };

    const mockError = {
      request: {},
    };
    (OpenAI.prototype.chat as any) = {
      completions: {
        create: jest.fn().mockRejectedValue(mockError),
      },
    };

    await getChatbotResponse(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to get response from chatbot" });
  });

  test("should return 500 if an unknown error occurs", async () => {
    req.body = { message: "Hello" };

    const mockError = new Error("Unknown error");
    (OpenAI.prototype.chat as any) = {
      completions: {
        create: jest.fn().mockRejectedValue(mockError),
      },
    };

    await getChatbotResponse(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to get response from chatbot" });
  });
});
