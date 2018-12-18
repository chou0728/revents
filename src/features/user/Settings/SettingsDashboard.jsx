import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, Switch, Redirect } from 'react-router-dom'
import SettingsNav from '../../user/Settings/SettingsNav';
import BasicPage from '../../user/Settings/BasicPage';
import AboutPage from '../../user/Settings/AboutPage';
import PhotosPage from '../../user/Settings/PhotosPage';
import AccountPage from '../../user/Settings/AccountPage';

const style = {
  padding: '10px 0'
};

// 使用 Redirect 來重導向，並預設一進來的頁面
const SettingsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={12} className="setting-title" style={style}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basics'/> 
          <Route path='/settings/basics' component={BasicPage}/>
          <Route path='/settings/about' component={AboutPage}/>
          <Route path='/settings/photos' component={PhotosPage}/>
          <Route path='/settings/account' component={AccountPage}/>
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav/>
      </Grid.Column>
    </Grid>
  );
};

export default SettingsDashboard;
