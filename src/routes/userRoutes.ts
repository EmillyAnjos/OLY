import { Router } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../DataSource";
import { Role } from "../entity/Role";
import bcrypt from 'bcryptjs'
import { authenticateJWT } from "../middleware/authMiddleware";


const router = Router()

router.use(authenticateJWT)

    //a validação é dentro // essa função segue => esse passo
router.post('/', async(req,res)=> {
    const {id, name, email,password, role} = req.body //pedindo isso ao usuario

    if(!name||!email || !password || !role){ //condição de filtro, se isso e isso.. n for preenchido
        return res.status(400).json({ //retorne o codigo de erro
            error: {
                status: 400,
                name: 'Validation error',
                message: 'You missed a require field'
            }
        })
    }
    const useRepository = AppDataSource.getRepository(User)
    const roleRepository = AppDataSource.getRepository(Role)

    let roleInDB = await roleRepository.findOne({ where:{name:role}})

    if(!roleInDB){
        roleInDB = roleRepository.create({name:role})
        await roleRepository.save(roleInDB)
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser: User = useRepository.create({ //criando um novo usuario e suas condições
       
        name,
        email,
        password: hashedPassword,
        role: roleInDB
    })
    await useRepository.save(newUser)
    res.status(201).json({
        data:newUser
    })
})

router.get('/', async(req,res)=> {
    const useRepository = AppDataSource.getRepository(User)
    const users = await useRepository.find({relations: ['role']})
    res.json({
        data: users
    })
})


router.get('/:id', async(req,res)=>{
    const id = req.params.id
    const useRepository = AppDataSource.getRepository(User)
    const user = await useRepository.findOne({
        where: {
        id:parseInt(id)
    },relations: ['role']
})

    if(!user) { //tudo isso acaba tornando isso um filtro, pois se o id não for o mesmo (u.id === parseInt(id)), logo, ele não é usuario
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }

    return res.status(200).json({
        data:user
    })
} )

router.delete('/:id', async(req,res)=> {
    const id = req.params.id
    const useRepository = AppDataSource.getRepository(User)
    const user = await useRepository.findOne({
        where: {
        id:parseInt(id)
    },relations: ['role']
})

    if(!user) { 
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }
    useRepository.remove(user)
    res.status(200).json({
        data:user
    })
})

router.put('/:id', async (req,res)=> {
    const id = req.params.id
    const {name,email,password,role} = req.body


    const useRepository = AppDataSource.getRepository(User)
    const roleRepository = AppDataSource.getRepository(Role)

    const user = await useRepository.findOne({
        where: {
            id:parseInt(id)
        },relations: ['role']
    })

    if(!user){ 
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }

    let roleInDB = await roleRepository.findOne({ where:{name:role}})

    if(!roleInDB){
        roleInDB = roleRepository.create({name:role})
        await roleRepository.save(roleInDB)
    }

      user.name = name || user.name
      user.email = email || user.email
      user.password = password || user.password
      user.role = roleInDB
    

    useRepository.save(user)
    res.status(200).json({
        data:  user
    })
} )

export default router