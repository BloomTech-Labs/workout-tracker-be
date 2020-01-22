const express = require("express");

const RoutinesFavorites = require("./routineFavorites-model");

const router = express.Router();

const passport = require("passport");

router.get("/", (req, res) => {
  RoutinesFavorites.find()
    .then(favorites => {
      res.json(favorites);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get favorites"
      });
    });
});

router.get("/members/:id", (req, res) => {
  const { id } = req.params;

  RoutinesFavorites.findByMember(id)
    .then(favorites => {
      if (favorites) {
        res.json(favorites);
      } else {
        res.json({
          message:
            "This user doesn't have any favorites"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get favorites"
      });
    });
});

router.post("/", (req, res) => {
  const favoriteData = req.body;

  RoutinesFavorites.add(favoriteData)
    .then(newFavorite => {
      res.status(201).json(newFavorite);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to add routine to favorites"
      });
    });
});

router.delete("/members/:id/exercise/:exerciseid", (req, res) => {
  const { id } = req.params;
  console.log(req.params)

  RoutinesFavorites.remove(id)
    .then(count => {
      if (count) {
        res.json({
          removed: count
        });
      } else {
        res.status(404).json({
          message: "Could not find routine exercise entry with the given id"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete routine exercise entry"
      });
    });
});

module.exports = router;
