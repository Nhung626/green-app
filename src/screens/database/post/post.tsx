import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../utils/Dimension';
import { Button } from "@rneui/base";


const Post = () => {
    const styles = st();
    const theme = useTheme();

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.title}>Title</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>subtitle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>type</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 25, right: 10 }}>
                    <Icon color={theme.color_1} size={35} name="bookmark-o"></Icon>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.general}>
                        <Text style={[styles.textGeneral,{fontStyle: 'italic', fontSize: 10}]}>Ngày: 2024.04.04</Text>
                        <Text style={styles.textGeneral}>Tac gia</Text>
                        <Text style={styles.textGeneral}>Gioi thieu</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.titleContent}>Content</Text>
                        <Text style={styles.textContent}>
                            Lorem ipsum dolor,
                            sit amet consectetur adipisicing elit.
                            Est maxime neque maiores sunt vitae dolorem, rerum a sit tempora,
                            quae voluptates vero nulla, consectetur ullam praesentium
                            eligendi perferendis fuga nihil?
                        </Text>
                    </View>
                    <View style={styles.boxImage}>
                        <ScrollView horizontal pagingEnabled>
                            <Image
                                style={{
                                    height: 200,
                                    width: SCREEN_WIDTH - 50,
                                    resizeMode: 'cover',
                                    borderRadius: 20,
                                }}
                                source={require('../../../../assets/images/cover.png')}

                            // source={{ uri: `${getImgCustomerUrl}?imageId=${imageId}` }}
                            />

                        </ScrollView>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.titleContent}>Content</Text>
                        <Text style={styles.textContent}>
                            Lorem ipsum dolor,
                            sit amet consectetur adipisicing elit.
                            Est maxime neque maiores sunt vitae dolorem, rerum a sit tempora,
                            quae voluptates vero nulla, consectetur ullam praesentium
                            eligendi perferendis fuga nihil?
                        </Text>
                    </View>

                    <View style={styles.content}>
                        {/* <Text style={styles.titleContent}>Content</Text> */}
                        <Text style={styles.textContent}>
                            Lorem ipsum dolor,
                            sit amet consectetur adipisicing elit.
                            Est maxime neque maiores sunt vitae dolorem, rerum a sit tempora,
                            quae voluptates vero nulla, consectetur ullam praesentium
                            eligendi perferendis fuga nihil?
                        </Text>
                    </View>
                    <View style={styles.content}>
                        {/* <Text style={styles.titleContent}>Content</Text> */}
                        <Text style={styles.textContent}>
                            Lorem ipsum dolor,
                            sit amet consectetur adipisicing elit.
                            Est maxime neque maiores sunt vitae dolorem, rerum a sit tempora,
                            quae voluptates vero nulla, consectetur ullam praesentium
                            eligendi perferendis fuga nihil?
                        </Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.titleContent}>Content</Text>
                        <Text style={styles.textContent}>
                            Lorem ipsum dolor,
                            sit amet consectetur adipisicing elit.
                            Est maxime neque maiores sunt vitae dolorem, rerum a sit tempora,
                            quae voluptates vero nulla, consectetur ullam praesentium
                            eligendi perferendis fuga nihil?
                        </Text>
                    </View>



                    <View style={styles.content}>
                        {/* <Text style={styles.titleContent}>Content</Text> */}
                        <Text style={styles.textContent}>
                            Lorem ipsum dolor,
                            sit amet consectetur adipisicing elit.
                            Est maxime neque maiores sunt vitae dolorem, rerum a sit tempora,
                            quae voluptates vero nulla, consectetur ullam praesentium
                            eligendi perferendis fuga nihil?
                        </Text>
                    </View>
                    <Text style={{ textAlign: "right", marginRight: 10, fontStyle: 'italic' }}>Nguồn: green.com.vn</Text>
                    <View style={styles.boxRect}>
                        <TouchableOpacity style={{ marginVertical: 0 }}>
                            <Icon color={theme.color_1} size={30} name="heart-o"></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginVertical: 0 }}>
                            <Icon color={theme.color_1} size={30} name="comment-o"></Icon>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Post