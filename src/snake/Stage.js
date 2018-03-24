// @flow

import React from "react"
import { Button, View } from "react-native"
import type { Snake } from "./reducer"
import SnakeComponent from "./SnakeComponent"
import { connect } from "react-redux"
import { actionTick, clickLeft, clickRight } from "./actions"


type Props = {
    snakes: Snake[],
    clickLeft: () => void,
    clickRight: () => void,
}

class Stage extends React.Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.stage}>
                    {this.props.snakes.map(snake => (
                        <SnakeComponent key={snake.id} snake={snake} />
                    ))}
                </View>

                <View style={styles.buttons}>
                    <View>
                        <Button onPress={() => this.props.clickLeft("snake-1")} title="LEFT" />
                        <Button onPress={() => this.props.clickRight("snake-1")} title="RIGHT" />
                    </View>
                    <View>
                        <Button onPress={() => this.props.clickLeft("snake-2")} title="LEFT" />
                        <Button onPress={() => this.props.clickRight("snake-2")} title="RIGHT" />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
    },
    stage: {
        position: "absolute",
        bottom: 100,
        top: 100,
        left: 20,
        right: 20,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "lightgrey",
    },
    buttons: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
}

const mapStateToProps = (state: StateObject) => ({
    snakes: state.snake.snakes,
})

const mapDispatchToProps = {
    clickLeft: clickLeft,
    clickRight: clickRight,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

