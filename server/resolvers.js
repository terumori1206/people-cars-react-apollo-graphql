const { people, cars } = require('./src/peopleCarsScheme');

const resolvers = {
  Query: {
    people: () => {
      return people.map(person => ({
        ...person,
        cars: cars.filter(car => car.personId === person.id) || []
      }));
    },
    person: (_, { id }) => {
      const foundPerson = people.find(person => person.id === id);
      if (!foundPerson) return null;
      return { ...foundPerson, cars: cars.filter(car => car.personId === id) || [] };
    },
    cars: () => cars,
  },
  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const newPerson = { id: String(people.length + 1), firstName, lastName };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (_, { id, firstName, lastName }) => {
      const person = people.find(p => p.id === id);
      if (person) {
        person.firstName = firstName;
        person.lastName = lastName;
      }
      return person;
    },
    deletePerson: (_, { id }) => {
      const index = people.findIndex(p => p.id === id);
      if (index !== -1) {
        people.splice(index, 1);
        return true;
      }
      return false;
    },
    addCar: (_, { year, make, model, price, personId }) => {
      const newCar = { id: String(cars.length + 1), year, make, model, price, personId };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (_, { id, year, make, model, price }) => {
      const car = cars.find((c) => c.id === id);
      if (!car) {
        throw new Error('Car not found');
      }
    
      car.year = year;
      car.make = make;
      car.model = model;
      car.price = price;
      return car;
    },
    deleteCar: (_, { id }) => {
      const index = cars.findIndex(c => c.id === id);
      if (index !== -1) {
        cars.splice(index, 1);
        return true;
      }
      return false;
    },
  }
};

module.exports = resolvers;
