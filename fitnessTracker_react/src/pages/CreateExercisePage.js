import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
          method: 'POST',
          body: JSON.stringify(newExercise),
          headers: {
              'Content-Type': 'application/json',
          },
        });
        if(response.status === 201){
                alert("Successfully added the Exercise!");
        }   else {
                alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    
    };

    return (
        <div>
            <h1>Create Exercise</h1>
            <p>
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>
            </thead>
            
            <tbody>
            <td>< label for="lName" ><input
                type="text"
                id="lName"
                placeholder="Enter Exercise here"
                value={name}
                onChange={e => setName(e.target.value)} /></label></td>
            <td>< label for="lNumber" ><input
                type="number"
                id="lNumber"
                placeholder="Enter reps here"
                value={reps}
                onChange={e => setReps(e.target.value)} /></label></td>
            <td>< label for="lWeight" ><input
                type="number"
                id="lWeight"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} /></label></td>

            <td>< label for="lUnit" ></label>
                <select name = 'unit' id="lUnit" value={unit}
                    onChange={e => setUnit(e.target.value)}>
                <option value='lbs' selected>lbs</option> 
                <option value='kgs' >kgs</option>
                <option value='miles' >miles</option>
                <option value='meters' >meters</option>
                </select>
            </td>
            {/* <td>< label for="lUnit" ><input
                type="text"
                id="lUnit"
                placeholder="Enter Unit here"
                value={unit}
                onChange={e => setUnit(e.target.value)} /></label></td> */}

            <td>< label for="lDate" ><input
                type="text"
                id="lDate"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} /></label></td>
            </tbody>
            </table></p>
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}


export default CreateExercisePage;