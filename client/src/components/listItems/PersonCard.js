import { Card } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import RemovePerson from "../buttons/RemovePerson";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import Cars from "../lists/Cars";

const getStyles = () => ({
  card: {
    width: "800px",
    margin: "1rem",
  },
});

const PersonCard = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          key={props.id}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {firstName} {lastName}
          <Cars personId={props.id} />
          <Link to={`/person/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};

export default PersonCard;
