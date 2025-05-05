import React, { useState } from "react";
import { TodoType } from "../types";
import useSWR from "swr";
import { useTodos } from "../hooks/useTodos";
import { API_URL } from "@/constants/url";
type TodoProps = {
    todo: TodoType;
};
async function fetcher(key: string){
    return fetch(key).then((res) => res.json());
  }
const Todo = ({todo}: TodoProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);
    const { todos, isLoading, error, mutate } = useTodos();
    const handleEdit = async () => {
        setIsEditing(!isEditing);
        if(isEditing) {
            // Call the API to update the todo title
            const response = await fetch(`${API_URL}/editTodo/${todo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editedTitle }),
            });
            if (response.ok) {
                const updatedTodo = await response.json();
                const updatedTodos = todos.map((t: TodoType) =>
                    t.id === updatedTodo.id ? updatedTodo : t
                );
                mutate(updatedTodos); // データを再取得する
            }
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8080/deleteTodo/${todo.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            const deletedTodo = await response.json();
            mutate([...todos]); //データを再取得する
        }        
    };

    const toggleTodoCompleted = async () => {
        const updatedCompleted = !todo.completed; // 最新の状態を反転
        const response = await fetch(`${API_URL}/editTodo/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isCompleted: updatedCompleted }),
        });
        if (response.ok) {
            const updatedTodo = await response.json();
            console.log("Updated Todo:", updatedTodo); // レスポンス内容を確認
            const updatedTodos = todos.map((t: TodoType) =>
                t.id === updatedTodo.id ? { ...t, completed: updatedCompleted } : t
            );
            mutate(updatedTodos,false); // データを再取得する
        }
    }
    return (
        <div>        
            <li className="py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                        id="todo1"
                        name="todo1"
                        type="checkbox"
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500
                                border-gray-300 rounded"    
                        checked={todo.completed} 
                        onChange={toggleTodoCompleted} 
                        />
                        <label className="ml-3 block text-gray-900">
                            {isEditing ? (
                                <input type="text" className="border border-gray-500 rounded px-2 py-1" value={editedTitle} onChange={(e)=> setEditedTitle(e.target.value)} />
                            ) : (
                                <span className={`text-lg font-medium mr-2 ${todo.completed ? "line-through" : ""}`}> {todo.title} </span>
                            )}
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                        className="btn-green" onClick={handleEdit}>
                            {isEditing ? "Save" : "✒"}                        
                        </button>
                        <button 
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                        onClick={handleDelete}
                        >
                        ✖
                        </button>
                    </div>
                </div>
            </li>
        </div>
    );
};
export default Todo;