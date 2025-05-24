import express, {json} from 'express';
import cors from 'cors';
import { CONFIG_SERVER } from './config.mjs';
import { RoutesUsers } from './Routes/User.mjs';


const app = express();
app.use(cors());
app.use(json());

app.use('/Users', RoutesUsers)


app.listen(CONFIG_SERVER.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${CONFIG_SERVER.PORT}`);
})

