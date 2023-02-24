import { Button, Form, Input, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const [form] = Form.useForm();

  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate([]);
  }, []);

  const { data, loading, error } = useQuery(GET_PEOPLE);
  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return (
    <>
      <h2>ADD Car</h2>

      <Form
        name="add-car-form"
        form={form}
        layout="inline"
        onFinish={onFinish}
        size="large"
        style={{ marginBottom: "40px" }}
      >
        <Form.Item
          label="Year"
          name="year"
          rules={[
            {
              required: true,
              message: "Please input your car model year!",
            },
            {
              type: "number",
              min: 1900,
              message: "Year cannot be less than 1900",
              transform: (value) => +value,
            },
            {
              type: "number",
              max: 2022,
              message: "Year cannot be greater than 2022",
              transform: (value) => +value,
            },
            {
              type: "number",
              message: "Please only input integer",
              transform: (value) => +value,
            },
          ]}
        >
          <Input placeholder="1944" />
        </Form.Item>
        <Form.Item
          label="Make"
          name="make"
          rules={[{ required: true, message: "Input Make" }]}
        >
          <Input placeholder="Buggati" />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Input model" }]}
        >
          <Input placeholder="VX78" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input your car price!" },
            {
              type: "number",
              message: "Price must be a positive number",
              transform: (value) => +value,
            },
          ]}
        >
          <Input min={1} addonAfter="$" placeholder="i.e. 15000" />
        </Form.Item>
        <Form.Item
          label="PersonId"
          name="personId"
          rules={[{ required: true, message: "Input Owner" }]}
        >
          <Select>
            {!loading && !error && data ? (
              <>
                {data.people.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </Select.Option>
                ))}
              </>
            ) : (
              <></>
            )}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCar;
