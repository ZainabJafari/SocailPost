import express from 'express'
import { getUser, updateUser } from '../controllers/user.js' 
const router = express.Router()

router.get('/:userId', getUser )
router.put('/:userId', updateUser);  // Include userId in the URL

export default router