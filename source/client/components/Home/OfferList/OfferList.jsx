//Import components
import React, {Component} from 'react'
import MiniCard from '../../MiniCard/MiniCard.jsx'

//Styling
import './OfferList.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;

//Configuration file
var config = require('../../../config');

class OfferList extends Component {
    constructor(props) {
        super(props);
        console.log(props.history)
        this.state = {
            card_list: []
        };
    }

    componentDidMount() {
        let end_point = config.api_endpoint;
        let _this = this;

        axios.get(end_point + '/api/cards').then(function(response) {
            console.log(response.data.data);
            _this.setState({card_list: response.data.data});
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (<div className="OfferList">
            <div className="flexcontainer">
                {
                    this.state.card_list.map((element, index) => {
                        return (<MiniCard key={element + "MiniCard"}
                            title={element.title}
                            description={element.description}
                            img={element.image}
                            id={element._id}
                            />)
                    })
                }
            </div>
        </div>)
    }
}

export default OfferList
