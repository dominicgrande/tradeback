import React, {Component} from 'react';
import MiniCard from '../../MiniCard/MiniCard.jsx';
import axios from 'axios'
import {withRouter} from 'react-router'

import './PendingOffers.css';

var config = require('../../../config');

class PendingOffers extends Component {
	constructor(props) {
		super(props);
		this.state = {
            showAll: true,
			offer_cards: this.props.offers,
			selected: {},
			selectedindex: 0,
            sourceId: this.props.sourceId,
            username: this.props.username
		}

        this.updateTrades = this.updateTrades.bind(this);
    }
    
    componentWillReceiveProps(props){
        this.setState({
            offer_cards: this.props.offers,
            sourceId: this.props.sourceId,
            username: this.props.username
        });
    }

    updateTrades() {
        let endpoint = config.api_endpoint;
        let _this = this;
        
        axios.put(endpoint + '/api/trades/' + '?includeCard=' + this.state.selected._id, {
            params: {
                userOneSatisfied: true,
                userTwoSatisfied: true
            }
        }).then((response) => {
           console.log(response);
        });
        
        axios.put(endpoint + '/api/card/' + '?id=' + this.state.selected._id + '&status=1').then((response) => {
            console.log(response);
        });
        axios.put(endpoint + '/api/card/' + '?id=' + this.state.sourceId + '&status=1').then((response) => {
            console.log(response);
        }).then(() => {
            const { history: { push } } = _this.props;
            console.log(this.state.username)
            push('/profile/'+this.state.username);
        });
    }

	render() {
        const { showAll, selected } = this.state;
        const slides = this.state.offer_cards.map((element, index) => {
                    return (
                        <div onClick={(event) => {
                                event.stopPropagation();
                                this.setState({selected: element, showAll: false, selectedindex: index});   
                            }}>
                            <MiniCard key={index + "MiniCard"}
                            title={element.title}
                            description={element.description}
                            img={element.image}
                            id={element._id}
                            tags={element.tags}
                            />
                        </div>
                        )
                });
        return (
        <div className="PendingOfferList">

            <div className= "pendingflexcontainer">
                {showAll && slides}
                {!showAll && 
                    <div className="selectedCard">
                        <MiniCard key={this.state.selectedindex + "MiniCard"}
                                title={selected.title}
                                description={selected.description}
                                img={selected.image}
                                id={selected._id}
                                tags={selected.tags}
                                />
                        <div className="buttons">
                            <div className="cancel" onClick={(event) => {
                                event.stopPropagation();
                                this.setState({selected: {}, showAll: true, selectedindex: 0});
                            }}>Select Another Card
                            </div>
                            <div className="confirm" onClick={(event) => {
                                this.updateTrades();
                            }}>Confirm Trade
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        );
    }
}

export default withRouter(PendingOffers);