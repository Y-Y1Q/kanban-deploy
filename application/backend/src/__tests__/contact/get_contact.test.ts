import { getContact } from "../../controllers/contacts/ctrl_get_contact";
import * as getContactDB from "../../db/contacts";
import { getMockReq, getMockRes } from "@jest-mock/express";

jest.mock("../../db/contacts");

describe("GET /api/contacts", () => {
  const mockContactsData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      company: "CompanyA",
      position: "Developer",
      phone_num: "1234567890",
      user_note: "Note 1",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      company: "CompanyB",
      position: "Manager",
      phone_num: "0987654321",
      user_note: "Note 2",
    },
  ];

  const { res, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  it("should return status code 200 and all contacts if no searchParam is provided", async () => {
    (getContactDB.getContacts as jest.Mock).mockResolvedValue(mockContactsData);

    const req = getMockReq({
      query: { searchParam: "" },
    });

    await getContact(req, res);

    expect(getContactDB.getContacts).toHaveBeenCalledWith("");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockContactsData);
  });

  it("should return status code 200 and filtered contacts if searchParam is provided", async () => {
    const filteredContacts = [mockContactsData[0]];
    (getContactDB.getContacts as jest.Mock).mockResolvedValue(filteredContacts);

    const req = getMockReq({
      query: { searchParam: "John" },
    });

    await getContact(req, res);

    expect(getContactDB.getContacts).toHaveBeenCalledWith("John");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(filteredContacts);
  });

  it("should return status code 404 if no contacts are found", async () => {
    (getContactDB.getContacts as jest.Mock).mockResolvedValue([]);

    const req = getMockReq({
      query: { searchParam: "NonExistent" },
    });

    await getContact(req, res);

    expect(getContactDB.getContacts).toHaveBeenCalledWith("NonExistent");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Contacts not found.");
  });

  it("should return status code 500 if there is an internal server error", async () => {
    (getContactDB.getContacts as jest.Mock).mockRejectedValue(new Error("Internal server error"));

    const req = getMockReq({
      query: { searchParam: "" },
    });

    await getContact(req, res);

    expect(getContactDB.getContacts).toHaveBeenCalledWith("");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error getting contacts: Internal server error");
  });

  it("should handle missing searchParam gracefully", async () => {
    (getContactDB.getContacts as jest.Mock).mockResolvedValue(mockContactsData);

    const req = getMockReq({
      query: {},
    });

    await getContact(req, res);

    expect(getContactDB.getContacts).toHaveBeenCalledWith("");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockContactsData);
  });

  it("should log the received searchParam", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    (getContactDB.getContacts as jest.Mock).mockResolvedValue(mockContactsData);

    const req = getMockReq({
      query: { searchParam: "John" },
    });

    await getContact(req, res);

    expect(consoleSpy).toHaveBeenCalledWith("Received searchParam: John");
    consoleSpy.mockRestore();
  });

  it("should log the fetched contacts", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    (getContactDB.getContacts as jest.Mock).mockResolvedValue(mockContactsData);

    const req = getMockReq({
      query: { searchParam: "" },
    });

    await getContact(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Fetched contacts: ${JSON.stringify(mockContactsData)}`
    );
    consoleSpy.mockRestore();
  });

  it("should log the error message on failure", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    const errorMessage = "Internal server error";
    (getContactDB.getContacts as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const req = getMockReq({
      query: { searchParam: "" },
    });

    await getContact(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(`Error getting contacts: ${errorMessage}`);
    consoleSpy.mockRestore();
  });

  it("should handle unknown error gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    (getContactDB.getContacts as jest.Mock).mockRejectedValue("Unknown error");

    const req = getMockReq({
      query: { searchParam: "" },
    });

    await getContact(req, res);

    expect(consoleSpy).toHaveBeenCalledWith("Error getting contacts: Unknown error");
    consoleSpy.mockRestore();
  });

  it("should handle empty contacts array", async () => {
    (getContactDB.getContacts as jest.Mock).mockResolvedValue([]);

    const req = getMockReq({
      query: { searchParam: "" },
    });

    await getContact(req, res);

    expect(getContactDB.getContacts).toHaveBeenCalledWith("");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Contacts not found.");
  });
});
