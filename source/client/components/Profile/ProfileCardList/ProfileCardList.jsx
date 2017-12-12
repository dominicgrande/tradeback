//Import components
import React, {Component} from 'react'
import MiniCard from '../../MiniCard/MiniCard.jsx'

//Styling
import './ProfileCardList.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;

//Configuration file
var config = require('../../../config');

class ProfileCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card_list: props.cards
        };

        this.isSelected = this.isSelected.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({card_list: newProps.cards});
    }

    isSelected(event){
        console.log("In is selected");        
        this.props.receiveSelected("hi");
    }

    render() {
        return (<div className="ProfileCardList">
          <div className="flexcontainer">
            {
                this.state.card_list.map((element, index) => {
                    return (
                        <div onClick={(event) => {
                                console.log("???")
                                event.stopPropagation();
                                this.isSelected(event);
                            }}>
                            <MiniCard key={index + "MiniCard"}
                            title={element.title}
                            description={element.description}
                            img={element.image}
                            id={element._id}
                            />
                        </div>
                        )
                })
            }
          </div>
        </div>)
    }
}

export default ProfileCardList
