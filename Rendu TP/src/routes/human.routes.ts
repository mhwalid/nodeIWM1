//importing modules
import express from "express";
import { HumanController } from '../controllers/human.controller'

//initiating the router
export const router = express.Router()

//add human route
router.post('/',HumanController.addHuman)

//get humans
router.get('/', HumanController.getHumans)

//get single human
router.get('/:id', HumanController.getOneHuman)

//update a human
router.put('/:id', HumanController.updateHuman)

//delete a human
router.delete('/:id', HumanController.deleteHuman)