import React from "react";
import "./App.css";
import "./lib/api";
import api from "./lib/api";
class App extends React.Component {
  //Estados
  constructor(props) {
    super(props);
    this.state = {
      modalActivo: false,
      personajes: [],
      personajeSeleccionado: {}
    };
  }

  componentDidMount() {
    api
      .getAllCharacters()
      .then(results => {
        this.setState({
          personajes: results
        });
      })
      .catch(e => console.error(e));
  }

  //Lo único que hace es actualizar el estado modal activo en true
  activarModal(id) {
    api.getAllCharactersById(id).then(personaje => {
      this.setState({
        modalActivo: true,
        personajeSeleccionado: personaje
      });
    });

    //console.log(this.state)
  }
  desactivarModal() {
    this.setState({
      modalActivo: false
    });
  }

  renderCards(p) {
    //Consumir una API REST
    return (
      <div
        key={p.id}
        className="Card"
        onClick={personaje => this.activarModal(p.id)}
      >
        <div className="Card-image">
          <figure>
            <img  alt="" src={p.image} />
          </figure>
        </div>
        <div className="Card-descripcion">
          <div className="Card-name">
            <h3>{p.name}</h3>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { modalActivo, personajes } = this.state;
    //Leer datos xd
    //No puede cambiar en el futuro
    //const fakeData = [0, 1, 2, 3, 4, 5, 6, 7];

    //Regresa un array computado
    const cards = personajes.map(p => this.renderCards(p));
    console.log(cards);

    return (
      <div className="App">
        <div className="App-contenedor">
          <h1>Rick and Morty</h1>
          <div className="Cards-container">{cards}</div>
          {modalActivo ? (
            <div className="Modal" onClick={e => this.desactivarModal()}>
              <div className="Card-detalle">
                <div className="Card-image">
                  <figure>
                    <img
                      alt="test"
                      src={this.state.personajeSeleccionado.image}
                    />
                  </figure>
                </div>
                <div className="Card-detalle-descripcion">
                  56<div className="descripcion">
                    <h3>{this.state.personajeSeleccionado.name}</h3>
                    <div className="caracteristica">
                      <p>Status</p>
                      <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.status}
                      </p>
                    </div>
                    <div className="caracteristica">
                      <p>Especie</p>
                      <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.species}
                      </p>
                    </div>
                    <div className="caracteristica">
                      <p>Genero</p>
                      <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.gender}
                      </p>
                    </div>
                    <div className="caracteristica">
                      <p>Origen</p>
                      <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.origin.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
