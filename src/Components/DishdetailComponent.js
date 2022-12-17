import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    // console.log(values.rating, values.name, values.comment);
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    return (
      <>
        <Button variant='outline-secondary' onClick={this.toggleModal}>
          <span className='fa fa-send'></span> Submit Comments
        </Button>
        <Modal show={this.state.isModalOpen} onHide={this.toggleModal}>
          <Modal.Header>
            <Modal.Title>Submit Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='container'>
              <LocalForm onSubmit={this.handleSubmit}>
                <Row className='form-group'>
                  <Label htmlFor='rating'>Rating</Label>
                  <Control.select
                    model='.rating'
                    className='form-control'
                    id='rating'
                    name='rating'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row className='form-group'>
                  <Label htmlFor='name'>Your Name</Label>
                  <Control.text
                    model='.name'
                    id='name'
                    name='name'
                    className='form-control'
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.name'
                    show='touched'
                    messages={{
                      minLength: "Must be greater than 3 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Row>
                <Row className='form-group'>
                  <Label check>Comment</Label>
                  <Control.textarea
                    model='.comment'
                    name='comment'
                    rows={6}
                    className='form-control'
                  />
                </Row>
                <Button type='submit' value='submit' variant='primary'>
                  Submit
                </Button>
              </LocalForm>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  const eachcomment = comments.map((comment) => {
    return (
      <ul className='list-unstyled'>
        <Fade in>
          <li>{comment.comment}</li>
          <li>
            --{comment.author} ,{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </li>
        </Fade>
      </ul>
    );
  });
  return (
    <div>
      <h4>Comments</h4>
      <Stagger in>{eachcomment}</Stagger>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
}

function RenderDish({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <FadeTransform
        in
        transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}>
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}
const Dishdetail = (props) => {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>

        <div className='row'>
          <RenderDish dish={props.dish} />
          <div className='col-12 col-md-5 m-1'>
            {/* {console.log("dish", props.addComment)} */}
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Dishdetail;
