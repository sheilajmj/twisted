import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import PageNav from '../Navigation/PageNav';


class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }

  //Loads users from database and sets the value in state
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <AccountNavigationMain userId={this.props.match.params.userId} />
        <PageNav userId={this.props.match.params.userId} pageHeader={"Admin"} />
        <div className="flex-container">
          {loading && <div> Loading ...</div>}
          <div className="flex-item">
            <UserList users={users} />
          </div>
        </div>
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul className="user-list flex-container">
    {users.map(user => (
      <li key={user.uid} className="ad-li ta-l pad-sm flex-item-md">
        <div><strong>ID: </strong>{user.uid}</div>
        <div><strong>E-Mail:  </strong>{user.email}</div>
        <div><strong>Username:  </strong>{user.username}</div>
      </li>
    ))}
  </ul>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase)
  (AdminPage);