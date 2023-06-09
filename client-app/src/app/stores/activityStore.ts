
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {format} from 'date-fns';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.dateOfExperation!.getTime() - b.dateOfExperation!.getTime()
        )
    }

   loadActivities = async () => {
    this.setLoadingInitial(true);

    try {
        const activities = await agent.Activities.list();
  
            activities.forEach(activity => {
                this.setActivity(activity);

               
            })
            this.setLoadingInitial(false);
    }
    catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
    }

   }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
            
        }
        else {
            this.setLoadingInitial(true);   
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity)
                
                this.setLoadingInitial(false);               
                return activity;
              
            }
            catch (error) {
                console.log(error);               
                this.setLoadingInitial(false);          
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.dataOfCreation = new Date(activity.dataOfCreation!);
        activity.dateOfExperation = new Date(activity.dateOfExperation!);
        this.activityRegistry.set(activity.id, activity);
    }

   setLoadingInitial = (state: boolean) => {
         this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
     
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
            this.loading = false;
        })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
                
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }



}

   
