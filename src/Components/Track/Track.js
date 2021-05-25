import React from 'react';
import './Track.css'
export class Track extends React.Component{
    render(){
        return (
            <div class="Track">
                <div class="trackInformation">
                    <h3><!-- track name will go here --></h3>
                    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
                    </div>
                <button class="trackAction"><!-- + or - will go here --></button>
            </div>
        )
    }
}
