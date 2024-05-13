import 'react-native-gesture-handler';
import 'reflect-metadata';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';
import PrimaryContextProvider, {PrimaryContext} from './src/contexts/PrimaryContext';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import {MenuProvider} from "react-native-popup-menu";


type SectionProps = PropsWithChildren<{
    title: string;
}>;

function App(): JSX.Element {
    return (
        <MenuProvider>
            <NavigationContainer>
                <View style={{flex: 1}}>
                    <PrimaryContextProvider>
                        <StackNavigator/>
                    </PrimaryContextProvider>
                </View>
            </NavigationContainer>
        </MenuProvider>
    );
}

export default App;