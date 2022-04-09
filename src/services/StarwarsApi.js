const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsStarwars = async () => {
  const response = await fetch(END_POINT);
  const json = await response.json();

  return json;
};

export default getPlanetsStarwars;
