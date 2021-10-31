let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    const reminderToFind = parseInt(req.params.id)
    let n_reminder = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: JSON.parse(req.body.completed),
    };    
    const index = database.cindy.reminders.findIndex(r => (r.id === reminderToFind))
    database.cindy.reminders[index] = n_reminder
    // Uncomment below to redirect to single item page
    //res.render("reminder/single-reminder", { reminderItem: database.cindy.reminders[index] })
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    // Implement this code
    const reminderToDelete = parseInt(req.params.id)
    const removedReminder = database.cindy.reminders.indexOf(reminderToDelete)
    database.cindy.reminders.splice(removedReminder, 1)
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
