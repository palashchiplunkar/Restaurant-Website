import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class Dishdetail extends Component {
  constructor(props) {
    super(props);
  }
  renderComments(comments) {
    const eachcomment = comments.map((comment) => {
      return (
        <ul className='list-unstyled'>
          <li>{comment.comment}</li>
          <li>
            --{comment.author} , {comment.date}
          </li>
        </ul>
      );
    });
    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          {eachcomment}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
          <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    return (
      // <div>{console.log(this.props.dish.image)}</div>
      <div className='row'>
        <div className='col-12 col-md-5 mt-5 m-1'>
          {this.renderDish(this.props.dish)}
        </div>
        <div className='col-12 col-md-5 mt-5 m-1'>
          {this.props.dish && this.renderComments(this.props.dish.comments)}
        </div>
      </div>
    );
  }
}

export default Dishdetail;
