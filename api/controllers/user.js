var Repository = require('../../repository/repository');
var repo = new Repository();
var User = repo.models.User;

// GET
function getAllUsers(req, res) { 
  User.findAndCountAll({
    offset: req.swagger.params.offset.value,
    limit: req.swagger.params.limit.value
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

// GET {filter}
function searchUsers(req, res) {
  User.findAndCountAll({
    where: {
      last: {
        $like: req.swagger.params.filter.value+'%'
      }
    },
    offset: req.swagger.params.offset.value,
    limit: req.swagger.params.limit.value
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

// POST
function newUser(req, res) {
  User.create(
    {
      gender: 'male/female',
      title: 'mr/ms',
      first: req.body.data.first,
      last: req.body.data.last,
      email: req.body.data.email,
      username: req.body.data.username,
      phone: req.body.data.phone,
      cell: req.body.data.cell,
      picture: req.body.data.picture,
      registered: '1199729925000',
      dob: '122427907000'
    })
    .then(function() {
      res.status(200).json({
        success: 1,
        description: "User added to the list!"
      });
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

// GET {userId}
function getUser(req, res) {
  User.findOne({
    where: {
      id: req.swagger.params.id.value,
    }
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

// PUT {userId}
function setUser(req, res) {
  User.update(
    {
      gender: 'male/female',
      title: 'mr/ms',
      first: req.body.data.first,
      last: req.body.data.last,
      email: req.body.data.email,
      username: req.body.data.username,
      phone: req.body.data.phone,
      cell: req.body.data.cell,
      picture: req.body.data.picture,
      registered: '1199729925000',
      dob: '122427907000'
    },
    {
      where: {
        id: req.swagger.params.id.value,
    }
  })
    .then(function() {
      res.status(200).json({
        success: 1,
        description: "User edited successfully!"
      });
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

// DELETE {userId}
function delUser(req, res) {
  User.destroy({
    where: {
      id: req.swagger.params.id.value,
    }
  })
    .then(function() {
      res.status(200).json({
        success: 1,
        description: "User deleted successfully!"
      });
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}


module.exports = {
  getAllUsers: getAllUsers,
  searchUsers: searchUsers,
  newUser: newUser,
  getUser: getUser,
  setUser: setUser,
  delUser: delUser
};
