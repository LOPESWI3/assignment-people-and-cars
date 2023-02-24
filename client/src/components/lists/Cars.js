import { useQuery } from "@apollo/client";
import { List } from "antd";
import { useState } from "react";
import { GET_CARS } from "../../queries";
import CarsCard from "../listItems/CarsCard";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cars = (props) => {
  const [personId] = useState(props.personId);
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);

  const cars = data?.cars.filter((car) => car.personId === personId);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {cars.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <CarsCard
            key={id}
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;
