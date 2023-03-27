import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
          method: 'PUT',
          body: JSON.stringify(editExercise),
          headers: {
              'Content-Type': 'application/json',
          },
        });
        if(response.status === 200){
                alert("Successfully edited the Exercise!");
        }   else {
                alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push("/");
    
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
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
                
                value={reps}
                onChange={e => setReps(e.target.value)} /></label></td>
            <td>< label for="lWeight" ><input
                type="number"
                id="lWeight"
                
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
                
                value={date}
                onChange={e => setDate(e.target.value)} /></label></td>
            </tbody>
            </table></p>
            <button
                onClick={editExercise}
            >Save Edit</button>
        </div>
    );
    

}

export default EditExercisePage;