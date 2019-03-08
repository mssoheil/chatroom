import React from "react";

const MailIcon = props => {
	return (
		<svg id={props.id} viewBox={props.viewBox} fill={props.fill}>
			<g>
				<path d="M43,6H1C0.447,6,0,6.447,0,7v30c0,0.553,0.447,1,1,1h42c0.552,0,1-0.447,1-1V7C44,6.447,43.552,6,43,6z M42,33.581     L29.612,21.194l-1.414,1.414L41.59,36H2.41l13.392-13.392l-1.414-1.414L2,33.581V8h40V33.581z" />

				<path d="M39.979,8L22,25.979L4.021,8H2v0.807L21.293,28.1c0.391,0.391,1.023,0.391,1.414,0L42,8.807V8H39.979z" />
			</g>
		</svg>
	);
};

export default MailIcon;
