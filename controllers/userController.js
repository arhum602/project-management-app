const db = require("../models");

module.exports = {
  // Call this to start tracking records for user
  createUser: function (req, res) {
    console.log('\n userController-createUser received this : ', req);
    db.User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  getUsers: function (req, res) {
    console.log('\n userController-getUserInfo received this : ', req.query);
    // e.g. req.query : { email: 'dudkny@gmail.com' }
    db.User.find(req.query)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  // probably not needed
  // Call this to get one user's info (signin, __id acquisition)
  findOneUser: function (req, res) {
    console.log('Controller: find one user')
    db.User.findOne({ email: req.params.email })
      .then(dbUser => {
        console.log('find one user got : ', dbUser)
        res.json(dbUser)
      })
      .catch(err => res.status(422).json(err));
    // or per Mongoose docs,
    // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
  },

  // :id
  findOneById: function (req, res) {
    console.log('Controller: find a user by Id')
    db.User.findById(req.params.id)
      .then(dbUser => {
        console.log('findOneById returned:', dbUser)
        res.json(dbUser)
      })
      .catch(err => res.status(422).json(err));
    // function (err, resp) {
    // if (err) return next(err);
    // if (typeof resp === 'object') {
    //   err = new Error("This user owns entries, remove the entries first");
    //   err.status = 412; //precondition failed
    //   return next(err);
    // }
  },

  // Call this to update records for user. 
  // You get to do this only if you are the developer in the org & prod for the issue.
  updateUser: function (req, res) {
    console.log('\n userController-update received this : ', req);
    // db.User.findOneAndUpdate({ id: req.params.id }, req.body)
    //   .then(dbUser => res.json(dbUser))
    //   .catch(err => res.status(422).json(err));

    db.User.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true },
      function (err, result) {
        if (err) return next(err);
        if (result) {
          console.log('updateUser returned: ', result)
          res.json(result);
        } else {
          next();
        }
      });


  },

  // Call this to remove a user (un-registration)
  removeUser: function (req, res) {
    console.log('\n userController-removeUser received this : ', req);
    db.User.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
