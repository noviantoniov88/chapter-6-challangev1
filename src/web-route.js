const express = require("express");
const webRoute = express.Router();
const bcrypt = require("bcrypt");
const db = require("./db/users.json");

const { Usergame, Userbiodata, Userhistory } = require("./models");

webRoute.get("/", (req, res) => {
    res.redirect("/auth/form")
});

webRoute.get("/auth/form", (req, res) => {
    res.render("auth/form");
});

webRoute.get("/auth/formError", (req, res) => {
  res.render("auth/formError");
});

webRoute.post(
    "/auth/login",
    (req, res, next) => {
        const { username, password } = req.body;
  
      // Make sure username & password are filled
      if (!username && !password) {
        return res.redirect("/auth/formError")
      }
  
      // Check username from database
      const user = db.find((user) => user.username === username);
      if (!user) {
        return res.redirect("/auth/formError")
      }
  
      // Compare password
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return res.redirect("/auth/formError")
      }
      next();
    },
    (req, res) => {
      res.redirect("/admin");
    }
  );

webRoute.get("/admin", async (req, res) => {
    const data = await Usergame.findAll({
        include:[
            {
                model: Userbiodata,
                attributes: ['id', 'firstname','lastname','email','phone','address']
            }
        ],
        order:[['createdAt', 'ASC']]
    });
    res.render("admin/index",{
        data
    });
});

// ===== Process Add User =====
webRoute.get("/admin/addform", async (req, res) => {
    res.render("admin/addform");
});

webRoute.get("/admin/errorAdd", (req, res) => {
  res.render("admin/errorAddForm");
});

webRoute.post("/admin/adduser", async (req, res, next) => {
  const { firstname, lastname, email, phone, address, passwordP, confirmpassword } = req.body;

  if (!firstname && !lastname && !email && !phone && !address ) {
    return res.redirect("/admin/errorAdd")
  }

  if( passwordP !== confirmpassword ){
    return res.redirect("/admin/errorAdd")
  }
  
  if( !passwordP || !confirmpassword ){
    return res.redirect("/admin/errorAdd")
  }
  
 next();
}, async (req, res)=> {
  const { firstname, lastname, username, email, phone, address, passwordP, confirmpassword } = req.body;

  const salt = bcrypt.genSaltSync(12);
  const password = bcrypt.hashSync(passwordP, salt);

  await Usergame.create({ username, password }).then(result => console.log(usergame_id = result.id));
  await Userbiodata.create({usergame_id, firstname, lastname, email, phone, address });
  res.redirect("/admin");

});

// ===== Process Edit Biodata User =====
webRoute.get("/admin/editform/:id/:id_user", async (req, res) =>{
  const data = await Usergame.findOne({
        where: {
          id: req.params.id
        },
        include:[
            {
                model: Userbiodata,
                attributes: ['id', 'firstname','lastname','email','phone','address']
            }
        ]
  });

  res.render("admin/editform", {
    data
  });
});

webRoute.post("/admin/edituser", async (req, res, next) => {
  const { usergame_id, userbiodata_id, firstname, lastname, email, phone, address, username } = req.body;

  if (!firstname || !lastname || !email || !phone && !address || !username ) {
    return res.redirect("/admin/errorEdit/"+usergame_id+"/"+userbiodata_id)
  }

 next();
}, async (req, res)=> {
  const { usergame_id, userbiodata_id, firstname, lastname, username, email, phone, address } = req.body;
  await Usergame.update({ username }, {
      where: {
        id: usergame_id
      }
  });

  await Userbiodata.update({ firstname, lastname, email, phone, address }, {
      where: {
        id: userbiodata_id
      }
  });
  res.redirect("/admin");
});

webRoute.get("/admin/errorEdit/:usergame_id/:userbiodata_id", (req, res) =>{
  data = req.params;
  res.render("admin/errorEdit", {
    data
  });
});



// ===== Process Edit Password =====
webRoute.get("/admin/editPassform/:id", async (req, res) =>{
  data = req.params.id;
  res.render("admin/editPassform", {
    data
  });
});

webRoute.post("/admin/editpass/:id", 
    (req, res, next)=>{
      const { password, confirmpassword } = req.body;
      if(!password && ! confirmpassword){
        return res.redirect("/admin/errorEditPass/"+req.params.id);
      }
      if(password !== confirmpassword){
        // return res.status(404).json({ error: "User not found!" });
        return res.redirect("/admin/errorEditPass/"+req.params.id);
      }
      next();
    },
    async (req, res) => {
      let { password } = req.body;
      const salt = bcrypt.genSaltSync(12);
      password = bcrypt.hashSync(password, salt);
    
      await Usergame.update({ password }, {
        where: {
          id: req.params.id
        }
    });
  res.redirect("/admin");
});

webRoute.get("/admin/errorEditPass/:id", async (req, res) =>{
  data = req.params.id;
  res.render("admin/errorEditPass", {
    data
  });
});

// ===== Process Delete User =====
webRoute.get("/admin/deleteConfirm/:usergame_id/:userbiodata_id", async (req, res) =>{
  data = req.params;
  res.render("admin/confirmDelete", {
    data
  });
});

webRoute.get("/admin/delete/:usergame_id/:userbiodata_id", async (req, res) => {
  await Userbiodata.destroy({
    where: {
      id: req.params.userbiodata_id
    }
  });
  await Usergame.destroy({
    where: {
      id: req.params.usergame_id
    }
  });
  res.redirect("/admin");
});

webRoute.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = webRoute;