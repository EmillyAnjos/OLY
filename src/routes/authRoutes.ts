import { Router } from "express";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";


const router = Router()

router.post('/login', async (req,res) => {
    const { email, password } = req.body

    const useRepository = AppDataSource.getRepository(User)
    const user = await useRepository.findOneBy({ email })

    if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({
            userId: user.id ,
            userRole: user.role
        },'segredo' )// caso queira expirar o token = {expireIn: 00}
        res.status(200).json({ data: {
            name: user.name,
            email: user.email,
            jwt: token
        }})
    } else{
        return res.status(401).json({
            status: 401,
            name: 'Authorization Error',
            message: 'Email or password invalid'

        })
    }
})

router.post('/logout', (req,res)=> {
    res.status(200).json({
        message: "Logout realized with sucess"
    })
})

export default router









