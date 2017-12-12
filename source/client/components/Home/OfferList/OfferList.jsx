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
            card_list: [],
            filtered_list: []
        };

        this.search = this.search.bind(this);
    }

    componentDidMount() {
        let end_point = config.api_endpoint;
        let _this = this;

        axios.get(end_point + '/api/cards').then(function(response) {
            console.log(response.data.data);
            _this.setState({card_list: response.data.data, filtered_list: response.data.data});
        }).catch(function(error) {
            console.log(error);
        });
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
                return element.title.toLowerCase().includes(str)
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
                <input className="search" type="text" name="search" placeholder="Search" onChange = {this.search}/>
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
                            />)
                    })
                }
            </div>
        </div>)
    }
}

export default OfferList