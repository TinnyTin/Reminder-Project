let sessionsController = {
    revoke: (req, res) => {
        const sessionID = req.params.id
        req.sessionStore.destroy(sessionID)
        req.sessionStore.all((err,sessions) => {
            if(err) console.log(err)
            else {
              res.redirect("/admin")
            }
          })
    },
  
  };
  
  module.exports = sessionsController;