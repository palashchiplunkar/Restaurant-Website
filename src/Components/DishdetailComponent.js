import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

const Dishdetail = (props) => {
  function renderComments(comments) {
    const eachcomment = comments.map((comment) => {
      return (
        <ul className='list-unstyled'>
          <li>{comment.comment}</li>
          <li>
            --{comment.author} ,{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
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
  function renderDish(dish) {
    if (dish != null) {
      return (
        <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        {renderDish(props.dish)}
        <div className='col-12 col-md-5 m-1'>
          {props.dish && renderComments(props.dish.comments)}
        </div>
      </div>
    </div>
  );
};

export default Dishdetail;
