import { link } from "fs";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {Button, Card, Image} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from '../../../app/stores/store';

export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, openForm, loadingInitial, cancelSelectedActivity} = activityStore;

  

  if (!activity) return <LoadingComponent />;
  
    return (
        <Card fluid>
   
    <Card.Content>
      <Card.Header>{activity.taskName}</Card.Header>
    
      <Card.Description>
        {activity.taskDescription}
        
      </Card.Description>
      <Card.Meta>
      <div>Created: {activity.dataOfCreation?.toDateString()}</div>
        <div>Deadline: {activity.dateOfExperation?.toDateString()}</div>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths={2}>
        
            <Button animated='fade' onClick={()=>openForm(activity.id)} basic color='black' >
            <Button.Content visible>Edit</Button.Content>
            <Button.Content hidden>Change details</Button.Content>
               </Button>
            <Button.Or />
            <Button animated='fade' onClick={cancelSelectedActivity} basic color='red'  >
            <Button.Content visible>Cancel</Button.Content>
            <Button.Content hidden>Return back</Button.Content>
            </Button>
        </Button.Group>
    </Card.Content>
  </Card>
    )
}