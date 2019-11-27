import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      selected: "Sum"
    };
  }

  validateInput = str => {
    let inputArr = str.split(",");
    return {
      valid: inputArr.length ? inputArr.every(num => !isNaN(num)) : false,
      inputs: inputArr
    };
  };

  compute = (arr, operation) => {
    if (operation === "Sum") {
      return arr.reduce((acc, num) => acc + Number(num), 0);
    } else if (operation === "Mode") {
      let obj = {};
      let max = null;

      arr.forEach(num => {
        let number = num;
        if (obj.hasOwnProperty(number)) {
          console.log("Has", number);
          let count = obj[number];
          obj[number] = count + 1;
          if (obj[number] > max) {
            max = number;
          }
        } else {
          obj[number] = 1;
        }
      });
      return max !== null ? max : "None";
    } else if (operation === "Avg") {
      return arr.reduce((acc, num) => acc + Number(num), 0) / arr.length;
    }
  };

  changeInput = e => {
    this.setState({ input: e.target.value });
  };

  calculate = e => {
    e.preventDefault();
    if (!this.state.input) {
      this.setState({ ...this.state, answer: "" });
      return;
    }
    const validInput = this.validateInput(this.state.input);

    console.log(validInput);

    if (validInput.valid) {
      const answer = this.compute(validInput.inputs, this.state.selected);
      console.log("Answer", answer);
      this.setState({ ...this.state, answer: answer });
    } else {
      this.setState({ ...this.state, answer: "Invalid Inputs" });
    }
    console.log("Calculate", validInput, this.state.input);
  };

  selected = e => {
    this.setState({ ...this.state, selected: e.target.value });
    console.log(e.target.value);
  };

  render() {
    const answer = this.state.answer && <p>{this.state.answer}</p>;
    return (
      <div>
        <form onSubmit={this.calculate}>
          <h1>
            Write number seperated by a <strong>,</strong>
          </h1>
          <input
            type="text"
            placeholder="Enter numbers"
            onChange={this.changeInput}
          />
          <select value={this.state.selected} onChange={this.selected}>
            <option value="Sum">Sum</option>
            <option value="Avg">Avg</option>
            <option value="Mode">Mode</option>
          </select>
          <button>Calculate</button>
        </form>
        {answer}
      </div>
    );
  }
}

export default Form;
