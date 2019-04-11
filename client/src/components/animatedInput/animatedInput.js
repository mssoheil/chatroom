import React, { Component } from "react";

import { Wrapper, Input, Label, Bar } from "./animatedInput-styled";

/** animated input
 * @param {string} type - type of input
 * @param {string} color - color of input
 * @param {string} id - id of input
 * @param {string} label - the label
 * @param {string} barColor - color of animated bar
 * @param {string} barColor - color of animated bar success state
 * @param {string} barColor - color of animated bar error state
 * @param {string} barActiveColor - color of active animated bar
 * @param {string} barActiveColor - color of active animated bar success state
 * @param {string} barActiveColor - color of active animated bar error state
 * @param {string} labelColor - color of label
 * @param {string} labelColor - color of label success state
 * @param {string} labelColor - color of label erro state
 * @param {string} labelActiveColor - color of active label
 * @param {string} labelActiveColor - color of active label success state
 * @param {string} labelActiveColor - color of active label error state
 * @param {string} speed - speed of animation
 */
class AnimatedInput extends Component {
	constructor(props) {
		super(props);
		this.changeInput = this.changeInput.bind(this);
		this.state = {
			fieldValue: ""
		};
	}

	changeInput(e) {
		this.setState({
			fieldValue: e.currentTarget.value
		});
		this.props.changeVal(e.currentTarget.value);
	}
	render() {
		const {
			type,
			color,
			label,
			barColor,
			// barColorSuccess,
			// barColorError,
			barActiveColor,
			// barActiveColorSuccess,
			// barActiveColorError,
			labelColor,
			// labelColorSuccess,
			// labelColorError,
			labelActiveColor,
			// labelActiveColorSuccess,
			// labelActiveColorError,
			speed,
			inputHeight,
			inputWidth,
			id
		} = this.props;

		return (
			<Wrapper>
				<Input
					className={this.props.val !== "" ? "activeInput" : null}
					id={id}
					type={type}
					color={color}
					speed={speed}
					onChange={this.changeInput}
					value={this.props.val}
					changeVal={val => {
						this.props.changeVal(val);
					}}
				/>
				<Label
					htmlFor={id}
					inputHeight={inputHeight}
					inputWidth={inputWidth}
					speed={speed}
					labelColor={labelColor}
					labelActiveColor={labelActiveColor}
				>
					{label}
				</Label>
				<Bar
					barColor={barColor}
					barActiveColor={barActiveColor}
					speed={speed}
				/>
			</Wrapper>
		);
	}
}

export default AnimatedInput;
