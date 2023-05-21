import  React, { ChangeEvent, useEffect, useState } from 'react';
import { Button,  Header, Icon, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { Dropdown } from 'semantic-ui-react'
import { Formik, Form, ErrorMessage} from 'formik';
import { values } from 'mobx';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { statusOptions } from '../../../app/common/options/statusOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MyStatusInput from '../../../app/common/form/MyStatusInput';


export default function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, createActivity, updateActivity, 
        loading, loadActivity, closeForm, loadingInitial} = activityStore;
    const {id} = useParams();
    

    const initialState = selectedActivity ?? {
        id: '',
        taskName: '',
        taskDescription: '',
        dataOfCreation: null,
        dateOfExperation: null,
        taskStatus: '',
        }
        const [activity, setActivity] = useState(initialState);
    const validationSchema = Yup.object({
        taskName: Yup.string().required('The task name is required'),
        taskDescription: Yup.string().required('The task description is required'),
        dataOfCreation: Yup.string().required('The task date is required'),
        dateOfExperation: Yup.string().required('The task date is required'),
        taskStatus: Yup.string().required('The task status is required'),
    
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);
 
    function handleFormSubmit(activity: Activity) {
        if (activity.id.length ===0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity)
        } else {
            updateActivity(activity)
        }
    }
  
    
if (loadingInitial) return <LoadingComponent content='Loading activity...' />


    return (

       <Segment clearing>
    <Header content='Task Details' sub color='black'/>
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={activity} 
        onSubmit={values=>handleFormSubmit(values)}>
            {({handleSubmit, isValid, isSubmitting, dirty})=>(
                
            <Form className='ui form'onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='Task name'name='taskName' />
            <MyTextArea rows={3} placeholder='Description'  name ='taskDescription' />
            <MyDateInput  placeholderText='Date'  name ='dataOfCreation' showTimeSelect timeCaption='time' dateFormat='d MMMM, yyyy HH:mm' />
            <MyDateInput  placeholderText='Date end' name ='dateOfExperation' showTimeSelect timeCaption='time' dateFormat='d MMMM, yyyy HH:mm' />
            <MySelectInput options={statusOptions} placeholder='Status' name='taskStatus'/> 

            <Button disabled={isSubmitting} loading={loading} floated='right'>
            <Icon name='check' />
             Submit
            </Button>
            <Button onClick={closeForm} floated='right' type='button'> 
            <Icon name='redo' />
            Cancel
            </Button>
        </Form>
            )}

        </Formik>
        
       </Segment>
    )
}

