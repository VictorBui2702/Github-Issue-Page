import React, { Component } from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

const ReactMarkdown = require('react-markdown')

export default class IssueOverview extends Component {
    render() {
        let issue = this.props.issue;
        return (
            <div>
                {/* <Link to={`issues/${issue.number}`}></Link> */}
                <h5>{issue.title}</h5>
                <p><small>#{issue.number} {issue.state}ed <Moment toNow>{issue.created_at}</Moment> by {issue.user.login} </small></p>
                {/* <ReactMarkdown source={issue.body} /> */}
            </div>
        )
    }
}

