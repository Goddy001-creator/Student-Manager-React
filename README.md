# React Live Class Test — Student Manager

A simple **Student Manager CRUD application** built with **Vite and React**.
This README also serves as a short lecture and presentation guide for explaining the project.

---

## 1. Project Overview

The application allows users to:

- **Create** a student
- **Read** and display students
- **Update** student information
- **Delete** a student

Each student contains:

- Name
- Age
- Course

### Question for the class

**What does CRUD stand for?**

> Create, Read, Update, Delete.

---

## 2. Project Setup

Create the Vite React project:

```bash
npm create vite@latest student-manager -- --template react
cd student-manager
npm install
npm run dev
```

### Project structure

```text
src/
├── components/
│   └── StudentCard.jsx
├── App.jsx
├── App.css
└── index.css
```

### Question

**Why create a separate `StudentCard` component?**

> To make the student display reusable and keep the code organized.

---

## 3. Storing Students with `useState`

The students are stored in React state:

```jsx
const [students, setStudents] = useState([
  {
    id: 1,
    name: "John Doe",
    age: 20,
    course: "Computer Science",
  },
]);
```

- `students` contains the current list.
- `setStudents` updates that list.

When state changes, React re-renders the UI.

### Question

**Why use `useState` instead of a normal JavaScript variable?**

> React uses state to track changes and update the UI.

---

## 4. Displaying Students with `.map()`

We display every student using `.map()`:

```jsx
{students.map((student) => (
  <StudentCard
    key={student.id}
    student={student}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
))}
```

This demonstrates:

- `.map()`
- reusable components
- props
- `key` values

### Question

**Which JavaScript method are we using to display all students?**

> `.map()`

---

## 5. CREATE — Adding a Student

The form uses controlled inputs:

```jsx
<input
  type="text"
  name="name"
  value={form.name}
  onChange={handleChange}
/>
```

The input is controlled by React state.

When the user types, `handleChange()` updates the form:

```jsx
function handleChange(event) {
  const { name, value } = event.target;

  setForm({
    ...form,
    [name]: value,
  });
}
```

When the form is submitted, a new student is created:

```jsx
const newStudent = {
  id: Date.now(),
  name: form.name,
  age: Number(form.age),
  course: form.course,
};

setStudents([...students, newStudent]);
```

The spread operator keeps the existing students and adds the new one.

---

## 6. UPDATE — Editing a Student

When **Edit** is clicked, the selected student's information is placed into the form and its ID is saved:

```jsx
setForm({
  name: student.name,
  age: student.age,
  course: student.course,
});

setEditingId(student.id);
```

When submitted, `.map()` updates only the matching student:

```jsx
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
```

### Explanation

> If the ID matches the student being edited, create an updated object. Otherwise, keep the original student.

### Question

**Why use `.map()` for updating?**

> Because it creates a new array while replacing only the matching student.

---

## 7. DELETE — Removing a Student

The Delete button passes the student's ID:

```jsx
onClick={() => onDelete(student.id)}
```

Then `.filter()` removes that student:

```jsx
setStudents(
  students.filter((student) => student.id !== id)
);
```

### Explanation

> Keep every student whose ID does not match the ID we want to delete.

### Question

**Which array method are we using for delete?**

> `.filter()`

---

## 8. Demonstration Before Persistence

At first, the CRUD application works correctly.

Demonstrate:

1. Add a student.
2. Edit a student.
3. Delete a student.
4. Refresh the browser.

### What happens?

The changes disappear and the original students return.

### Why?

At this stage, the data exists only in React's `useState`.

Refreshing the page starts the application again, so the initial state is loaded again.

### Question for the class

**Does `useState` permanently save data in the browser?**

> No.

This introduces the need for persistence.

---

# 9. Introducing `useEffect` and `localStorage`

To keep the students after a refresh, we use the browser's **localStorage**.

We also use React's `useEffect`.

First, import it:

```jsx
import { useEffect, useState } from "react";
```

## Load saved students

```jsx
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
      ];
});
```

This checks whether previously saved students exist.

- `localStorage.getItem()` retrieves the saved text.
- `JSON.parse()` converts it back into JavaScript data.

## Save changes with `useEffect`

```jsx
useEffect(() => {
  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}, [students]);
```

This effect runs whenever `students` changes.

The new data is stored in `localStorage`.

### Why `JSON.stringify()`?

`localStorage` stores data as text, so the JavaScript array must be converted to a string first.

---

# 10. How Persistence Works

### When adding, editing, or deleting

```text
User action
    ↓
students state changes
    ↓
useEffect runs
    ↓
students saved to localStorage
```

### When refreshing

```text
Page loads
    ↓
localStorage is checked
    ↓
Saved students are retrieved
    ↓
Students appear again
```

---

# 11. Final Demonstration

Show the class:

1. Add a student.
2. Refresh the page.
3. Confirm the student is still there.
4. Edit the student.
5. Refresh again.
6. Confirm the changes remain.
7. Delete the student.
8. Refresh again.
9. Confirm the deleted student stays deleted.

### Question

**Why doesn't the deleted student come back after refreshing?**

> Because the updated students array was saved to `localStorage` after the deletion.

---

# 12. React Concepts Demonstrated

| Concept | Purpose |
|---|---|
| `useState` | Stores application state |
| Props | Passes data/functions between components |
| `onChange` | Handles input changes |
| `onSubmit` | Handles form submission |
| `onClick` | Handles Edit/Delete actions |
| `.map()` | Displays and updates students |
| `.filter()` | Deletes students |
| Conditional rendering | Shows different UI states |
| `useEffect` | Runs an effect when state changes |
| `localStorage` | Persists data after refresh |

---

# 13. Final Presentation Explanation

> "This is a Student Manager CRUD application built with React and Vite. I store the students in React state using `useState`. Each student has an ID, name, age, and course.
>
> I created a reusable `StudentCard` component and pass the student data and event handlers through props.
>
> For creating students, I use controlled inputs. The form values are stored in state and updated with the `onChange` event.
>
> For updating, I keep track of the selected student's ID and use `.map()` to replace only the matching student.
>
> For deleting, I use `.filter()` to create a new array without the selected student.
>
> Initially, the application stored data only in React state, so refreshing the page reset the changes. I then introduced `useEffect` and `localStorage`. `useEffect` saves the students whenever the state changes, while `localStorage` allows the data to be loaded again after a refresh."

---

# 14. The Four Core CRUD Ideas

```jsx
// CREATE
setStudents([...students, newStudent]);

// READ
students.map(...);

// UPDATE
students.map(...);

// DELETE
students.filter(...);
```

These four operations form the core of the Student Manager application.
