import express, {Router} from 'express'
import userRouter from './user'
import checkInRouter from './checkin'
import habitRouter from './habit'
const mainRouter = express.Router();

mainRouter.use('/user', userRouter)
mainRouter.use('/checkin', checkInRouter)
mainRouter.use('/habit', habitRouter)

export default mainRouter