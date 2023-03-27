import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new Exercise with the name, reps etc. provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercises => {
            res.status(201).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
            // res.status(500).json({ Error: 'Request failed' });
        });
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
                // res.status(500).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
            // res.status(500).json({ Error: 'Request failed' });

        });

});

/**
 * Retrieve exercises. 
 * If the query parameters include a name, then only the exercises for that name are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    
    if(req.query.name !== undefined){
        filter = { name: req.query.name };
    }
    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            // res.status(500).json({ Error: 'Request failed' });
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * values provided in the body.
 */

app.put('/exercises/:_id', (req, res) => {
    
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(modifiedCount => {
            // console.log(numUpdated)
            if (modifiedCount === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
                // res.status(500).json({ Error: 'Resource not found' });
                ;
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
            // res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Resource not found' });
            // res.status(500).json({ Error: 'Resource not found' });
        }
    })
    .catch(error => {
        console.error(error);
        // res.status(500).json({ Error: 'Request failed' });
        res.send({ error: 'Request failed' });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});