import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './pages/Home';
import Search from './pages/Search';

const Drawer = createDrawerNavigator();

export default function Routes(){
    return (
        <Drawer.Navigator drawerStyle={{paddingTop: 30}}>
            <Drawer.Screen name="Home" component={Home} options={{title: 'Minha cidade'}}  />
            <Drawer.Screen name="Search" component={Search} options={{title: 'Procurar cidade'}} />
        </Drawer.Navigator>
    )
}