import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const apiURL = `https://api.github.com`;

export default class AddNewIssues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            issues: {
                "title": "",
                "body": "",
            }
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    onChangeValue = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            issues: { ...this.state.issues, [name]: value }
        }, () => console.log(this.state.issues))
    }

    handleSubmitNewIssues = async () => {
        let { token, owner, repo } = this.props
        let data = this.state.issues;
        const url = `${apiURL}/repos/${owner}/${repo}/issues?access_token=${token}`;
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(data),
            }
        );
        if (response.status === 201){
            this.props.refresh();
            this.toggle();
        }
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Add Issues</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <div>
                            Title:
                        <input type="text" name="title" onChange={this.onChangeValue} />
                        </div>
                        <div>
                            Description:
                        <textarea name="body" onChange={this.onChangeValue} ></textarea>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmitNewIssues}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
