import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

interface User {
    id:number,
    name: string,
    email: string, 
    password: string,
    role: string,
}

const users: User[] = []

    //a validação é dentro // essa função segue => esse passo
app.post('/users', (req,res)=> {
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

    const newUser: User = { //criando um novo usuario e suas condições
        id: users.length + 1,
        name,
        email,
        password,
        role,
    }
    users.push(newUser) //colocando o novo usuario no banco de dados (no momento sendo o USERS)
    res.status(201).json({
        data:newUser
    })
})

app.get('/users', (req,res)=> {
    res.json({
        data: users
    })
})


app.get('/users/:id', (req,res)=>{
    const id = req.params.id
    const user = users.find(u => u.id === parseInt(id))
//cada u é um objeto usuario, o u.id acessa o id do ususario em questão, que seria igual ao parseInt que converteu o id string em um number
//Se os dois forem iguais, a função find() vai retornar o primeiro usuário (u) cujo id seja igual a parseInt(id).
    if(!user) { //tudo isso acaba tornando isso um filtro, pois se o id não for o mesmo (u.id === parseInt(id)), logo, ele não é usuario
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }
} )

app.delete('/users/:id', (req,res)=> {
    const id = req.params.id
    const userIndex = users.findIndex(u => u.id === parseInt(id))

    if(userIndex === -1) { 
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }
    const deletedUser = users.splice(userIndex, 1)[0]
    res.status(200).json({
        data:deletedUser
    })
})

app.put('users/:id', (req,res)=> {
    const id = req.params.id
    const {name,email,password,role} = req.body
    
    const userIndex = users.findIndex(u => u.id === parseInt(id))
    console.log(userIndex)

    if(!users[userIndex]) { 
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User not found'
            }
        })
    }
    const updateUser = {
        id: parseInt(id),
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        password: password || users[userIndex].password,
        role: role || users[userIndex].role
    }

    users[userIndex] = updateUser
    res.status(200).json({
        data:updateUser
    })
})

app.listen(port, () => {
    console.log(`'Servidor escutando a porta ${port} em http://localhost${port}`)
})