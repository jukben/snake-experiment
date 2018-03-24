// @flow

import React from "react"
import { Button, Text, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native"
import { View as AnimatableView } from "react-native-animatable"
import type { Snake } from "./reducer"
import SnakeComponent from "./SnakeComponent"
import { connect } from "react-redux"
import { actionTick, clickLeft, clickPause, clickRestart, clickRight, clickSettings } from "./actions"
import { FontAwesome } from "@expo/vector-icons"


type Props = {
    snakes: Snake[],
    paused: boolean,
    world_size: Point,
    loser: ?Snake,
    clickLeft: () => void,
    clickRight: () => void,
    clickPause: () => void,
    clickSettings: () => void,
    clickRestart: () => void,
}

class Stage extends React.Component<Props> {

    renderLoser = () => {
        if (!this.props.loser) {
            return null
        }

        return (
            <TouchableWithoutFeedback onPress={this.props.clickRestart}>
                <AnimatableView animation="zoomIn" style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center"
                }}>
                    <View style={styles.gameOverModal}>
                        <Text style={[styles.gameOverModalText, { color: this.props.loser.color }]}>
                            Game Over: {this.props.loser.color} is loser
                        </Text>
                    </View>
                </AnimatableView>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.stage, {
                        width: this.props.world_size.x,
                        height: this.props.world_size.y}]}>
                    {this.props.snakes.map(snake => (
                        <SnakeComponent key={snake.id} snake={snake} />
                    ))}
                </View>

                <View style={styles.buttons}>
                    {this.props.snakes.map(snake => (
                        <View
                            key={snake.id}
                            style={[
                                styles.buttons2,
                                {transform: [{'rotate': snake.pos === "top" ? '180deg' : '0deg'}]}
                            ]}>
                            <TouchableOpacity style={[styles.circle, { backgroundColor: snake.color }]} onPress={() => this.props.clickLeft(snake.id)} >
                                <Text style={styles.circleText}>L</Text>
                            </TouchableOpacity>

                            <TouchableOpacity  style={styles.circleP} onPress={() => this.props.clickPause()} >
                                <FontAwesome style={{textAlign:"center"}} name={this.props.paused ? "play" : "pause"} size={26} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity  style={styles.circleP} onPress={() => this.props.clickSettings()} >
                                <FontAwesome style={{textAlign:"center"}} name="gear" size={26} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity  style={[styles.circle, { backgroundColor: snake.color }]} onPress={() => this.props.clickRight(snake.id)} >
                                <Text  style={styles.circleText}>R</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {this.renderLoser()}
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    stage: {
        alignSelf: "center",
    },
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
    gameOverModal: {
        backgroundColor: "#ffffffaa",
        padding: 15,
        paddingVertical: 40,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "silver",
        margin: 50,
    },
    gameOverModalText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    }
}

const mapStateToProps = (state: StateObject) => ({
    snakes: state.snake.snakes,
    world_size: state.snake.world_size,
    loser: state.snake.loser,
    paused: state.snake.paused,
})

const mapDispatchToProps = {
    clickLeft: clickLeft,
    clickRight: clickRight,
    clickPause: clickPause,
    clickSettings: clickSettings,
    clickRestart: clickRestart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

