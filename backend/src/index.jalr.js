import express from 'express'
const app = express();

app.use(express.json())

import filmesRoutes from './routes/filmes.routes.js'

app.use('/filmes', filmesRoutes)


app.listen(4000);
