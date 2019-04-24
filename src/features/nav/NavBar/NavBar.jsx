import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions'

const actions = {
  openModal
}
class NavBar extends Component {
  state = {
    authenticated: false //一開始預設是沒登入的狀態，要操作一些行為後才跳出讓使用者登入
  };

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push('/');
  };
  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
          {authenticated && ( //只有登入後才出現
            <Menu.Item as={NavLink} to="/people" name="PeopleDashboard" />
          )}
          {authenticated && ( //只有登入後才出現
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                positive
                inverted
                content="Create Event"
              />
            </Menu.Item>
          )}
          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(connect(null, actions)(NavBar));
//使用 high order component 來將component當成參數，送進withRouter這個function中，withRouter function回return一個具有Route所有特性的component
