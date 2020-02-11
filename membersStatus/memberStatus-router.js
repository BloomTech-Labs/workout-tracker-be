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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  MemberStatus.update(id, changes)
    .then(MemberStatus => {
      if (MemberStatus) {
        res.json({ update: MemberStatus });
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

  MemberStatus.remove(id)
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

module.exports = router;