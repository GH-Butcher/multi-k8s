import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({
      values: values.data 
    });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");

    this.setState({
      seenIndexes: typeof seenIndexes.data === Array ? seenIndexes.data : []
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: this.state.index
    });
    this.setState({ index: "" });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.length !== 0
      ? this.state.seenIndexes.map(({ number }) => number).join(", ")
      : "none";
  }

  renderValues() {
    const entries = [];
    if (Object.keys(this.state.values).length !== 0 && this.state.values.indexOf("<!doctype html>") === -1) {
      for (let key in this.state.values) {
        entries.push(
          <div key={key}>
            For index {key} I calculated {this.state.values[key]}
          </div>
        );
      }
    }
    else{
        entries.push(
            <div key="1">
              For index 'none' I calculated 'none'
            </div>
          );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
