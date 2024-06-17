import express from 'express'
import { getRelationship, addRelationship, deleteRelationship} from '../controllers/realtionship.js' 
const router = express.Router()

router.get('/', getRelationship)
router.post('/', addRelationship)
router.delete('/', deleteRelationship)


export default router