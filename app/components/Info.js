

import React, { Component } from 'react'

export default class Info extends Component {
    constructor() {
        super()
        this.state = {

        }

    }
    render() {
        // console.log('INFO COMPONENT PROPS', this.props)

        return (
            <div>
                <h3>Min Ask: {this.props.currMax && this.props.currMax[1]}</h3>
                <h3>Max Bid: {this.props.currMin && this.props.currMin[1]}</h3>
                <h2>
                </h2>
            </div>
        )
    }
}
