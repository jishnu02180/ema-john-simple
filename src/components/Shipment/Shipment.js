import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [LoggedInUser,setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => console.log(data);

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={LoggedInUser.name} ref={register({ required: true })} placeholder="your name"/>
      {errors.name && <span className="error">This name is required</span>}
      <input name="email" defaultValue={LoggedInUser.email} ref={register({ required: true })} placeholder="your email"/>
      {errors.email && <span className="error">This name is required</span>}
      <input name="address" ref={register({ required: true })} placeholder="your Address"/>
      {errors.address && <span className="error">This name is required</span>}
      <input name="phone" ref={register({ required: true })} placeholder="your phone number"/>
      {errors.phone && <span className="error">This name is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;