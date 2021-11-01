import React from "react";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade } from "react-animation-components";

function RenderDirectoryItem({ campsite }) {
	return (
		<Card>
			<Link to={`/directory/${campsite.id}`}>
				<CardImg
					width="100%"
					src={baseUrl + campsite.image}
					alt={campsite.name}
				/>
				<CardImgOverlay>
					<CardTitle>{campsite.name}</CardTitle>
				</CardImgOverlay>
			</Link>
		</Card>
	);
}

function Directory(props) {
	const directory = props.campsites.campsites.map((campsite) => {
		return (
			<div className="col-md-5 m-1">
				<Fade in>
				    <RenderDirectoryItem campsite={campsite} />
				</Fade>
			</div>
		);
	});

	if (props.campsites.isLoading) {
		return (
			<div className="constainer">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	if (props.campsites.errMess) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<h4>{props.campsites.errMess}</h4>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<FadeTransform
						in
						transformProps={{
							exitTransform: "scale(0.5) translateY(-50%)",
						}}
					>
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/home">Home</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>Directory</BreadcrumbItem>
						</Breadcrumb>
					</FadeTransform>
					<h2>Directory</h2>
					<hr />
				</div>
			</div>
			<div className="row">{directory}</div>
		</div>
	);
}

export default Directory;
