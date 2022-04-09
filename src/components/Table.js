import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const font = 'sans-serif';

const textStyle = {
  color: 'white',
  fontFamily: font,
  fontSize: '30px',
  textAlign: 'center',
  margin: '10px',
  padding: '30px',
};

const header = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

const title = {
  color: 'white',
  fontFamily: font,
  textAlign: 'center',
  backgroundColor: 'rgb(43, 42, 51)',
};

const tableStyle = {
  fontFamily: font,
  backgroundColor: 'rgb(66, 65, 77)',
  margin: '40px',
};

const options = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function Table() {
  const {
    data,
    onInputChange,
    filterByName,
    onColumnChange,
    onComparisonChange,
    onValueChange,
    onFilterClick,
    value,
    filterByNumericValues,
  } = useContext(StarwarsContext);

  return (
    <div>
      <h1
        style={ textStyle }
      >
        Starwars
      </h1>
      <div
        style={ header }
      >
        <input
          type="text"
          data-testid="name-filter"
          onChange={ onInputChange }
          placeholder="Planet name"
        />
        <select
          data-testid="column-filter"
          onChange={ onColumnChange }
          id="column-filter"
        >
          {
            options.filter((obj) => !(filterByNumericValues
              .some((elem) => elem.column === obj)))
              .map((option) => (
                <option key={ option } value={ option }>{ option }</option>
              ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ onComparisonChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ onValueChange }
          value={ value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ onFilterClick }
        >
          FILTRAR
        </button>
      </div>
      <table
        border="1"
        style={ tableStyle }
      >
        <thead>
          <tr
            style={ title }
          >
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.filter((obj) => obj.name.toLowerCase()
              .includes(filterByName.toLowerCase()))
              .map((planet) => (
                <tr key={ planet.name }>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.films }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
