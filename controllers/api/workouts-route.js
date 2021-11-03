// Workouts Page
const router = require('express').Router();
const Workout = require('../../models/workoutModel')

router.get('/', (req, res) => {
  Workout.find({}, (err, exercise) => {
    try {
      res.json(exercise)
    } catch {
      res.json(err)
    }
  })

  Workout.aggregate(
    { $addField: {
        _id: null,
        total:       { $sum: { $add: ["$user_totaldocs", "$user_totalthings"] } },
        totaldocs:   { $sum: "$user_totaldocs" },
        totalthings: { $sum: "$user_totalthings" }
    }}
)
});

router.post("/", ({ body }, res) => {
  const tracker = new Workout(body);

  Workout.create(tracker)
    .then(dbTracker => {
      res.json(dbTracker);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put('/:id', async (req, res) => {
  try {
    const addExercise = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    )
    await res.json(addExercise)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/range', (req, res) => {
  Workout.find({}, (err, exercise) => {
    try {
      res.json(exercise)
    } catch {
      res.json(err)
    }
  })
})

module.exports = router;
