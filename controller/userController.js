const { userModel, userGit } = require("../models/userModel");
// Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const e = require("express");


const getUserByEmailIdAndPassword = async (email, password) => {
  let user = await prisma.user.findFirst({ where: { email: email, password: password } });
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = async (id) => {
  let user = await prisma.user.findUnique({ where: { id: id } });
  if (user) {
    return user;
  }
  return null;
};
const getUserGit = async (profile) => {
  let user = await userGit.findById(profile);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}


module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserGit,
};
