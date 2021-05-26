import React from 'react';
import './Track.css'
export class Track extends React.Component{

    constructor(props){
        super(props);
        this.addTrack=this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
    }

    renderAction(){
        /* rendering method which will be called in render() to create buttons based on isRemoval values. */
        // displays a button with - as its content if isRemoval is true and + if isRemoval is false
        let isRemoval=this.props.isRemoval;
        let action; // = isRemoval? '-' : '+';
        if (isRemoval===true){
            action ='-'
            return (<button className="Track-action" onClick={this.removeTrack}>{action}</button>) 
        }else if (isRemoval===false){
            // isRemoval was undefined and app rendered + buttons. which is undesirable.
            action ='+'
            return (<button className="Track-action" onClick={this.addTrack}>{action}</button>) 
        }
    }
    
    addTrack(){
        // adds track to playlist
        // marries event handler and data both passed in via props!  
        this.props.onAdd(this.props.track); // tracks passed in as prop from TrackList! separation of data and representation. won't come together until made explicit.
    }

    removeTrack(){
        // removes track from playlist
        this.props.onRemove(this.props.track); // calling callback removeTrack which expects a track object. 
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    </div>
                {this.renderAction()}
            </div>
        )
    }
}
