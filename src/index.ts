import express from 'express'
import userRoutes from './routes/userRoutes'
import authRoutes from "./routes/authRoutes"
import { AppDataSource } from './DataSource'

async function startServer() {
    try {
        await AppDataSource.initialize()

    const app = express()
    const port = 3000

        app.use(express.json())
        app.use('/', authRoutes) 
        app.use('/users', userRoutes)


        app.listen(port, () => {
            console.log(`'Servidor escutando a porta ${port} em http://localhost:${port}`)
})
    } catch(e){
        throw e
    }


}

startServer()