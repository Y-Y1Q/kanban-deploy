import { addContact } from "../../controllers/contacts/ctrl_add_contact";
import { createContact } from "../../db/contacts";
import { getMockReq, getMockRes } from "@jest-mock/express";

jest.mock("../../db/contacts");

describe("addContact controller", () => {
  const mockContact = {
    id: 1,
    user_id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Company1",
    position: "Developer",
    phone_num: "1234567890",
    user_note: "Test note",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new contact and return 201 status", async () => {
    (createContact as jest.Mock).mockResolvedValue(mockContact);

    const req = getMockReq({
      session: { user: { id: 1 } },
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Company1",
        position: "Developer",
        phone_num: "1234567890",
        user_note: "Test note",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockContact);
    expect(createContact).toHaveBeenCalledWith(
      1,
      "John Doe",
      "john.doe@example.com",
      "Company1",
      "Developer",
      "1234567890",
      "Test note"
    );
  });

  it("should return 400 status if required fields are missing", async () => {
    const req = getMockReq({
      session: { user: { id: 1 } },
      body: {
        email: "john.doe@example.com",
        phone_num: "1234567890",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "name, email, and phone_num are required fields.",
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("should return 500 status if there is an error adding the contact", async () => {
    (createContact as jest.Mock).mockResolvedValue(null);

    const req = getMockReq({
      session: { user: { id: 1 } },
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Company1",
        position: "Developer",
        phone_num: "1234567890",
        user_note: "Test note",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error adding contact.");
    expect(createContact).toHaveBeenCalled();
  });

  it("should handle unexpected errors gracefully", async () => {
    (createContact as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

    const req = getMockReq({
      session: { user: { id: 1 } },
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Company1",
        position: "Developer",
        phone_num: "1234567890",
        user_note: "Test note",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error adding contact: Unexpected error");
    expect(createContact).toHaveBeenCalled();
  });

  it("should return 400 status if session user is not available", async () => {
    const req = getMockReq({
      session: { user: null }, // Ensure user is null to simulate missing user
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Company1",
        position: "Developer",
        phone_num: "1234567890",
        user_note: "Test note",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User session is required.",
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("should return 400 status if session user is undefined", async () => {
    const req = getMockReq({
      session: { user: undefined }, // Ensure user is undefined to simulate missing user
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Company1",
        position: "Developer",
        phone_num: "1234567890",
        user_note: "Test note",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User session is required.",
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("should return 400 status if session is null", async () => {
    const req = getMockReq({
      session: null, // Ensure session is null to simulate missing session
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Company1",
        position: "Developer",
        phone_num: "1234567890",
        user_note: "Test note",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User session is required.",
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("should return 500 status with unknown error message if createContact throws a non-Error object", async () => {
    (createContact as jest.Mock).mockRejectedValue("Non-error object");

    const req = getMockReq({
      session: { user: { id: 1 } },
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Company1",
        position: "Developer",
        phone_num: "1234567890",
        user_note: "Test note",
      },
    });
    const { res } = getMockRes();

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error adding contact: Unknown error");
    expect(createContact).toHaveBeenCalled();
  });
});
