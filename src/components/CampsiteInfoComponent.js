import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';



 function RenderCampsite({campsite}){
    return (
        <div className="col-md-5 m1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
    if (comments) {
        return (
            <div  className="col-md-5 m-1">
                <h4>Comments</h4>
                <div>
                    {comments.map(
                        comment => 
                        <p key={comment.id}>
                            {comment.text}<br />
                            <strong>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</strong><br />

                        </p>)}
                </div>


            </div>
        )
    }
}

function CampsiteInfo(props) {
    if(props.campsite){
        return (
            <div className="container">
                <div className="row">
                    <RenderCampsite campsite= {props.campsite} />
                    <RenderComments comments={props.campsite.comments} />
                </div>
            </div>
        );
    }
    return(
        <div></div>
    )  
}


export default CampsiteInfo