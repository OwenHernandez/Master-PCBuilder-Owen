import {View, Text, TouchableOpacity, FlatList, Image, Alert, PixelRatio, TextInput} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Styles} from '../themes/Styles';
import {DrawerActions} from '@react-navigation/native';
import {usePrimaryContext} from '../contexts/PrimaryContext';
import IPostType from '../interfaces/IPostType';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigations/StackNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {Dimensions} from 'react-native';
import HeaderScreen from "../components/HeaderScreen";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import {Globals} from "../components/Globals";

type Props = NativeStackScreenProps<RootStackParamList, 'Social'>;

const Social = (props: Props) => {
    const {user, darkMode, token} = usePrimaryContext();
    const {navigation, route} = props;
    const fontScale = PixelRatio.getFontScale();
    const getFontSize = (size: number) => size / fontScale;
    const fullScreen = Dimensions.get("window").scale;
    const getIconSize = (size: number) => size / fullScreen;
    const [postsList, setPostsList] = useState([{}] as IPostType[]);
    const [postsByTitle, setPostsByTitle] = useState([{}] as IPostType[]);

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        try {
            const response = await axios.get(Globals.IP + "/api/v2/posts", {headers: {"Authorization": "Bearer " + token}});
            setPostsList(response.data);
            setPostsByTitle(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: (darkMode) ? "#242121" : "#F5F5F5"}}>
            <HeaderScreen name={route.name} navigation={navigation} profile={false} drawer={true}/>
            <View style={{height: "90%"}}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    margin: "10%",
                    alignItems: "center"
                }}>
                    <TextInput
                        placeholder='Search a post by title'
                        placeholderTextColor={(darkMode) ? "white" : "black"}
                        style={{
                            borderWidth: 2,
                            borderColor: "#ca2613",
                            borderRadius: 20,
                            paddingHorizontal: "5%",
                            width: "80%",
                            fontSize: getFontSize(15),
                            color: (darkMode) ? "white" : "black"
                        }}
                        onChangeText={(text) => {
                            if (text === "")
                                setPostsByTitle(postsList);
                            else
                                setPostsByTitle(postsList.filter((post) => post.title.toLowerCase().includes(text)))
                        }}
                    ></TextInput>
                    <FontAwesome5Icon
                        name="search"
                        size={getIconSize(80)}
                        color={(darkMode) ? "white" : "black"}
                    />
                </View>
                <FlatList
                    data={postsByTitle}
                    renderItem={(post) => {
                        return (
                            <TouchableOpacity
                                style={Styles.touchable}
                                onPress={() => navigation.navigate("Post", {post: post.item})}
                            >
                                <View>
                                    <View style={{}}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginHorizontal: "5%"
                                        }}>
                                            <TouchableOpacity
                                                style={{alignItems: "center", flexDirection: "row"}}
                                                onPress={() => Alert.alert("Iria al perfil de la otra persona")}>
                                                <Image
                                                    source={{
                                                        uri: "data:image/jpeg;base64," + post.item.user?.picture
                                                    }}
                                                    style={{
                                                        ...Styles.imageStyle,
                                                        borderColor: (darkMode) ? "white" : "black",
                                                        borderWidth: 1,
                                                        width: getIconSize(110),
                                                        height: getIconSize(110)
                                                    }}
                                                />
                                                <Text style={{
                                                    fontSize: getFontSize(15),
                                                    color: (darkMode) ? "white" : "black",
                                                    marginHorizontal: "10%"
                                                }}>{post.item.user?.nick}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{justifyContent: "center"}}
                                                              onPress={() => Alert.alert("Daria o quitaria like")}>
                                                <FontAwesome
                                                    name={(post.item.liked) ? 'thumbs-o-up' : "thumbs-up"}
                                                    size={getIconSize(80)}
                                                    color={(darkMode) ? "white" : "black"}></FontAwesome>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{margin: "5%"}}>
                                            <Text style={{
                                                fontSize: getFontSize(20),
                                                color: (darkMode) ? "white" : "black",
                                                marginBottom: "5%"
                                            }}>{post.item.title}</Text>
                                            <Text style={{
                                                fontSize: getFontSize(15),
                                                color: (darkMode) ? "white" : "black"
                                            }}>Price: {post.item.priceRange}</Text>
                                        </View>

                                    </View>
                                    <View style={{alignItems: "center"}}>
                                        <Image
                                            source={{
                                                uri: post.item.image
                                            }}
                                            style={{
                                                width: getIconSize(900),
                                                height: getIconSize(900),
                                                borderRadius: 20
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(post, index) => index + ""}
                />
            </View>
        </View>
    )
}

export default Social