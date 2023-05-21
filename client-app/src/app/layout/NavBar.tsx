import React from 'react';
import { NavLink } from 'react-router-dom';


import { Menu, Container, Button, MenuHeaderProps } from 'semantic-ui-react';
import activityStore from '../stores/activityStore';
import { useStore } from '../stores/store';


export default function NavBar() {
    const {activityStore} = useStore()
   

    return (    
     <Menu tabular inverted fixed='top'>
     <Container>
        
        <Menu.Item header  >        
             <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
             ToDoList
             </Menu.Item>               
            <Menu.Item>
              <Button animated='vertical'  basic inverted  onClick={()=>activityStore.openForm()}>
             <Button.Content visible>Create Task</Button.Content>
             <Button.Content hidden>For free</Button.Content>
              
             
              </Button>
         </Menu.Item>
     </Container>
     </Menu>
    )

}