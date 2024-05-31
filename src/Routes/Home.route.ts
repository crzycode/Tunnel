
import express from 'express'
import { HomeController } from '../Modules/HomeModule/Controllers/HomeController'

const HomeRouter = express.Router()
HomeRouter.get("/",HomeController.Home)
export default HomeRouter
