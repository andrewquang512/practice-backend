import React from 'react';
import { connect } from 'react-redux';
import { deleteUser, filterByValue } from '../../actions/users';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ProfileForm from '../ProfileForm/ProfileForm';
import Alert from '../Alert/Alert';

const Profiles = ({
  user: { users, filteredusers },
  deleteUser,
  filterByValue,
}) => {
  const handleSearch = (e) => {
    filterByValue(e.target.value);
  };
  console.log(filteredusers.length);
  return (
    <section className='container'>
      <Alert />
      <ProfileForm />
      <h2 className='my-2'>Users</h2>
      <div className='form-group'>
        <h4>Username</h4>
      </div>
      <form className='form'>
        <input
          id='seach'
          type='text'
          placeholder='Search User'
          onChange={handleSearch}
        />
      </form>
      <br></br>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='hide-sm'>Email</th>
            <th className='hide-sm'>Date of Birth</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredusers.length !== 0
            ? filteredusers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td className='hide-sm'>{user.email}</td>
                  <td>
                    <Moment format='YYYY/MM/DD'>{user.birthdate}</Moment>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td className='hide-sm'>{user.email}</td>
                  <td>
                    <Moment format='YYYY/MM/DD'>{user.birthdate}</Moment>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </section>
  );
};

Profiles.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { deleteUser, filterByValue })(
  Profiles
);
