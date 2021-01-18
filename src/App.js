import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class Borrar extends React.Component {
  render() {
    return <button name={this.props.name} onClick={this.props.onClick} type="button" className="btn btn-danger">Borrar</button>;
  }
}

class Editar extends React.Component {
  render() {
    return <button onClick={this.props.onClick} type="button" className="btn btn-warning">Editar</button>;
  }
}

class Add extends React.Component {



  render() {

    let styleAdd = {
      marginRight: 10
    };


    

    return <button style={styleAdd} onClick={this.props.onClick} type="button" className="btn btn-success">ADD</button>;



  }



}

class Fila extends React.Component {


  handleBORRARClick(event) {
    event.preventDefault()
    var data = {

        id: event.target.name

    }

    fetch("https://crud-node-react-back.herokuapp.com/delete", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    window.location.reload();

  }


  render() {
    return <tr>
    <th scope="row">{this.props.id}</th>
    <td>{this.props.nombre}</td>
    <td>{this.props.apellido}</td>
    <td>{this.props.edad}</td>
    <td>
    <Borrar name={this.props.name} onClick={this.handleBORRARClick} />
    </td>
  </tr>;
  }


}


class Titulo extends React.Component {
  render() {
    return <h1 style={this.props.style}>CRUD (React. Node. Express. MySql. Bootstrap.)</h1>;
  }
}

class TBodyy extends React.Component {

  constructor(props) {

    super(props);
    this.state = { personas: [] };

  }


    callAPI() {

        fetch("https://crud-node-react-back.herokuapp.com/select")
            .then(res => res.json())
            .then(personas => this.setState({ personas: personas }));


    }

    componentWillMount() {
        this.callAPI();
    }



  render() {
    return <tbody>


      {this.state.personas.map(persona =>
      <Fila name={persona.id} id={persona.id} nombre={persona.nombre} apellido={persona.apellido} edad={persona.edad} />
      )}


    </tbody>;
  }



}


class App extends React.Component {


  constructor(props) {
    super(props);
    this.handleADDClick = this.handleADDClick.bind(this);
    this.handleEDITARClick = this.handleEDITARClick.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEd = this.handleSubmitEd.bind(this);
    this.logChange = this.logChange.bind(this);
    this.state = {
      
      
      add: false,

      editando: false,

      nombre: '',

      apellido: '',

      edad: '',

      msg: '',

      nombreED: '',

      apellidoED: '',

      edadED: '',

      idED: ''
    
    
    };
  }

  handleADDClick() {
    this.setState({add: true});
  }

  handleEDITARClick() {
    this.setState({editando: true});
  }

  handleSubmitAdd(event) {
    event.preventDefault()
    var data = {

        nombre: this.state.nombre,

        apellido: this.state.apellido,
  
        edad: this.state.edad

    }

    fetch("https://crud-node-react-back.herokuapp.com/insert", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    window.location.reload();

  }

  logChange(e) {
      this.setState({[e.target.name]: e.target.value});  
  }


  handleSubmitEd(event) {
    event.preventDefault()
    var dataED = {

        nombre: this.state.nombreED,

        apellido: this.state.apellidoED,
  
        edad: this.state.edadED,

        id: this.state.idED,

    }

    fetch("https://crud-node-react-back.herokuapp.com/up", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataED)
    });

    window.location.reload();

  }
  




  render() {




    const ed = this.state.editando;
    let editar;
    if (ed) {

    editar=<tr><th><form onSubmit={this.handleSubmitEd} method="post" id="form11"><div className="form-group"><input value={this.state.idED} onChange={this.logChange} form="form11" name="idED" className="form-control form-control-lg" type="text" placeholder="id" /></div></form></th>
    <th><div className="form-group"><input value={this.state.nombreED} onChange={this.logChange} form="form11" name="nombreED" className="form-control form-control-lg" type="text" placeholder="nombre" /></div></th>
    <th><div className="form-group"><input value={this.state.apellidoED} onChange={this.logChange} form="form11" name="apellidoED" className="form-control form-control-lg" type="text" placeholder="apellido" /></div></th>
    <th><div className="form-group"><input value={this.state.edadED} onChange={this.logChange} form="form11" name="edadED" className="form-control form-control-lg" type="text" placeholder="edad" /></div></th>
    <th><div className="form-group"><input form="form11" type="submit" className="btn btn-block btn-lg btn-dark" value="Editar" /></div></th></tr>;



    } else {
      editar = "";
    }







    const add = this.state.add;
    let anadir;
    if (add) {

    anadir=<tr><th><form onSubmit={this.handleSubmitAdd} method="post" id="form10"><input type="hidden" name="idd" defaultValue="id" /></form></th>
    <th><div className="form-group"><input value={this.state.nombre} onChange={this.logChange} form="form10" name="nombre" className="form-control form-control-lg" type="text" placeholder="nombre" /></div></th>
    <th><div className="form-group"><input value={this.state.apellido} onChange={this.logChange} form="form10" name="apellido" className="form-control form-control-lg" type="text" placeholder="apellido" /></div></th>
    <th><div className="form-group"><input value={this.state.edad} onChange={this.logChange} form="form10" name="edad" className="form-control form-control-lg" type="text" placeholder="edad" /></div></th>
    <th><div className="form-group"><input form="form10" type="submit" className="btn btn-block btn-lg btn-success" value="Agregar" /></div></th></tr>;



    } else {
      anadir = "";
    }



    let stylesTable = {
      color: 'black'
    };

    let stylesTitulo = {
      color: 'pink'
    };




    return (

      


              <div className="App">


              <br></br>
              
              
              <Titulo style={stylesTitulo} />


              <br></br>


              <Add onClick={this.handleADDClick} />

              <Editar onClick={this.handleEDITARClick} />

              <br></br><br></br>

              <div className="container-fluid">
              <div className="row">
              <div className="col-sm">
              <table style={stylesTable} className="table table-hover table-light">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Edad</th>
                <th scope="col">Acciones</th>
              </tr>
              {anadir}
              {editar}
              </thead>
              <TBodyy />
              </table>
              </div>
              </div>
              </div>







              </div>


    );


  }




  
}



export default App;
