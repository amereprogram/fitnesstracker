import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/exerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit}) {
    
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    };
    
    const onEdit = async exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise")

    }
    
    const loadExercises = async () => {
        console.log('Hello world')
        const response = await fetch('/exercises');
        const data = await response.json();
        console.log(data)
        setExercises(data);
    }
        
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>Exercise Planner</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/add-exercise">Add a workout</Link>
        </>
    );
}

export default HomePage;