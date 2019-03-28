import React, { Component } from 'react'

export default class Labels extends Component {
    render() {
        return (
            <div>
                {this.props.labels.map(label =>
                    <p className="label mb-1">
                        <span key={label.id} style={{ backgroundColor: '#' + label.color }}>{label.name}</span>
                    </p>
                )}
            </div>
        )
    }
}
