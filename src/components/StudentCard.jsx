function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="student-card">
      <div>
        <h3>{student.name}</h3>
        <p>Age: {student.age}</p>
        <p>Course: {student.course}</p>
      </div>

      <div className="card-buttons">
        <button
          className="edit-btn"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;