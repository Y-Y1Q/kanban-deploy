import * as AiInterviewPrep from "./ai_interview_prep";
import * as AiResume from "./ai_resume";
import * as Auth from "./auth";
import * as Contacts from "./contacts";
import * as Jobs from "./jobs";
import * as Columns from "./columns";

// Define a Controller interface to provide better autocompletion
interface ControllerType {
  Jobs: typeof Jobs;
  Columns: typeof Columns;
  Contacts: typeof Contacts;
  Auth: typeof Auth;
  AiResume: typeof AiResume;
  AiInterviewPrep: typeof AiInterviewPrep;
}

export const Controller: ControllerType = {
  Jobs,
  Columns,
  Contacts,
  Auth,
  AiResume,
  AiInterviewPrep,
};
