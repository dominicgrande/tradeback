import React, {Component} from 'react'

import './MiniCard.scss'
import {withRouter} from 'react-router'

class MiniCard extends Component {
    // static propTypes = {
    //     history: PropTypes.object.isRequired
    // }
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            img: props.img,
            tags: props.tags
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({title: newProps.title, description: newProps.description, img: newProps.img, id: newProps.id, tags: newProps.tags});
    }

    switch_to_detailed() {
				const { history: { push } } = this.props;
				push('/detail?id=' + this.state.id);
    }

    render() {

        return (<div className="MiniCard">
            <div className="mini-card" onClick={this.switch_to_detailed.bind(this)}>
                <img src={this.state.img}/>
                <div className="desc">
                    <p>{this.state.description}
                    {this.state.tags.map((element, index) => {
                      return (<p>#{element}</p>);
                    })}
                    </p>
                </div>
                <div className="title">
                    <h4>
                        {this.state.title}
                    </h4>
                </div>
            </div>
        </div>)
    }
}
// const MiniCard = withRouter(MiniCard)


export default withRouter(MiniCard)
