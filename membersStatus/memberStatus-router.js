const express = require("express");

const MemberStatus = require("./memberStatus-model");

const router = express.Router();

const passport = require("passport");

router.get("/", (req, res) => {
  MemberStatus.find()
    .then(MemberStatus => {
      res.json(MemberStatus);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Failed to get member status", error: err });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;

  MemberStatus.findById(id)
    .then(MemberStatus => {
      if (MemberStatus) {
        res.json(MemberStatus);
      } else {
        res
          .status(404)
          .json({ message: "Could not find member status with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get member status " });
    });
});

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const memberStatusData = req.body;

    MemberStatus.add(memberStatusData)
      .then(newStatus => {
        res.status(201).json(newStatus);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new member status" });
      });
  }
);

module.exports = router;
