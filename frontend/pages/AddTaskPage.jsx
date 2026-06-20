import React, { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  status: "Pending"
};

function AddTaskPage({ onCreateTask }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Title is required";
    }

    if (form.description.trim().length < 20) {
      nextErrors.description = "Description must be at least 20 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onCreateTask(form);
      setForm(initialForm);
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Unable to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section narrow-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Add Task</p>
          <h2>Create a new task</h2>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          Task Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Build Login Page"
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Create a responsive login page with validation"
            rows="5"
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
          </select>
        </label>

        {submitError && <div className="form-error">{submitError}</div>}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </form>
    </section>
  );
}

export default AddTaskPage;
