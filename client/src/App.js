import React, { Component } from 'react';
import './App.css';
import AppBody from "./components/appBody";
import 'typeface-roboto';

class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            users: [],
            literals: [],
            commandList:[],
            newCommand:"",
            outputString: ""

        }
    }

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
        fetch('/literals')
            .then(res => res.json())
            .then(literals => this.setState({ literals }));
    }

    updateInput(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        return (
            <div className="App">
                <h1>STOCK DSL</h1>
                <AppBody/>
                <h1>Testing React fetching from Express</h1>
                {this.state.users.map(user =>
                <div key={user.id}>{user.username}</div>
                )}
                {this.state.literals.map((literal, index) =>
                    <div key={index}> {literal} </div>)}
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
