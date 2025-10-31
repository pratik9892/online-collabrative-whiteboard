import express, { urlencoded } from "express"
import { config } from "./src/config/server.config.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errHandler } from "./src/utils/error.util.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())

app.get("/" , (req,res) => {
    res.status(200).json({
        status : true,
        message : "Health Check",
        error : {},
        data : {}
    })
})


//error middleware to catch all the error
app.use(errHandler)

app.listen(config.server.PORT || 3000 , async () => {
    console.log(`Server is listening on ${config.server.PORT}`)
} ) 