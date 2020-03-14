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
      personajes: []
    };
  }

  componentDidMount(){
    api.getAllCharacters()
      .then(results => {
        this.setState({
          personajes: results
        })
      })
      .catch(e => console.error(e))
  }

  //Lo único que hace es actualizar el estado modal activo en true
  activarModal() {
    this.setState({
      modalActivo: true
    });
  }
  desactivarModal() {
    this.setState({
      modalActivo: false
    });
  }

  renderCards(e) {
    //Consumir una API REST
    return (
      <div key={e.id} className="Card" onClick={e => this.activarModal()}>
        <div className="Card-image">
          <figure>
            <img
              src={e.image}
            />
          </figure>
        </div>
        <div className="Card-descripcion">
          <div className="Card-name">
            <h3>{e.name}</h3>
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
            <div className="Modal" onClick={e => this.desactivarModal(e)}>
              <div className="Detalle">
                <div className="Card-image">
                  <figure>
                    <img
                      src={
                        "https://rickandmortyapi.com/api/character/avatar/56.jpeg"
                      }
                    />
                  </figure>
                </div>
                <div className="Card-detalle-descripcion">
                  <div className="descripcion">
                    <h3>Name</h3>
                    <div className="caracteristica">
                      <p>Status</p>
                      <p className="caracteristica-valor">Muerto</p>
                    </div>
                    <div className="caracteristica">
                      <p>Especie</p>
                      <p className="caracteristica-valor">Humano</p>
                    </div>
                    <div className="caracteristica">
                      <p>Genero</p>
                      <p className="caracteristica-valor">??</p>
                    </div>
                    <div className="caracteristica">
                      <p>Origen</p>
                      <p className="caracteristica-valor">Tierra</p>
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
