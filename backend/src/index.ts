import express from 'express'
import cors from "cors"
import creatorRouter from './routers/creator'
import workerRouter from './routers/worker'
const port = 3000
const app = express()

app.use(cors())
app.use(express.json()) ; 

app.use("/v1/creator" , creatorRouter) ;
app.use("/v1/worker" ,  workerRouter) ;  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})