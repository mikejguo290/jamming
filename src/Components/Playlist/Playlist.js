import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './Playlist.css'

export class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleNameChange=this.handleNameChange.bind(this);
    }
    
    handleNameChange(e){
        // onChange in input element call this method, this method accepts an event and calls this.props.onNameChange with event value.
        let name=e.target.value;
        this.props.onNameChange(name);
    }

    render(){
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}