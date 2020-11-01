import React, {Component} from 'react';

class Bata extends Component{
    
    render(){
        let receta = {
            nombre: "pizza",
            ingredientes: ["masa", "tomate", "queso"],
            calorias: 500
        };    
        return (
            <div>
                <hr />
                <h1>{receta.nombre}</h1>
                <h2>{receta.ingredientes.join(", ")}</h2>
                <h2>{receta.calorias}</h2>
                <hr />
            </div>
        );
    }
}

export default Bata;