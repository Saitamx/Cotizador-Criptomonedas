import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";

import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from 'axios';

const Botton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66e2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3 ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // State del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: "USD", nombre: "Dolar de Estados Unidos"},
        { codigo: "MXN", nombre: "Peso Mexicano"},
        { codigo: "EUR", nombre: "Euro"},
        { codigo: "GBP", nombre: "Libra Esterlina"},
        { codigo: "CLP", nombre: "Peso Chileno"}
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // utilizar criptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda("Elige tu Criptomoneda", "", listacripto);

    // ejecutar llamado a la api
    useEffect(() =>{
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos campos estan llenos
        if(moneda === "" || criptomoneda === "") {
            guardarError(true);
            return;
        }

        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form 
            onSubmit={cotizarMoneda}
        >   
            {error ? <Error mensaje="Todos los campos son obligatorios" />: null}    
                 
            <SelectMonedas />

            <SelectCripto />

            <Botton
                type= "submit"
                value= "Calcular"
            />
        </form>
    );
};

export default Formulario;