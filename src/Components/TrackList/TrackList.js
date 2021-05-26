import React from 'react';
import './TrackList.css'
import {Track} from '../Track/Track'

export class TrackList extends React.Component {

    render(){
        let tracks = this.props.tracks;
        tracks = tracks.map( track => <Track key={track.id} track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>)

        return (
            <div className="TrackList">
                {tracks}
            </div>
        )
    }
}