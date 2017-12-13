import React, {Component} from React;
import MiniCard from '../../MiniCard/MiniCard.jsx';

var config = require('../../config');

class PendingOffers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offer_cards: this.props.offers,
			selected_offer: {},
			selectedindex: 0
		}
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
                            />
                        </div>
                        )
                });
        return (
        <div className="ProfileCardList">
            <div className= "flexcontainer">
                {showAll && slides}
                {!showAll && 
                    <div className="selectedCard">
                    <MiniCard key={this.state.selectedindex + "MiniCard"}
                            title={selected.title}
                            description={selected.description}
                            img={selected.image}
                            id={selected._id}
                            />
                    <div className="cancel" onClick={(event) => {
                        event.stopPropagation();
                        this.setState({selected_offer: {}, showAll: true, selectedindex: 0});
                    }}>Select Another Card</div>
                    </div>
                }
            </div>
        </div>
        );
    }
}

export default PendingOffers;