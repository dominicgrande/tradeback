//Import components
import React, {Component} from 'react'
import Trade from '../../Trade/Trade.jsx'

//Styling
import './ProfileTradeList.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;

//Configuration file
var config = require('../../../config');

class ProfileTradeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trade_list: props.trades
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({trade_list: newProps.trades})
    }

    render() {
        return (<div className="ProfileTradeList">
          <div className="flexcontainer">
            {
                this.state.trade_list.map((element, index) => {
                    return (<Trade key={element + "Trade"} trade={element}/>)
                })
            }
          </div>
        </div>)
    }
}

export default ProfileTradeList
