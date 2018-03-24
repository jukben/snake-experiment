// @flow

import React from "react"
import { Button, Text, TouchableOpacity, View } from "react-native"
import type { Snake } from "./reducer"
import SnakeComponent from "./SnakeComponent"
import { connect } from "react-redux"
import { actionTick, clickLeft, clickRight } from "./actions"


type Props = {
    snakes: Snake[],
    world_size: Point,
    clickLeft: () => void,
    clickRight: () => void,
}

class Stage extends React.Component<Props> {

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
                    <View style={[styles.buttons2, {transform: [{'rotate': '180deg'}]}]}>
                        <TouchableOpacity style={styles.circle} onPress={() => this.props.clickLeft("snake-1")} >
                            <Text style={styles.circleText}>L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.circle} onPress={() => this.props.clickRight("snake-1")} >
                            <Text  style={styles.circleText}>R</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttons2}>
                        <TouchableOpacity  style={styles.circle} onPress={() => this.props.clickLeft("snake-2")} >
                            <Text style={styles.circleText}>L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.circle} onPress={() => this.props.clickRight("snake-2")} >
                            <Text style={styles.circleText}>R</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    circleText: {
        fontSize: 26,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
}

const mapStateToProps = (state: StateObject) => ({
    snakes: state.snake.snakes,
    world_size: state.snake.world_size,
})

const mapDispatchToProps = {
    clickLeft: clickLeft,
    clickRight: clickRight,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

