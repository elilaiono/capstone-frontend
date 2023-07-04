import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function WorkoutForm({ initialValues, onSubmit, buttonText, handleImageChange, updating }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // reset form values when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="Exercise"
          placeholder="Exercise Name..."
          {...register('exerciseName', { required: true })}
        />
        {errors.exerciseName && <span className="error-message"> *</span>}
  
        <textarea
          type="text"
          placeholder="Description..."
          {...register('description', { required: true })}
        />
        {errors.description && <span className="error-message"> *</span>}
  
        <input
          type="text"
          placeholder="Equipment..."
          {...register('equipment', { required: true })}
        />
        {errors.equipment && <span className="error-message"> *</span>}
  
        <input
          type="text"
          placeholder="Difficulty Level"
          {...register('difficultyLevel', { required: true })}
        />
        {errors.difficultyLevel && <span className="error-message"> *</span>}
  
        <input
          type="text"
          placeholder="Duration"
          {...register('duration', { required: true })}
        />
        {errors.duration && <span className="error-message"> *</span>}
  
        <input
          type="text"
          placeholder="Additional Notes"
          {...register('additionalNotes')}
        />
  
        <select {...register('type', { required: true })}>
          <option value="">Select Type</option>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
          <option value="cardio">Cardio</option>
        </select>
        {errors.type && <span className="error-message"> *</span>}
  
        <input type="file" onChange={handleImageChange} />
  
        <button type="submit">{updating ? "Update" : buttonText}</button>
    </form>
  );
}

export default WorkoutForm;
