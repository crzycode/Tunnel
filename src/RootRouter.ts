
    import express from 'express'
    import HomeRouter from './Routes/Home.route'
    const RootRouter = express.Router()
    
    RootRouter.use('/',HomeRouter)
    export default RootRouter
    