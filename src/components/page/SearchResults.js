import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Profile from "../profile/Profile";
import IssueOverview from "../issues/IssueOverview";

const ColorLine = ({ color }) => (
  <hr style={{ color: color, backgroundColor: color, height: 0.2 }} />
);

export default class SearchResults extends Component {
  render() {
    return (
      <Container>
        {this.props.issues.map((issue, index) => (
          <Row key={index} className="mt-4">
            <Col sm={8}>
              <IssueOverview
                issue={issue}
                owner={this.props.owner}
                repo={this.props.repo}
              />
            </Col>
            <Col sm={4} className="issues-page">
              <Profile profile={issue.user} />
            </Col>
            <Col>
              <ColorLine color="lightpink" />
            </Col>
          </Row>
        ))}
      </Container>
    );
  }
}
