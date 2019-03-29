import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import Profile from '../profile/Profile'
import Labels from '../issues/Labels'
import IssueOverview from '../issues/IssueOverview'

const ColorLine = ({ color }) => (
    <hr style={{color: color, backgroundColor: color,height: 3}}/>
);

export default class SearchResults extends Component {

    render() {
        return (
            <Container>
                {this.props.issues.map((issue, index) =>
                    <Row key={index} >
                        <Col sm={8}>
                            <IssueOverview issue={issue} />
                        </Col>
                        <Col sm={4} className="issues-page">
                            <Profile profile={issue.user} />
                            <Labels labels={issue.labels} />
                        </Col>
                        <Col ><ColorLine color="lightpink"/></Col>
                    </Row>
                )}
            </Container>
            
        )
    }
}
