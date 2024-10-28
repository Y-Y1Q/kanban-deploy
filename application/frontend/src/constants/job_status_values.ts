class JobStatus {
  private id: number;
  private name: string;
  private color: string;

  private constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getColor(): string {
    return this.color;
  }

  // Define static instances for each status
  static Interested = new JobStatus(1, "Interested", "#0693E3");
  static Pending = new JobStatus(2, "Pending", "#FFC107");
  static InProgress = new JobStatus(3, "In Progress", "#008B02");
  static Offer = new JobStatus(4, "Offer", "#37D67A");
  static Declined = new JobStatus(5, "Declined", "#f47373");
  static Ghosted = new JobStatus(6, "Ghosted", "#abb8c3");
  static FollowUp = new JobStatus(7, "Follow Up", "#FD7E14");
}

export default JobStatus;
