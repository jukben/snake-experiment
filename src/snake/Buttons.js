// @flow

import type { Snake } from "./reducer"
import { Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { FontAwesome } from "@expo/vector-icons"
import { pressDown, clickPause, clickRestart, pressUp, clickSettings } from "./actions"
import { connect } from "react-redux"
import type { StateObject } from "../createReduxState"


type Props = {
    snakes: Snake[],
    paused: boolean,
    pressDown: (id: string, direction: string) => void,
    pressUp: (id: string, direction: string) => void,
}

const Buttons = (props: Props) => {
    return (
        <View style={styles.buttons}>
            {props.snakes.map(snake => (
                <View
                    key={snake.id}
                    style={[
                        styles.buttons2,
                        {transform: [{'rotate': snake.pos === "top" ? '180deg' : '0deg'}]}
                    ]}>
                    <TouchableOpacity
                        style={[styles.circle, { backgroundColor: snake.color }]}
                        onPressIn={() => props.pressDown(snake.id, "l")}
                        onPressOut={() => props.pressUp(snake.id, "l")}>
                        <Text style={styles.circleText}>L</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.circleP} onPress={() => props.clickPause()} >
                        <FontAwesome style={{textAlign:"center"}} name={props.paused ? "play" : "pause"} size={26} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.circleP} onPress={() => props.clickSettings()} >
                        <FontAwesome style={{textAlign:"center"}} name="gear" size={26} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.circle, { backgroundColor: snake.color }]}
                        onPressIn={() => props.pressDown(snake.id, "r")}
                        onPressOut={() => props.pressUp(snake.id, "r")}>
                        <Text style={styles.circleText}>R</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

const styles = {
    buttons: {
        position: "absolute",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    buttons2: {
        flexDirection: "row",
        justifyContent: "center",
    },
    circle: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: "orange",
        justifyContent: "center",
        margin: 15
    },
    circleP: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: "silver",
        justifyContent: "center",
        margin: 15,
    },
    circleText: {
        fontSize: 26,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
}


const mapStateToProps = (state: StateObject) => ({
    snakes: state.snake.snakes,
    paused: state.snake.paused,
})

const mapDispatchToProps = {
    pressDown: pressDown,
    pressUp: pressUp,
    clickPause: clickPause,
    clickSettings: clickSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)


