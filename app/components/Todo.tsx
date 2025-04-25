import React from "react";
import { TodoType } from "../types";
type TodoProps = {
    todo: TodoType;
};
const Todo = ({todo}: TodoProps) => {
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
                        />
                        <label className="ml-3 block text-gray-900">
                        <span className="text-lg font-medium mr-2"> {todo.title} </span>
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                        className="btn-green"
                        >
                        ✒
                        </button>
                        <button
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
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