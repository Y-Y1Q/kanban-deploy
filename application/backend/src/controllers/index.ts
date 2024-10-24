import * as AiInterviewPrep from "./ai_interview_prep";
import * as AiResume from "./ai_resume";
import * as Auth from "./auth";
import * as Contacts from "./contacts";
import * as Docs from "./docs";
import * as Jobs from "./jobs";

// Define a Controller interface to provide better autocompletion
interface ControllerType {
  Jobs: typeof Jobs;
  Docs: typeof Docs;
  Contacts: typeof Contacts;
  Auth: typeof Auth;
  AiResume: typeof AiResume;
  AiInterviewPrep: typeof AiInterviewPrep;
}

export const Controller: ControllerType = {
  Jobs,
  Docs,
  Contacts,
  Auth,
  AiResume,
  AiInterviewPrep,
};
