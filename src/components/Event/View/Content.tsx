import React from "react";
import {Box, Card, CardMedia, Grid, Typography} from "@mui/material";
import {Event} from "../../../model/Events";
import EventTime from "../Card/EventTimeView";
import EventViewLocation from "./EventViewLocation";
import EventParticipation from "../Participation/EventParticipation";
import {User} from "../../../model/Users";
import EventAttendantsList from "../Attendants/EventAttendantsList";

export interface IContentProps {
	user: User,
	event: Event
}

export interface IContentState {
	event: Event
}

export default class Content extends React.Component<IContentProps, IContentState> {

	/**
	 * @param props
	 */
	constructor(props: IContentProps) {
		super(props);
		this.state = {
			event: props.event
		};
	}

	/**
	 * @param e
	 */
	updateState = (e: Event) => {
		this.setState({
			event: e
		});
	}

	render() {
		return (
			<React.Fragment>
				<Grid container direction={"column"} sx={{paddingX: "5%", paddingBottom: "120px"}}>
					<Grid item>
						<Card elevation={2}>
							<CardMedia
								component={'img'}
								alt={this.props.event.title}
								height="140"
								image={this.props.event.imgPath}
							/>
						</Card>
					</Grid>
					<Grid item pt={"1rem"}>
						<EventTime eventTime={this.props.event.eventTime} variant={"h6"}/>
					</Grid>
					<Grid item pt={"1rem"}>
						<EventViewLocation location={this.props.event.location}/>
					</Grid>
					<Grid item pt={"1rem"}>
						<Typography variant="body1" color="text.secondary">
							{this.props.event.description}
						</Typography>
					</Grid>
					<Grid item pt={"1rem"}>
						<EventAttendantsList attendants={this.state.event.attendants}/>
					</Grid>
				</Grid>
				<Box sx={{position: "fixed", bottom: 0, width: "100%", textAlign: "center", backgroundColor: "white", boxShadow: 3, paddingTop: "0.5rem"}}>
					<Grid container direction={"column"}>
						<Grid item>
							<Typography variant={"h6"} component={"h2"}>
								Má účast
							</Typography>
						</Grid>
						<Grid item>
							<EventParticipation
								user={this.props.user}
								event={this.props.event}
								updateParent={this.updateState}
							/>
						</Grid>
					</Grid>
				</Box>
			</React.Fragment>

		)
	}
}
