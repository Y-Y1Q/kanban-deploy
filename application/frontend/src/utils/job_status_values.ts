// Define the structure for each status
type StatusType = {
  id: number;
  name: string;
  color: string;
};

// Define an object to hold all status entries
const JobStatusValue: Record<string, StatusType> = {
  Interested: { id: 1, name: "Interested", color: "#0693E3" },
  Pending: { id: 2, name: "Pending", color: "#FFC107" },
  InProgress: { id: 3, name: "In Progress", color: "#008B02" },
  Offer: { id: 4, name: "Offer", color: "#37D67A" },
  Declined: { id: 5, name: "Declined", color: "#f47373" },
  Ghosted: { id: 6, name: "Ghosted", color: "#abb8c3" },
  FollowUp: { id: 7, name: "Follow Up", color: "#FD7E14" },
};

export default JobStatusValue;
