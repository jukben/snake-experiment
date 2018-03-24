// @flow

import React from "react"
import { Text, TouchableWithoutFeedback, View } from "react-native"
import { View as AnimatableView } from "react-native-animatable"
import type { Snake } from "./reducer"
import SnakeComponent from "./SnakeComponent"
import { connect } from "react-redux"
import { clickRestart } from "./actions"
import Buttons from "./Buttons"


type Props = {
    snakes: Snake[],
    paused: boolean,
    world_size: Point,
    loser: ?Snake,
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

                <Buttons />

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
    clickRestart: clickRestart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

