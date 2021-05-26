import React from 'react';
import './Track.css'
export class Track extends React.Component{

    constructor(props){
        super(props);
        this.addTrack=this.addTrack.bind(this);
    }

    renderAction(){
        let isRemoval=this.props.isRevmoval;
        let action = isRemoval? '-' : '+';
        return (
            <button className="Track-action">{action}</button>
        );
    }
    addTrack(){
        // marries event handler and data both passed in via props!  
        this.props.onAdd(this.props.track); // tracks passed in as prop from TrackList! separation of data and representation. won't come together until made explicit.
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    </div>
                <button className="Track-action" onAdd={this.addTrack}>{this.renderAction}</button>
            </div>
        )
    }
}
