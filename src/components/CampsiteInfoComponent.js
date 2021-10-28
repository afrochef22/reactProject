import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Modal,
	Row,
	Label,
	Button,
	Col,
	ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderComments({ comments, postComment, campsiteId }) {
	if (comments) {
		return (
			<div className="col-md-5 m-1">
				<h4>Comments</h4>
				<Stagger in>
					{comments.map((comment) => (
						<Fade in key={comment.id}>
							<p>
								{comment.text}
								<br />
								<strong>
									-- {comment.author},{" "}
									{new Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "short",
										day: "2-digit",
									}).format(new Date(Date.parse(comment.date)))}
								</strong>
								<br />
							</p>
						</Fade>
					))}
				</Stagger>
				<CommentForm campsiteId={campsiteId} postComment={postComment} />
			</div>
		);
	}
}

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
			raitng: "",
			author: "",
			text: "",
			touched: {
				raiting: false,
				author: false,
				text: false,
			},
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		this.toggleModal();
		console.log(values);
		this.props.postComment(
			this.props.campsiteId,
			values.rating,
			values.author,
			values.text
		);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}>
					<i className="fa fa-pencil fa-lg"> Submit Comment</i>
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<div col-md-12 className="p-3">
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<div className="form-group">
								<Label htmlFor="raiting">Rating</Label>
								<Control.select
									model=".rating"
									id="rating"
									name="rating"
									className="form-control"
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</Control.select>
							</div>
							<div className="form-group">
								<Control.text
									model=".author"
									id="author"
									name="author"
									placeholder="Your Name"
									className="form-control"
									validators={{
										required,
										minLength: minLength(2),
										maxLength: maxLength(15),
									}}
								></Control.text>
								<Errors
									className="text-danger"
									model=".author"
									show="touched"
									component="div"
									messages={{
										required: "Required",
										minLength: "Must be at least 2 characters.",
										maxLength: "Must be 15 characters or less",
									}}
								/>
							</div>
							<div classNam="form-group">
								<Control.textarea
									model=".text"
									id="text"
									name="text"
									rows="6"
									className="form-control"
								></Control.textarea>
							</div>
							<div className="pt-2">
								<Button type="submit" color="primary">
									Submit
								</Button>
							</div>
						</LocalForm>
					</div>
				</Modal>
			</div>
		);
	}
}

function RenderCampsite({ campsite }) {
	return (
		<div className="col-md-5 m1">
			<FadeTransform
				in
				transformProps={{
					exitTrandform: "scale(0.5) translateY(-50%)",
				}}
			>
				<Card>
					<CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
					<CardBody>
						<CardText>{campsite.description}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>
		</div>
	);
}

function CampsiteInfo(props) {
	if (props.isLoading) {
		return (
			<div className="constainer">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<h4>{props.errMess}</h4>
					</div>
				</div>
			</div>
		);
	}

	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/directory">Directory</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
						</Breadcrumb>
						<h2>{props.campsite.name}</h2>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderCampsite campsite={props.campsite} />
					<RenderComments
						comments={props.comments}
						postComment={props.postComment}
						campsiteId={props.campsite.id}
					/>
				</div>
			</div>
		);
	}
	return <div></div>;
}

export default CampsiteInfo;
