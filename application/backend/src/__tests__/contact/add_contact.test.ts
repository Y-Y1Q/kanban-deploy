import { addContact } from "../../controllers/contacts/addContact";
import * as addContactDB from "../../db/contacts";
import { getMockReq, getMockRes } from "@jest-mock/express";
import HttpCode from "../../constants/http_code";

jest.mock("../../db/contacts/index");

describe("POST /api/contacts/add", () => {
  const mockContactData = {
    name: "Test Name",
    email: "Test Email",
    phone_num: "1234567890",
  };

  const req = getMockReq({
    session: {
      user: { id: 1 }, // Mock user with id 1 in session
    },
    body: mockContactData,
  });

  const { res, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  it("should return status code 201 if adding contact is successful", async () => {
    (addContactDB.createContact as jest.Mock).mockResolvedValue(true);

    await addContact(req, res);

    expect(addContactDB.createContact).toHaveBeenCalledWith(
      1, // user_id
      mockContactData.name,
      mockContactData.email,
      undefined, // company
      undefined, // position
      mockContactData.phone_num,
      undefined // user_note
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.Created);
    expect(res.json).toHaveBeenCalledWith({ message: "Contact added successfully." });
  });

  it("should return status code 400 if failed to add contact", async () => {
    (addContactDB.createContact as jest.Mock).mockResolvedValue(false);

    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: mockContactData,
    });

    await addContact(req, res);

    expect(addContactDB.createContact).toHaveBeenCalledWith(
      1, // user_id
      mockContactData.name,
      mockContactData.email,
      undefined, // company
      undefined, // position
      mockContactData.phone_num,
      undefined // user_note
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to add contact." });
  });

  it("should return status code 400 if missing contact data", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {},
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing contact data." });
  });

  it("should return status code 400 if missing contact name", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "name, email, and phone_num are required fields." });
  });

  it("should return status code 400 if missing contact email", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "name, email, and phone_num are required fields." });
  });

  it("should return status code 400 if missing contact phone", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "name, email, and phone_num are required fields." });
  });

  it("should return status code 500 if there is internal error", async () => {
    const mockError = new Error("Database error");
    (addContactDB.createContact as jest.Mock).mockRejectedValue(mockError);

    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: mockContactData,
    });

    await addContact(req, res);

    expect(addContactDB.createContact).toHaveBeenCalledWith(
      1, // user_id
      mockContactData.name,
      mockContactData.email,
      undefined, // company
      undefined, // position
      mockContactData.phone_num,
      undefined // user_note
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to add contact." });
  });

  it("should return status code 400 if contact name is empty", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "",
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Contact name cannot be empty." });
  });

  it("should return status code 400 if contact email is empty", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Contact email cannot be empty." });
  });

  it("should return status code 400 if contact phone is empty", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Contact phone cannot be empty." });
  });

  it("should return status code 400 if contact email is invalid", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "invalid-email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid email format." });
  });

  it("should return status code 400 if contact phone is not a number", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "not-a-number",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Phone number must be a number." });
  });

  it("should return status code 400 if contact phone is not 10 digits", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "12345",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Phone number must be 10 digits." });
  });

  it("should return status code 400 if contact phone is not a valid phone number", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "invalid-phone",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid phone number." });
  });

  it("should return status code 400 if contact email is not unique", async () => {
    (addContactDB.createContact as jest.Mock).mockRejectedValue({ code: "ER_DUP_ENTRY" });

    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already exists." });
  });

  it("should return status code 400 if contact phone is not unique", async () => {
    (addContactDB.createContact as jest.Mock).mockRejectedValue({ code: "ER_DUP_ENTRY" });

    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Phone already exists." });
  });

  it("should return status code 201 if adding contact is successful", async () => {
    (addContactDB.createContact as jest.Mock).mockResolvedValue(true);

    await addContact(req, res);

    expect(addContactDB.createContact).toHaveBeenCalledWith(
      1, // user_id
      mockContactData.name,
      mockContactData.email,
      undefined, // company
      undefined, // position
      mockContactData.phone_num,
      undefined // user_note
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.Created);
    expect(res.json).toHaveBeenCalledWith({ message: "Contact added successfully." });
  });

  it("should return status code 400 if failed to add contact", async () => {
    (addContactDB.createContact as jest.Mock).mockResolvedValue(false);

    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: mockContactData,
    });

    await addContact(req, res);

    expect(addContactDB.createContact).toHaveBeenCalledWith(
      1, // user_id
      mockContactData.name,
      mockContactData.email,
      undefined, // company
      undefined, // position
      mockContactData.phone_num,
      undefined // user_note
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to add contact." });
  });

  it("should return status code 400 if missing contact data", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {},
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing contact data." });
  });

  it("should return status code 400 if missing contact name", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "name, email, and phone_num are required fields." });
  });

  it("should return status code 400 if missing contact email", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "name, email, and phone_num are required fields." });
  });

  it("should return status code 400 if missing contact phone", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "name, email, and phone_num are required fields." });
  });

  it("should return status code 500 if there is internal error", async () => {
    const mockError = new Error("Database error");
    (addContactDB.createContact as jest.Mock).mockRejectedValue(mockError);

    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: mockContactData,
    });

    await addContact(req, res);

    expect(addContactDB.createContact).toHaveBeenCalledWith(
      1, // user_id
      mockContactData.name,
      mockContactData.email,
      undefined, // company
      undefined, // position
      mockContactData.phone_num,
      undefined // user_note
    );
    expect(res.status).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to add contact." });
  });

  it("should return status code 400 if contact name is empty", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "",
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Contact name cannot be empty." });
  });

  it("should return status code 400 if contact email is empty", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Contact email cannot be empty." });
  });

  it("should return status code 400 if contact phone is empty", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Contact phone cannot be empty." });
  });

  it("should return status code 400 if contact email is invalid", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "invalid-email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid email format." });
  });

  it("should return status code 400 if contact phone is not a number", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "not-a-number",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Phone number must be a number." });
  });

  it("should return status code 400 if contact phone is not a number", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "not-a-number",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Phone number must be a number." });
  });

  it("should return status code 400 if contact phone is not 10 digits", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "12345",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Phone number must be 10 digits." });
  });

  it("should return status code 400 if contact phone is not a valid phone number", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "invalid-phone",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid phone number." });
  });

  it("should return status code 400 if contact email is not unique", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already exists." });
  });

  it("should return status code 400 if contact phone is not unique", async () => {
    const req = getMockReq({
      session: {
        user: { id: 1 }, // Mock user with id 1 in session
      },
      body: {
        name: "Test Name",
        email: "Test Email",
        phone_num: "1234567890",
      },
    });

    await addContact(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Phone already exists." });
  });
});
