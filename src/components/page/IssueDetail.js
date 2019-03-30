import React, { Component } from "react";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./IssueDetail.css";
import ReactModal from "react-modal";

// import SearchBox from "./components/tool/SearchBox";
// import Pagination from "./components/pagination/Pagination";
// import SearchResults from "./components/page/SearchResults";
const ReactMarkdown = require("react-markdown");

const clientId = process.env.REACT_APP_CLIENT_ID;
const apiURL = `https://api.github.com`;

class IssueDetail extends Component {
  constructor(props) {
    super(props);
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      this.state = {
        token: accessToken,
        issues: [],
        owner: "",
        repo: "",
        search: "",
        page: ""
      };
    }

    if (existingToken) {
      this.state = {
        token: existingToken,
        issuesDetail: {},
        owner: "facebook",
        repo: "react",
        search: "",
        userDetail: [],
        pullRequest: {},
        commentDetail: []
      };
    }
  }

  githubAPI = async () => {
    console.log("aa", this.props);
    const { params } = await this.props.match;
    const number = params.number;
    let { owner, repo, token } = this.state;
    let response = await fetch(
      `${apiURL}/repos/${owner}/${repo}/issues/${number}?access_token=${token}`
    );
    let issues = await response.json();
    this.setState(
      {
        issuesDetail: issues,
        userDetail: issues.user,
        pullRequest: issues.pull_request
      },
      () => console.log("userdetail", this.state.userDetail)
    );
    console.log("detail", this.state.issuesDetail);
    console.log("request", this.state.pullRequest);
  };

  getCommentAPI = async () => {
    const { params } = await this.props.match;
    const number = params.number;
    let { owner, repo, token } = this.state;
    let response = await fetch(
      `${apiURL}/repos/${owner}/${repo}/issues/${number}/comments?access_token=${token}`
    );
    let issueComment = await response.json();
    this.setState({
      commentDetail: issueComment
    });
    console.log("cmt", this.state.commentDetail);
  };

  //https://api.github.com/repos/facebook/react/issues/15211/comments

  componentDidMount() {
    this.githubAPI();
    this.getCommentAPI();
  }

  render() {
    let commentArray = this.state.commentDetail.map(item => {
      return (
        <CommentDetail
          user={item.user}
          body={item.body}
          createdAt={item.created_at}
          id={item.id}
        />
      );
    });
    return (
      <div className="container">
        <h3>View Issues From #{this.state.issuesDetail.number}</h3>
        <div className="container d-flex ">
          <div className="col-3">
            <div className="ui card">
              <div className="image">
                <img src={this.state.userDetail.avatar_url} alt="logo" />
              </div>
              <div className="content">
                <p className="header greenHeader">
                  {this.state.userDetail.login}
                </p>
                <div className="meta">
                  <span className="text-white">
                    Id: {this.state.userDetail.id}
                  </span>
                </div>
                <div className="description text-white">
                  Site :{" "}
                  <a href={this.state.userDetail.html_url}>
                    {this.state.userDetail.html_url}
                  </a>
                </div>
              </div>
              <div className="extra content text-white">
                <p>Type: {this.state.userDetail.type}</p>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row mb-4">
              <div className="ui segment ">
                <h3 className="border-bottom greenHeader">
                  #{this.state.issuesDetail.number} -
                  {this.state.issuesDetail.title}
                </h3>
                <span className="time-text font-weight-bold">
                  {moment(this.state.issuesDetail.created_at).format(
                    " DD - MM - YY  hh:mm:ss A"
                  )}{" "}
                  (created
                  {moment(this.state.issuesDetail.created_at).fromNow()})
                </span>
                <div className="ui raised segment text-white mt-3">
                  <ReactMarkdown source={this.state.issuesDetail.body} />
                </div>
              </div>
            </div>
            <div classNameName="row">
              <div className="ui minimal comments">
                <h3 className="ui dividing header">Comments</h3>
                {commentArray}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CommentDetail extends React.Component {
  state = { showModal: false };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="comment ">
        <div className="row">
          <div className="col-1">
            <a className="avatar">
              <img src={this.props.user.avatar_url} />
            </a>
          </div>
          <div className="col-11">
            <div className="content">
              <h5 className="border-bottom greenHeader">
                {this.props.user.login}
              </h5>
              <div>
                {" "}
                <span className="date text-antiquewhite font-weight-bold">
                  {moment(this.props.createdAt).format(
                    " DD - MM - YY  hh:mm:ss A"
                  )}{" "}
                  (created
                  {moment(this.props.createdAt).fromNow()})
                </span>
              </div>
              <div className="text mt-3">
                <ReactMarkdown source={this.props.body} />
              </div>
            </div>
          </div>
        </div>

        <div className="text-right" onClick={() => this.handleOpenModal()}>
          <div className="ui blue labeled submit icon button ">
            <i className="icon edit" /> Reply
          </div>
        </div>
        <ReplyModal
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}

class ReplyModal extends React.Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.showModal}
        contentLabel="Inline Styles Modal Example"
        onRequestClose={this.props.handleCloseModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)"
          },
          content: {
            position: "absolute",
            top: "100px",
            left: "100px",
            right: "100px",
            bottom: "px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
            borderRadius: "3px",
            outline: "none",
            padding: "0",
            backgroundColor: "black"
          }
        }}
      />
    );
  }
}

export default IssueDetail;
