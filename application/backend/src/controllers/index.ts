import * as Jobs from './jobs';
import * as Docs from './docs';
import * as Contacts from './contacts';
import * as Columns from './columns';
import * as Auth from './auth';
import * as AiResume from './ai_resume';
import * as AiInterviewPrep from './ai_interview_prep';

// Define a Controller interface to provide better autocompletion
interface ControllerType {
  Jobs: typeof Jobs;
  Docs: typeof Docs;
  Contacts: typeof Contacts;
  Columns: typeof Columns;
  Auth: typeof Auth;
  AiResume: typeof AiResume;
  AiInterviewPrep: typeof AiInterviewPrep;
}

export const Controller: ControllerType = {
  Jobs,
  Docs,
  Contacts,
  Columns,
  Auth,
  AiResume,
  AiInterviewPrep,
};
