import AddPerson from "../forms/AddPerson";
import People from "../lists/People";
import Title from "./Title";
import AddCar from "../forms/AddCar";
import { GET_PEOPLE } from "../../queries";
import { useQuery } from "@apollo/client";

const Landing = () => {
  const { loading, data } = useQuery(GET_PEOPLE);
  console.log("Hey" + JSON.stringify(data));
  return (
    <>
      <Title />
      <AddPerson />
      {data?.people[0] ? <AddCar /> : false}
      <People />
    </>
  );
};

export default Landing;
