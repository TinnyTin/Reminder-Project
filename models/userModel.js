const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
  {
    id: 4,
    name: "Martin Lee",
    email: "martin123@gmail.com",
    password: "martin123!",
    role: "admin"
  },
];

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

const userGit = {
  findById: async (profile) => {
    let user = await prisma.user.findUnique({ where: { id: profile.id } });
    if (user) {
      return user;
    }
    const createdUser = await prisma.user.create({
      data:{
          id: profile.id,
          email: profile.id,
          password: profile.id,
          name: profile.username,
          role: "user",
          photo: profile.photos[0].value
  }});
    return createdUser;
  },
};

module.exports = { database, userModel, userGit };
