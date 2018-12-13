import React, { Component } from 'react';
import './App.css';
import PouchDB from 'pouchdb'


const db = new PouchDB('hoda5');
const remote = 'http://localhost:9000/todos'
const remoteMatheus = 'http://192.168.15.12:9000/teste'
class App extends Component {
  constructor() {
    super()
    this.add = this.add.bind(this)
  }
  componentDidMount() {
    sync()
  }

  add() {
    const date = new Date().toString()
    const data = {
      _id: date,
      descricao: date,
    }
    db.put(data).then((res) => {
      console.log(res)
    }).catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.add}>Pouch</button>
      </div>
    );
  }
}

export default App;


var opts = { live: true }
function sync() {
    db.sync(remote, opts)
    PouchDB.replicate(remote, remoteMatheus, opts)
}