import { Alert, Dimensions, FlatList, Image, PixelRatio, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { RootStackParamList } from '../navigations/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import usePost from '../hooks/usePost';
import Component from '../components/Component';
import { Styles } from '../themes/Styles';
import Icon from 'react-native-vector-icons/Octicons';
import { usePrimaryContext } from '../contexts/PrimaryContext';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderScreen from "../components/HeaderScreen";

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

const Post = (props: Props) => {
    const { user, darkMode } = usePrimaryContext();
    const { navigation, route } = props;
    const post = route.params.post;
    const fontScale = PixelRatio.getFontScale();
    const getFontSize = (size: number) => size / fontScale;
    const fullScreen = Dimensions.get("window").scale;
    const getIconSize = (size: number) => size / fullScreen;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderScreen name={route.name} navigation={navigation} profile={true} drawer={false}/>
            <View style={{ maxHeight: "90%" }}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={{
                            uri: post.image,
                            width: 150,
                            height: 150
                        }}
                        style={{ margin: "5%", width: getIconSize(300), height: getIconSize(300) }}
                    />
                    <View style={{}}>
                        <Text style={{ fontSize: 25, color: (darkMode) ? "white" : "black" }}>Cost: {post.priceRange}</Text>
                        <Text style={{ fontSize: 15, maxWidth: "73%", color: (darkMode) ? "white" : "black" }}>Description: {"\n\n"}{post.description}{"\n\n"}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 25, color: (darkMode) ? "white" : "black", borderColor: "#ca2613", borderWidth: 2, borderTopWidth: 0 }}>Components Used:{"\n"}</Text>
                <FlatList
                    contentContainerStyle={{ borderColor: "#ca2613", borderWidth: 2, borderTopWidth: 0 }}
                    data={post.build.buildsComponents}
                    renderItem={(buildComponent) => {
                        return (
                            <View>
                                <Component comp={buildComponent.item.component} />
                                <TouchableOpacity style={{ ...Styles.touchable, alignItems: 'center' }} onPress={() => Alert.alert("añadiría a los favoritos")}>
                                    <Text style={{ color: (darkMode) ? "white" : "black" }}>Add to Wish List</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    keyExtractor={(comp, index) => index + ""}
                //ItemSeparatorComponent={() => <Text style={{ color: "#ca2613" }}>―――――――――――――</Text>}
                />
            </View>
        </SafeAreaView>
    )
}

export default Post

const styles = StyleSheet.create({})