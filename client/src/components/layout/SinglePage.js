import { PERSON_WITH_CARS } from "../../queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const getStyles = () => ({
  card: {
    width: "800px",
    margin: "1rem",
  },
});

const SinglePage = () => {
  const { personId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const styles = getStyles();

  const { loading, error, data } = useQuery(PERSON_WITH_CARS, {
    variables: {
      id: personId,
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const cars = data?.personWithCars.cars;
  console.log(cars);

  return (
    <>
      <Link to={"/"}>
        <Button style={styles.backButton}>Go Back</Button>
      </Link>
      <Card style={styles.card}>
        {data?.personWithCars.firstName} {data?.personWithCars.lastName}
        <>
          {cars.map(({ id, year, make, model, price, personId }) => (
            <Card key={id}>
              {year} {make} {model} -{">"} {price}
            </Card>
          ))}
        </>
      </Card>
    </>
  );
};

export default SinglePage;
