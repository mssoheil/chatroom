import React from "react";

import {
	Wrapper,
	PrefixWrapper,
	InputWrapper,
	SuffixWrapper
} from "./inputsField-styled";

import AnimatedInput from "./../animatedInput/animatedInput";

/** animated input with prefix and suffix
 * @param {string} type - type of input
 * @param {string} color - color of input
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
 * @param {number} speed - speed of animation
 * @param {string} inputWidth - color of active label
 * @param {string} InputHeght - color of active label
 */
const InputField = props => {
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
		prefix,
		suffix,
		inputHeight,
		inputWidth,
		id
	} = props;
	return (
		<Wrapper inputWidth={inputWidth} inputHeight={inputHeight}>
			<PrefixWrapper>{prefix ? prefix : null}</PrefixWrapper>
			<InputWrapper>
				<AnimatedInput
					inputWidth={inputWidth}
					inputHeight={inputHeight}
					type={type}
					label={label}
					barColor={barColor}
					labelColor={labelColor}
					labelActiveColor={labelActiveColor}
					barActiveColor={barActiveColor}
					color={color}
					speed={speed}
					id={id}
					val={props.val}
					changeVal={val => {
						props.changeVal(val);
					}}
				/>
			</InputWrapper>
			<SuffixWrapper>{suffix ? suffix : null}</SuffixWrapper>
		</Wrapper>
	);
};

export default InputField;
