const express = require("express");

const Members = require("./members-model");

const helpers = require("../auth/_helpers");

const Status = require("../membersStatus/memberStatus-model");

require("../auth/jwt");
require("../auth/local");
require("../auth/google");
const passport = require("passport");

const jwt = require("jsonwebtoken");

const router = express.Router();


// router.use(passport.authenticate("jwt", { session: false }));


router.get("/", (req, res) => {
  Members.find()
    .then(members => {
      res.json(members);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get members" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Members.findBydId(id)
    .then(Members => {
      if (Members) {
        res.json(Members);
      } else {
        res
          .status(404)
          .json({ message: "Could not find member with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get member" });
    });
});

router.post("/", (req, res) => {
  const memberData = req.body;
  let { first_name, last_name, email, username, password } = req.body;

  helpers
    .createUser(memberData)
    .then(saved => {
      if (first_name && last_name && email && username && password) {
        res.status(201).json({
          user: saved
        });
      } else {
        res
          .status(404)
          .json({ message: "Please insert a email and a password" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { id, first_name } = req.user;
    const payload = {
      id,
      firstName: first_name
    };

    jwt.sign(payload, "secret", { expiresIn: 3000 }, (err, token) => {
      if (err) {
        return res.json({ err });
      }
      return res.json({ token });
    });
    //return res.json(req.user);
    let { username, password } = req.body;
    Members.findBy({ username })
      .first()
      .then(user => {
        if (username && password) {
          res.status(200).json({
            message: `Welcome ${user.first_name}!`
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

router.get(
  "/login/google",
  passport.authenticate('google', {
    session: false, scope: ['openid', 'profile', 'email']
  })
);

// router.get("/login/google", (req, res) => {
//   res.send("signing in with google")
// });

router.get("/google/redirect", passport.authenticate('google', { session: false }), (req, res) => {
  const { id, first_name } = req.user;
  const payload = {
    id,
    firstName: first_name
  };
  jwt.sign(payload, "secret", { expiresIn: 3000 }, (err, token) => {
    if (err) {
      return res.json({ err });
    }
    return res.json({ token, payload });
  });
  res.redirect('http://localhost:3000/profile')
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Members.update(id, changes)
    .then(members => {
      if (members) {
        res.json({ update: members });
      } else {
        res
          .status(404)
          .json({ message: "Could not find member with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update member" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Members.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res
          .status(404)
          .json({ message: "Could not find member with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete member" });
    });
});

router.get("/:id/status", (req, res) => {
  const { id } = req.params;

  Members.findStatus(id)
    .then(status => {
      res.json(status);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get status" });
    });
});

router.post("/:id/status", requiredBody, (req, res) => {
  const statusInfo = { ...req.body, member_id: req.params.id };

  Status.add(statusInfo)
    .then(status => {
      res.status(210).json(status);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error adding status for the member"
      });
    });
});

router.get("/:id/status/:id", (req, res) => {
  const { id } = req.params;

  Status.findById(id)
    .then(Status => {
      if (Status) {
        res.json(Status);
      } else {
        res
          .status(404)
          .json({ message: "Could not find member status with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get member status" });
    });
});

router.put("/:id/status/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Status.update(id, changes)
    .then(Status => {
      if (Status) {
        res.json({ update: Status });
      } else {
        res
          .status(404)
          .json({ message: "Could not find member status with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update member status" });
    });
});

router.delete("/:id/status/:id", requiredBody, (req, res) => {
  const { id } = req.params;

  Status.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res
          .status(404)
          .json({ message: "Could not find member status with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete member status" });
    });
});

function requiredBody(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    next();
  } else {
    //res.status(400).json({ message: "Please include request body"});

    next({ message: "Please include request body" });
  }
}

module.exports = router;
