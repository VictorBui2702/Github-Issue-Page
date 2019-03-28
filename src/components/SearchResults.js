import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import Profile from './user/Profile'
import Labels from './Labels'
import IssueOverview from './IssueOverview'

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: this.props.issues
        }
    }

    render() {
        return (
            <Container>
                {this.state.issues.map((issue, index) =>
                    <Row key={index} >
                        <Col sm={8}>
                            <IssueOverview issue={issue} />
                        </Col>
                        <Col sm={4} className="issues-page">
                            <Profile profile={issue.user} />
                            <Labels labels={issue.labels} />
                        </Col>
                    </Row>
                )}
            </Container>
        )
    }
}
