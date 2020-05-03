import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1.2rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
`;

const useMoneda = (label, stateIncial, opciones) => {
  // State del custom hook
  const [state, actualizarState] = useState(stateIncial);

  const Seleccionar = () => (
    <>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
        <option value="">-Selecione-</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );

  // Retornar state, interfaz y funcion que modifica el state
  return [state, Seleccionar, actualizarState];
};

useMoneda.propTypes = {
  label: PropTypes.string.isRequired,
  stateIncial: PropTypes.string.isRequired,
  opciones: PropTypes.array.isRequired,
};

export default useMoneda;
