import { Router } from 'express';
import { createContact, retrieveContactById, updateContactEmail, deleteContact } from '../controllers/contactController';

const router = Router();

router.post('/contact', createContact);
router.get('/contact/:id', retrieveContactById);
router.put('/contact/email', updateContactEmail);
router.delete('/contact/:id', deleteContact);

export default router;