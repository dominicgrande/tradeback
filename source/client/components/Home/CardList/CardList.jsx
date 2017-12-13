//Import components
import React, {Component} from 'react'
import MiniCard from '../../MiniCard/MiniCard.jsx'

//Styling
import './CardList.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;

const CardListType = {
    OFFERS: 0,
    REQUESTS: 1
}

//Configuration file
var config = require('../../../config');

class CardList extends Component {
    constructor(props) {
        super(props);
        console.log(props.type);
        this.state = {
            card_list: [],
            filtered_list: [],
            type: props.type
        };

        this.updateCards = this.updateCards.bind(this);
        this.search = this.search.bind(this);
    }

    updateCards(){
        let end_point = config.api_endpoint;
        let _this = this;
        let offer_boolean = this.state.type === CardListType.OFFERS ? "true" : "false";

        axios.get(end_point + '/api/cards'+'?where={"offer": '+offer_boolean+'}').then(function(response) {
            console.log(response.data.data);
            _this.setState({card_list: response.data.data, filtered_list: response.data.data});
            document.getElementById('search').value = "";
        }).catch(function(error) {
            console.log(error);
        });
    }

    componentWillMount() {
        this.updateCards();
    }

    componentWillReceiveProps(newProps){
        this.setState({
            type: newProps.type
        }, this.updateCards);
    }

    search(e) {
        let input = e.target.value.toLowerCase();
        if (input.length === 0) {
            this.setState({filtered_list: this.state.card_list})
            return;
        }

        let result = this.state.card_list

        input = input.split(' ');

        //Filter the list
        input.forEach(str => {
            result = result.filter( element => {
                let searchTerm = element.title;
                element.tags.forEach( tag => {
                    searchTerm += " " + tag;
                })
                return searchTerm.toLowerCase().includes(str)
            })
        })

        // Sort the list to return the most relevant results
        input.reverse().forEach( str => {
            result = result.sort( (a, b) => {
                let s1 = a.title.toLowerCase()
                let s2 = b.title.toLowerCase()
                return s1.indexOf(str) - s2.indexOf(str)
            })
        })

        this.setState({filtered_list: result})
    }

    render() {
        return (<div className="OfferList">
            <form className="bar">
                <input id="search" type="text" name="search" placeholder="Search" onChange = {this.search}/>
            </form>
            <h4 className="trending">TRENDING</h4>
            <p className="tags">#tutoring</p>
            <p className="tags">#labor</p>
            <p className="tags">#art</p>
            <p className="tags">#textbooks</p>

            <div className="flexcontainer">
                {
                    this.state.filtered_list.map((element, index) => {
                        return (<MiniCard key={element._id + "MiniCard"}
                            title={element.title}
                            description={element.description}
                            img={element.image}
                            id={element._id}
                            tags={element.tags}
                            />)
                    })
                }
            </div>
        </div>)
    }
}

Object.defineProperty(CardList, 'TYPE', {
  value: CardListType,
  writable: false, // makes the property read-only
});

export default CardList
