import React from 'react';
import './Track.css'
export class Track extends React.Component{
    renderAction(){
        let action = isRemoval? '-' : '+';
        return (
            <button className="Track-action">{action}</button>
        );
    }
    render(){
        return (
            <div class="Track">
                <div class="Track-information">
                    <h3><!-- track name will go here --></h3>
                    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
                    </div>
                <button class="Track-action">{this.renderAction}</button>
            </div>
        )
    }
}
