import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <img src={this.props.profile.avatar_url} />
                <p>@{this.props.profile.login}</p>
            </div>
        )
    }
}
