import express from 'express';
import { cancelStatusImportNote, createImportNoteWithImportNoteDetail, getImportAndImportDetails, getImportNoteById, updateStatusImportNote } from '../controller/ImportNoteController.js';
const router   = express.Router();
router.get('/get-import-note',getImportAndImportDetails)  // con loi 
router.post('/create-import-note',createImportNoteWithImportNoteDetail) //con loi
router.get('/get-import-note-by-id/:idImportNote',getImportNoteById)
router.patch('/update-status-import-note/:idImportNote',updateStatusImportNote);//ok
router.patch('cancel-status-import-note/:idImportNote',cancelStatusImportNote); // ok 
export default router;