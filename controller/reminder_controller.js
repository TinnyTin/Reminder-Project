let database = require("../database");


let remindersController = {
  list: (req, res) => {
    const user = req.user.id
    if(database[user] == undefined)  database[user] = {reminders:[]}
    res.render("reminder/index", { reminders: database[user].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const user = req.user.id
    let reminderToFind = req.params.id;
    let searchResult = database[user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[user].reminders });
    }
  },

  create: (req, res) => {
    if(!req.user){
      res.redirect("/dashboard")
    } else {
      const user = req.user.id
      if(database[user] == undefined)  database[user] = {reminders:[]}
      let reminder = {
        id: database[user].reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
      };
      database[user].reminders.push(reminder);
      res.redirect("/reminders");
    }
  },

  edit: (req, res) => {
    if(!req.user){
      res.redirect("/dashboard")
    } else {
      const user = req.user.id
      let reminderToFind = req.params.id;
      let searchResult = database[user].reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      res.render("reminder/edit", { reminderItem: searchResult });
    }
  },

  update: (req, res) => {
    if(!req.user){
      res.redirect("/dashboard")
    } else {
      const user = req.user.id

      const reminderToFind = parseInt(req.params.id);
      let n_reminder = {
        id: reminderToFind,
        title: req.body.title,
        description: req.body.description,
        completed: JSON.parse(req.body.completed),
      };
      const index = database[user].reminders.findIndex(
        (r) => r.id === reminderToFind
      );
      database[user].reminders[index] = n_reminder;
      // Uncomment below to redirect to single item page
      //res.render("reminder/single-reminder", { reminderItem: database[user].reminders[index] })
      res.redirect("/reminders");
    }

  },

  delete: (req, res) => {
    if(!req.user){
      res.redirect("/dashboard")
    } else {
      const user = req.user.id
      const reminderToDelete = parseInt(req.params.id);
      const removedReminder = database[user].reminders.indexOf(reminderToDelete);
      database[user].reminders.splice(removedReminder, 1);
      res.redirect("/reminders");
    }
  },
};

module.exports = remindersController;
