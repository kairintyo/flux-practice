import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { completed, edit, text, id, handle } = this.props;
    const icon = completed ? "\u2714" : "\u2716";

    if (edit) {
      return (
        <li>
          <input value={text} />
        </li>
      );
    }
    return (
      <li>
        <span>{text}</span>
        <span>{icon}</span>
        <button onClick={() => handle({ id })}>x</button>
      </li>
    );
  }
}
