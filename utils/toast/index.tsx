import { Modal, View, Image, Text, ActivityIndicator } from "react-native"
import st from './styles'
import { useState } from "react";

const Toast = ({ time, description }: { time: number, description?: string }) => {
    const styles = st();
    const [isDisplay, setDisplay] = useState(true)
    setTimeout(() => {
        setDisplay(false)
    }, time * 1000)
    return (
        <Modal transparent visible={isDisplay} animationType="fade">
            <View style={styles.container}>
                <View style={styles.mainBlock}>
                    <Image source={require('../../assets/splash.png')} style={styles.img} />
                    <Text>{description}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default Toast;