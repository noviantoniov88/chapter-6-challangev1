const express = require("express");
const bcrypt = require("bcrypt");

const { Usergame, Userbiodata } = require("./models");
const route = express.Router();

// insert User
route.post(
  "/user",
  async (req, res)=> {
  const { firstname, lastname, username, email, phone, address, passwordP } = req.body;

  const salt = bcrypt.genSaltSync(12);
  const password = bcrypt.hashSync(passwordP, salt);

  await Usergame.create({ username, password }).then(result => console.log(usergame_id = result.id));
  const userBiodata = await Userbiodata.create({usergame_id, firstname, lastname, email, phone, address });
  res.json(userBiodata);
  }
);

// Get User
route.get("/user", async (req, res) => {
  const userGames = await Usergame.findAll({
    include: [
      {
        model: Userbiodata
      }
    ]
  });
  res.json(userGames);
});

route.get("/user/:id", async (req, res) => {
  const userGames = await Usergame.findOne({
    where:{
      id:req.params.id
    },
    include: [
      {
        model: Userbiodata
      }
    ]
  });
  res.json(userGames);
});


// Update Usergame
route.put("/user/:id", async (req, res) => {
  const { body } = req;
  const userUpdate = await Usergame.update(body, {
    where: {
      id: req.params.id
    }
  });
  res.json(userUpdate);
});
// Update Userbiodata
route.put("/userbiodata/:id", async (req, res) => {
  const { body } = req;
  const userbiodataUpdate = await Userbiodata.update(body, {
    where: {
      id: req.params.id
    }
  });
  res.json(userbiodataUpdate);
});

// Delete Usergame
route.delete("/user/:id", async (req, res) => {
  const userDelete = await Usergame.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(userDelete);
});
// Delete Userbiodata
route.delete("/userbiodata/:id", async (req, res) => {
  const userbioDelete = await Userbiodata.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(userbioDelete);
});


module.exports = route;
