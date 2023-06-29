const Thought = require("./../models/Thought");
const User = require("./../models/User");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ params, body }, res) {
    User.findById(params.id)
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        } else {
          return Thought.create(body)
            .then(({ _id }) => {
              return User.findOneAndUpdate(
                { _id: params.id },
                { $push: { thoughts: _id } },
                { new: true }
              );
            })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  },

  // update thought
  updateThought({ params, body }, res) {
    Thought.findById(params.id)
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        } else {
          return Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
          })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findById(params.id)
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        } else {
          return Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => res.status(204).json(dbThoughtData))
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
