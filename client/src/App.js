import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            users: [],
            commandList:[],
            newCommand:""
        }
    }

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    updateInput(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleCommand() {
        this.addCommand();
    }

    addCommand() {
        const command = this.state.newCommand.slice();
        // copy current list of commands
        const list = [...this.state.commandList];
        list.push(command);

        // update state of commandList and reset newCommand
        this.setState({
            commandList: list, newCommand: ""
        });
    }

    render() {
        return (
            <div className="App">
            <input
                type="text"
                placeholder="Please Enter a Command"
                value={this.state.newCommand}
                onChange={e => this.updateInput("newCommand", e.target.value)}
            />
            <button onClick={() => this.handleCommand()}>Enter</button>
            <ul>
                {this.state.commandList.map(command => {
                    return(<div>{command}</div>)
                })}
            </ul>
            <h1>Testing React fetching from Express</h1>
        {this.state.users.map(user =>
        <div key={user.id}>{user.username}</div>
        )}
    </div>
    );
    }
}

export default App;
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
