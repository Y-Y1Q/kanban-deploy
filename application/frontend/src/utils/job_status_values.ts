// Define the structure for each status
type StatusType = {
  name: string;
  color: string;
};

// Define an object to hold all status entries
const JobStatusValue: Record<string, StatusType> = {
  Interested: { name: "Interested", color: "#0693E3" },
  Pending: { name: "Pending", color: "#FFC107" },
  InProgress: { name: "In Progress", color: "#008B02" },
  Offer: { name: "Offer", color: "#37D67A" },
  Declined: { name: "Declined", color: "#f47373" },
  Ghosted: { name: "Ghosted", color: "#abb8c3" },
  FollowUp: { name: "Follow Up", color: "#FD7E14" },
};

export default JobStatusValue;
