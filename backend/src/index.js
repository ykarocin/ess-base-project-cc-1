import express from 'express'
import likeRoutes from './routes/like.routes.js'
import recomendationsRoutes from './routes/recomendations.routes.js'

const app = express();

app.use(express.json());

app.use('/user',likeRoutes)
app.use('/user', recomendationsRoutes)

app.listen(4000);