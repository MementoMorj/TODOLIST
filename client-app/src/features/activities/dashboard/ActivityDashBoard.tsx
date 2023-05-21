import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    const {selectedActivity, editMode} = activityStore;
    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size])
          
            if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
            
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                />
            </Grid.Column>
            <Grid.Column width='6'>               
                {selectedActivity && !editMode &&
                <ActivityDetails            
                />}
                {editMode &&
                <ActivityForm 
                />}
            </Grid.Column>
            
        </Grid>
        
    )
})