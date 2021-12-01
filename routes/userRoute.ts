import express, {Request, Response} from "express"
const router = express.Router();

// Prisma ---------------
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// router.post("/users", async (req: Request, res: Response) => {
//   const { email, name } = req.body;
//   const [password,role,imgurl] = ["","",""]
//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     res.json({ error: "User already exists" });
//   } else {
//     const createdUser = await prisma.user.create({
//         data:{
//             email,
//             password,
//             name,
//             role,
//             imgurl,
//     }});
//     res.json(createdUser);
//   }
// });

// router.get("/users", async (req: Request, res: Response) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// router.put("/users/:id", async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const { name } = req.body;
//   try {
//     let user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) throw new Error("No user found");

//     user = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//       },
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });