import React, { Component } from 'react'
import {Wrapper, HeaderTxt, RoomsContainer, NewRoomContainer} from './rooms-styled';

export class Rooms extends Component {
  render() {
    return (
        <Wrapper>
            <HeaderTxt>Rooms</HeaderTxt>
            <RoomsContainer>
                
            </RoomsContainer>

            <NewRoomContainer>

            </NewRoomContainer>
        </Wrapper>
    )
  }
}

export default Rooms
