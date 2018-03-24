// @flow

import React from "react"
import { View } from "react-native"


type Props = {
    color: string,
}

const Component = (props: Props) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: props.color,
        }} />
    )
}

export default Component

