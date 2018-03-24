// @flow

import React from "react"
import { Button, Platform, StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import Component from "./Component"
import { actionButtonClick } from "./createReduxState"
import { getGreetings } from "./selectors"
import Stage from "./snake/Stage"


type Props = {
    message: string,
    onClick: () => void,
}

type State = {
    color1: string,
    color2: string,
}

class Root extends React.Component<Props, State> {
    state = {
        color1: "red",
        color2: "green",
    }

    handleClick = () => {
        this.props.onClick()
        // fetch("https://www.google.com")
        // .then(data => {
        //     this.setState({
        //         color1: this.state.color1 === "red" ? "gold" : "red",
        //     })
        // })
    }

    render() {
        return (
            <View style={styles.container}>
                <Stage />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "space-between",
    },
})

const mapStateToProps = (state: StateObject) => ({
    message: getGreetings(state),
})

const mapDispatchToProps = {
    onClick: actionButtonClick,
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
