import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarwarsContext from './StarwarsContext';
import getPlanetsStarwars from '../services/StarwarsApi';

function StarwarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setfilterByName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  console.log('data=>', data);

  const getPlanets = async () => {
    const response = await getPlanetsStarwars();
    setData(response.results);
    setDataFiltered(response.results);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const onInputChange = (event) => {
    const planetName = event.target.value;
    setfilterByName(planetName);
  };

  const onColumnChange = (event) => {
    const columnName = event.target.value;
    setColumn(columnName);
  };

  const onComparisonChange = (event) => {
    const operator = event.target.value;
    setComparison(operator);
  };

  const onValueChange = (event) => {
    const number = event.target.value;
    setValue(number);
  };

  const onFilterClick = () => {
    setFilterByNumericValues((prevState) => (
      [...prevState, {
        column,
        comparison,
        value,
      }]
    ));

    if (comparison === 'maior que') {
      setDataFiltered(dataFiltered.filter((planet) => (+planet[column] > +value)));
    } else if (comparison === 'menor que') {
      setDataFiltered(dataFiltered.filter((planet) => (+planet[column] < +value)));
    } else if (comparison === 'igual a') {
      setDataFiltered(dataFiltered.filter((planet) => (planet[column] === value)));
    }
  };

  return (
    <StarwarsContext.Provider
      value={ {
        data: dataFiltered,
        onInputChange,
        filterByName,
        onColumnChange,
        column,
        onComparisonChange,
        comparison,
        onValueChange,
        value,
        onFilterClick,
        filterByNumericValues,
      } }
    >
      {children}
    </StarwarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StarwarsProvider;
