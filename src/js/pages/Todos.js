import React from "react";

import Todo from "../components/Todo";
import TodoStore from "../stores/TodoStore";
import * as TodoActions from "../actions/TodoActions";

export default class Todos extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentDidMount() {
    TodoStore.on("change", () => {
      this.setState({
        todos: TodoStore.getAll(),
      });
    });
  }

  createTodo(e) {
    e.preventDefault();
    const text = e.target.text.value;
    TodoActions.createTodo(text);
    e.target.text.value = "";
  }

  deleteTodo(id) {
    TodoActions.deleteTodo(id);
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
      return <Todo key={todo.id} {...todo} handle={this.deleteTodo} />;
    });

    return (
      <div>
        <form onSubmit={this.createTodo}>
          <input type="text" name="text" />
        </form>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}
