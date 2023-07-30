import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
	overflow-x: hidden;
  	overflow-y: auto;
    font-family: 'Verdana', sans-serif;
    background: #B2BEB5;
  }
`;

export const ApplicationDescription = styled.div`
	text-align: center;
	color: #36454f;
`;

export const ApplicationTitle = styled.div`
	color: DarkSlateGray;
	font-family: Forte;
	text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
	font-weight: bold;
	text-align: center;
	font-size: 80px;
	padding-top: 5%;
`;

export const FooterContainer = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 10%;
	background-color: DarkOliveGreen;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 12px;
	color: #36454f;
`;

export const FooterButton = styled.div`
    padding: 10px;
    margin: 10px;
    background-color: #36454f;
    color: #C0C0C0;
    border-radius: 10px;
    border 1px solid darkslategrey;
    cursor: pointer;
    &:hover {
        background-color: darkgrey;
        color: #36454f;
    }
`;

export const LoginPageContainer = styled.div`
	height: 90%;
	width: 100%;
	position: absolute;
`;

export const LoginPageButton = styled.button`
	background: DarkOliveGreen;
	color: white;
	font-size: 15px;
	padding: 12px;
	border: none;
	border-radius: 10px;
	margin: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: #36454f;
	}
	&:disabled {
		background-color: #c0c0c0;
	}
`;

export const LoginPageButtonContainer = styled.div`
	position: absolute;
	width: 100%;
	left: 50%;
	bottom: 0;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const LoginPageButtonRow = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LoginFooter = styled.div`
	height: 5%;
	width: 100%;
	position: fixed;
	bottom: 0;
	font-size: 10px;
	padding: 15px;
	background: #36454f;
	color: #c0c0c0;
	align-items: center;
`;

export const LoginPageInput = styled.input`
  height: 25px;
  width: 275px;
  color: DarkOliveGreen;
  border 1px solid DarkOliveGreen;
  border-radius: 10px;
  display: block;
  margin-bottom: 5px;
  text-align: center;
  &::placeholder {
  color: DarkOliveGreen;
  }
  &:active, &:focus {
    outline: none; 
  }
`;

export const LoginPageInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	bottom: 22%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const NotificationContainer = styled.div`
	border: 3px solid ${(props) => (props.alert ? '#B67F7F' : 'darkolivegreen')};
	color: #b2beb5;
	background: #36454f;
	border-radius: 10px;
	position: absolute;
	padding: 20px;
	z-index: 2;
	height: 5%;
	top: 20%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	text-align: center;
	align-items: center;
`;
