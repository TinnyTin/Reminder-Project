const prisma = require("../prisma")

const userModel = {
  findOne: async (email) => {
    const user = await prisma.user.findUnique({ where: { email:email } });
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: async (id) => {
    const user = await prisma.user.findUnique({ where: { id: id } });
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

module.exports = { userModel, userGit };
