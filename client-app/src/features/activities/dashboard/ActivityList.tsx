import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Header, Icon, Modal } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate, loading } = activityStore;
    const [target, setTarget] = React.useState('');
    const [open, setOpen] = React.useState(false)


    function handleActivityDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
        setOpen(false);

    }
    function handleOpen(f: boolean, id: string, e: any) {
        if (f) {
            setOpen(f)
        }
        else {
            handleActivityDelete(e, id)
        }
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (

                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.taskName}</Item.Header>

                            <Item.Description>
                                <div > {activity.taskDescription}</div>
                                
                            </Item.Description>
                            <Item.Extra>
                                <Button basic color='black' animated onClick={() => activityStore.selectActivity(activity.id)} floated='right' >
                                    <Button.Content visible>View</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                                <Modal

                                    basic
                                    onClose={() => setOpen(false)}
                                    onOpen={(e) => handleOpen(true, activity.id, e)}
                                    open={open}
                                    size='small'
                                    trigger={<Button inverted color='red' onClick={() => setTarget(activity.id)} floated='right' content='Delete' />}
                                >
                                    <Header icon>
                                        <Icon name='trash' />
                                        Delete Task
                                    </Header>
                                    <Modal.Content>
                                        <p style={{ textAlign: "center" }}>
                                            Are you sure you want to delete this task?
                                        </p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button basic color='red' inverted onClick={() => setOpen(false)} >
                                            <Icon name='remove' /> No
                                        </Button>
                                        <Button color='green' inverted
                                            name={activity.id}
                                            loading={loading && target === activity.id}
                                            onClick={(e) => handleOpen(false, target, e)}>
                                            <Icon name='checkmark' /> Yes
                                        </Button>
                                    </Modal.Actions>
                                </Modal>

                                <Label as='a' image content={activity.taskStatus} >                                     
                                <img  src={`/assets/${activity.taskStatus}.png`} />
                                <Label.Detail>{activity.taskStatus}</Label.Detail>
                                </Label>
                            </Item.Extra>

                        </Item.Content>
                    </Item>

                ))}

            </Item.Group>

        </Segment>

    )
})