import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FaEdit } from "react-icons/fa";


function App() {
  const [Todo, setTodo] = useState(""); // For individual Todo input
  const [Todos, setTodos] = useState([]); // For the list of Todos
  const [showfinished, setshowfinished] = useState(true);

  const saveToLS = (todos) => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  };

  useEffect(() => {
    const todostring = localStorage.getItem("Todos");
    if (todostring) {
      setTodos(JSON.parse(todostring)); // Load Todos from localStorage
    }
  }, []);

  const handleAdd = () => {
    if (Todo.trim()) {
      const newTodos = [...Todos, { text: Todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
      setTodo("");
    }
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleEdit = (index) => {
    const newTodos = [...Todos];
    const newText = prompt("Edit your Todo:", newTodos[index].text);
    if (newText !== null) {
      newTodos[index].text = newText;
      setTodos(newTodos);
      saveToLS(newTodos);
    }
  };

  const handleDelete = (index) => {
    const newTodos = Todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const markAsCompleted = (index) => {
    const updatedTodos = Todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: true } : todo
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const togglefinished = () => setshowfinished(!showfinished);

  return (
    <>
      <Navbar />
      <div className=" md:container  bg-black rounded-xl p-5 my-5 min-h-[80vh] flex-col mx-auto">
        <div className="add_todo">
          <h2 className="text-lg font-bold text-white my-4">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={Todo}
            type="text"
            placeholder="Enter text"
            className="w-full rounded-full py-3"
          />

        </div>
        <button
            onClick={handleAdd}
            className="add px-3 py-2 bg-gray-500 rounded-md font-bold text-sm  text-white w-full my-4"
          >
            Save
          </button>

        <label className="flex items-center gap-2 mt-4 text-white">
          <input
            onChange={togglefinished}
            type="checkbox"
            checked={showfinished}
          />
          Show Completed Todos
        </label>

        <h2 className="text-lg font-bold mt-5 text-white">Your Todos</h2>
        <div className="work flex flex-col gap-3 bg-black p-3 rounded-md my-4">
          {Todos.length > 0 ? (
            Todos.map((item, index) => {
              if (showfinished || !item.isCompleted) {
                return (
                  <div
                    key={index}
                    className="todo flex justify-between items-center p-2 rounded-md border bg-white"
                  >
                    <div
                      className={item.isCompleted ? "line-through" : ""}
                      style={{ wordBreak: "break-word", maxWidth: "60%" }}
                    >
                      {item.text}
                    </div>
                    <div className="buttons flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 bg-gray-500 rounded-md font-bold text-sm text-white"
                      >
                       <FaEdit />

                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1 bg-gray-500 rounded-md font-bold text-sm text-white"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={() => markAsCompleted(index)}
                        className="px-2 py-1  bg-gray-500 rounded-full font-bold text-sm text-white"
                      >
                        <IoMdDoneAll />
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p className="text-gray-500">No Todos yet!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
