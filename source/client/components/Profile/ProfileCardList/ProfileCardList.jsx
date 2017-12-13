//Import components
import React, {Component} from 'react'
import Slider from 'react-slick'

import MiniCard from '../../MiniCard/MiniCard.jsx'

//Styling
import './ProfileCardList.scss'
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import axios from 'axios'
axios.defaults.withCredentials = true;

//Configuration file
var config = require('../../../config');
//var Slider = require('react-slick');

const CardListType = {
    OFFERS: 0,
    REQUESTS: 1,
    BOTH: 2
}

class ProfileCardList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            card_list: props.cards,
            showAll: true,
            selected: {},
            selectedindex: 0
        };
        this.settings = {
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        this.isSelected = this.isSelected.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({card_list: newProps.cards});
    }

    isSelected(event, data){ 
        this.props.receiveId(data._id);
        this.props.receiveAuthor(data.author)
    }

    /*
    <div className="flexcontainer">
            {
                
            }
          </div>
    */

    render() {
        const { showAll, selected } = this.state;
        const slides = this.state.card_list.map((element, index) => {
                    return (
                        <div onClick={(event) => {
                                event.stopPropagation();
                                this.isSelected(event, element);
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
                        console.log('merp');
                        event.stopPropagation();
                        this.setState({selected: {}, showAll: true, selectedindex: 0});
                    }}>Select Another Card</div>
                    </div>
                }
            </div>
        </div>
        );
    }
}

export default ProfileCardList
