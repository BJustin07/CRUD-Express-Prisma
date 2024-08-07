const express = require('express');
const app = express()
app.use(express.json())

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()




app.get('/users', async (req,res) => {
    const getAllUsers = await prisma.user.findMany()
    res.status(200).json(getAllUsers)
})


app.post('/users', async (req,res) => {
    const {email, name, age} = req.body;
    console.log(req.body)
    const createUser = await prisma.user.create({
        data:{
            email,
            name,
            age
        }
    });
    res.status(200).json({message:"User successfully created!", user : createUser})
})


// async function main(){
//     // await prisma.user.create({
//     //     data:{
//     //         email: "test@email.com",
//     //         name: "babuchi",
//     //         age: 69
//     //     }
//     // })
//     // const getAllUsers = await prisma.user.findMany()
//     // console.log(getAllUsers);
// }



// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

app.listen(3000, () => console.log("Server is running at port: 3000"));