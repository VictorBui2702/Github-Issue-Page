import React, { Component } from 'react'
const ReactMarkdown = require('react-markdown')

export default class IssueOverview extends Component {
    render() {
        return (
            <div>
                <h4>#{this.props.issue.number} {this.props.issue.title}</h4>
                <ReactMarkdown source={this.props.issue.body} />
            </div>
        )
    }
}
