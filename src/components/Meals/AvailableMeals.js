import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Veggie Pizza",
//     description: "Finest crust loaded with veggies..!",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Burrito Bowl",
//     description:
//       "...with tofu, beans, brown rice and fajita veggies, fresh tomato salsa, guacamole and lettuce.",
//     price: 16.50,
//   },
//   {
//     id: "m3",
//     name: "Penne all’arrabbiata",
//     description:
//       "Traditional Italian recipe, best way to use up those canned tomatoes....",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
//   {
//     id: "m5",
//     name: "Crispy Tofu Bowl",
//     description:
//       "Tofu gets pan-fried then served over a hearty bowl of quinoa studded with veggies.!!",
//     price: 27.85,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-425f7-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Oops, Something went wrong!");
      }
      const responseData = await response.json();

      //tranforming the object received in respponseData to array
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setErrorOccured(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }

  if (errorOccured) {
    return (
      <section className={classes.mealsError}>
        <p>{errorOccured}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
