import { useEffect, useState } from "react";
import StudentCard from "./components/StudentCard";
import "./App.css";

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [
        {
          id: 1,
          name: "John Doe",
          age: 20,
          course: "Computer Science",
        },
        {
          id: 2,
          name: "Jane Smith",
          age: 22,
          course: "Software Engineering",
        },
      ];
  });

  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.age || !form.course) {
      return;
    }

    if (editingId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editingId
            ? {
              ...student,
              name: form.name,
              age: Number(form.age),
              course: form.course,
            }
            : student
        )
      );

      setEditingId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name: form.name,
        age: Number(form.age),
        course: form.course,
      };

      setStudents([...students, newStudent]);
    }

    resetForm();
  }

  function handleEdit(student) {
    setForm({
      name: student.name,
      age: student.age,
      course: student.course,
    });

    setEditingId(student.id);
  }

  function handleDelete(id) {
    setStudents(
      students.filter((student) => student.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  }

  function resetForm() {
    setForm({
      name: "",
      age: "",
      course: "",
    });

    setEditingId(null);
  }

  return (
    <div className="app">
      <header>
        <h1>Student Manager</h1>
        <p>Manage student records with React</p>
      </header>

      <section className="form-section">
        <h2>
          {editingId !== null ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId !== null ? "Update Student" : "Add Student"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="students-section">
        <div className="section-header">
          <h2>Students</h2>
          <span>{students.length} students</span>
        </div>

        {students.length === 0 ? (
          <p className="empty-message">
            No students found.
          </p>
        ) : (
          <div className="student-list">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;