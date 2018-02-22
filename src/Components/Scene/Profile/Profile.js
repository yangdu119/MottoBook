import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'
import './Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        console.log("refetch profile")
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    console.log('profile', profile);
    return (
        <div>
        <MottoBookHeader auth={this.props.auth} {...this.props} />
          <div className="container">
            <div className="profile-area">
              <h1>{profile.name}</h1>
              <Panel header="Profile">
                <img src={profile.picture} alt="profile" />
                <div>
                  <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
                  <h3>{profile.nickname}</h3>
                </div>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
              </Panel>
            </div>
          </div>
            <MottoBookFooter />
        </div>
    );
  }
}

export default Profile;
