import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../../actions/users';

const ProfileForm = ({ addUser }) => {
  const [formData, setFormdata] = useState({
    username: '',
    email: '',
    birthdate: '',
  });

  const { username, email, birthdate } = formData;

  const onChange = (e) =>
    setFormdata({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add New User</h1>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addUser(formData);
        }}
      >
        <div className='form-group'>
          <h4>Username</h4>
          <input
            type='text'
            placeholder='* John Doe'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <h4>Email</h4>
          <input
            type='email'
            placeholder='* anonymous@gmail.com'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <h4>Birthdate</h4>
          <input
            type='date'
            name='birthdate'
            value={birthdate}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(null, { addUser })(ProfileForm);
