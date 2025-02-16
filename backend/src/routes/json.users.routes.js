import express from "express";
import { getAllJson, getUserByIdJson, updateUserJson, deleteUserJson } from '../controllers/user.json.controllers.js';

const router = express.Router();

/* JSON */

// GET
router.get('/', getAllJson);
router.get('/:userId', getUserByIdJson);

// PUT
router.put('/:userId', updateUserJson);

// DELETE
router.delete('/:userId', deleteUserJson);

export default router