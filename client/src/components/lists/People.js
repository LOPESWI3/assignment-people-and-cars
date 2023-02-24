import { useQuery } from "@apollo/client";
import { List } from "antd";
import { Link } from "react-router-dom";
import { GET_PEOPLE } from "../../queries";
import PersonCard from "../listItems/PersonCard";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <PersonCard
          key={id}
          id={id}
          firstName={firstName}
          lastName={lastName}
        />
      ))}
    </List>
  );
};

export default People;
