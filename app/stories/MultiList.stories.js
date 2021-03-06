import React, { Component } from 'react';
import { ReactiveBase, MultiList, AppbaseSensorHelper as helper } from '@appbaseio/reactivebase';
import { ReactiveMap } from '../app.js';

import { Img } from './Img.js';
const historyPin = require('./placeholder.svg');

export default class MultiListDefault extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row" style={{'margin': '0', 'maxWidth': '300px'}}>
			<span className="imgContainer col s2" style={{'padding': '0'}}>
				<Img src={marker._source.member.photo}  />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p style={{'margin': '5px 0', 'lineHeight': '18px'}}>is going to&nbsp;
						<a href={marker._source.event.event_url} target="_blank">
							{marker._source.event.event_name}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				app="meetup_demo"
				username="LPpISlEBe"
				password="2a8935f5-0f63-4084-bc3e-2b2b4d1a8e02"
				type="meetupdata1"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<MultiList
							componentId="CitySensor"
							appbaseField={this.props.mapping.city}
							title="MultiList"
							size={100}
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ReactiveMap
							appbaseField={this.props.mapping.location}
							historicalData={true}
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter={true}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Reactive Maps"
							showPopoverOn = "click"
							historicPin={historyPin}
							onPopoverTrigger = {this.onPopoverTrigger}
							defaultZoom = {13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							actuate={{
								CitySensor: {"operation": "must"},
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

MultiListDefault.defaultProps = {
	mapping: {
		city: 'group.group_city.raw',
		location: 'location'
	}
};
