let database = require("../database");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { Reminder } from ".prisma/client";
import {Request, Response} from "express"


export interface RequestWithUser extends Request {
  user: {
    id: String,
    email: String,
    password: String,
    name: String,
    role: String,
    photo: String
  }
}

let remindersController = {
  list: async (req: RequestWithUser, res: Response) => {
    //if(database[user] == undefined)  database[user] = {reminders:[]}
    let reminders_list = await prisma.reminder.findMany({
      where: {
        userId: {equals: req.user.id}
      }
    })
    console.log(reminders_list)
    res.render("reminder/index", { reminders: reminders_list });
  },

  new: (req: RequestWithUser, res: Response) => {
    res.render("reminder/create");
  },

  listOne: async (req: RequestWithUser, res: Response) => {
    const searchResult = await prisma.reminder.findUnique({
      where: {
        id: req.params.id
      }
    })
    if (searchResult != {}) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      const reminders_list = await prisma.reminder.findMany({
        where: {
          userId: {equals: req.user.id}
        }
      })
      res.render("reminder/index", { reminders: reminders_list });
    }
  },

  create: async (req: RequestWithUser, res: Response) => {
    if(!req.user){
      res.redirect("/dashboard")
    } else {
      const reminder = await prisma.reminder.create({
        data:{
          id: Math.random().toString(36).substr(2, 9),
          title: req.body.title, 
          description: req.body.description, 
          completed: false,
          userId: req.user.id
        }})
      res.redirect("/reminders");
    }
  },

  edit: async (req: RequestWithUser, res: Response) => {
    if(!req.user){
      res.redirect("/dashboard")
    } else {
      let searchResult = await prisma.reminder.findUnique({
        where: {
          id: req.params.id
        }
      })
      res.render("reminder/edit", { reminderItem: searchResult });
    }
  },

  update: async (req: RequestWithUser, res: Response) => {
    if(!req.user){
      res.redirect("/dashboard")
    } 
    else {
      const new_reminder = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        completed: JSON.parse(req.body.completed),
        userId: req.user.id
      };

      const updatedReminder = await prisma.reminder.update({
        where: {
          id: req.params.id,
        },
        data: new_reminder
      })
      //res.render("reminder/single-reminder", { reminderItem: updatedReminder })
      res.redirect("/reminders");
    }
  },

  delete: async (req: RequestWithUser, res: Response) => {
    if(!req.user){
      res.redirect("/dashboard")
    } 
    else {
      const deleteReminder = await prisma.reminder.delete({
        where: {
          id: req.params.id
        } 
      })
    res.redirect("/reminders");
    }
  },
};

module.exports = remindersController;
