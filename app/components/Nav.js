import React, { Component } from 'react'
import { connect } from "react-redux";
import { getMarqueeThunk } from "../reducers"
import axios from 'axios'


export class Nav extends Component {
    constructor() {
        super()
        this.state = {
            crypto: []
        }
    }
    async componentDidMount() {
        this.props.getMarquee()
    }
    render() {
        console.log(this.state, 'STATE NAV')
        console.log(this.props, 'PROPS NAV')
        let marquee = this.props.marquee.data

        return (
            <div>
                <nav>
                    <div className="marquee-child">

                        {marquee && marquee.map(el => {
                            return (
                                <div className="innerMarquee">
                                    <div>{el.name}</div>
                                    <div id="blue">${Number(el.price_usd).toFixed(2)}</div>
                                    <div className={Number(el.percent_change_24h) > 0 ? 'green' : 'red'}>{Number(el.percent_change_24h).toFixed(2)}%</div>
                                </div>
                            )
                        })}
                    </div>
                </nav>
            </div>
        )
    }
}


const mapState = state => {
    return {
        marquee: state.marquee
    };
};

const mapDispatch = dispatch => {
    return {
        getMarquee: () => dispatch(getMarqueeThunk())
    };
};

export default connect(
    mapState,
    mapDispatch
)(Nav);