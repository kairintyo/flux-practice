import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [
      {
        id: 111111111,
        text: "go shopping",
        complete: false,
      },
      {
        id: 111111112,
        text: "study programing",
        complete: false,
      },
      {
        id: 111111113,
        text: "ラーメン二郎食いたい",
        complete: false,
      },
    ];
  }

  getAll() {
    return this.todos;
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  deleteTodo(obj) {
    const newtodo = this.todos.filter((todo) => todo.id !== obj.id);
    this.todos = newtodo;

    this.emit("change");
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
      }
      case "DELETE_TODO": {
        this.deleteTodo(action.id);
      }
    }
  }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;
