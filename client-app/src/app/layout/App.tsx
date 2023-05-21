import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { Outlet } from 'react-router-dom';

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();

  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '6em' }}>
      <ActivityDashBoard />
      
      </Container>

    </>
  );
}

export default App;

