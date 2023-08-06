import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: 'Arial', sans-serif;
    background: #F0F0F0;
  }
`;

export const ApplicationDescription = styled.div`
	text-align: center;
	color: #36454f;
`;

export const ApplicationTitle = styled.div`
	color: DarkSlateGray;
	font-family: 'Arial Black', sans-serif;
	text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
	font-weight: bold;
	text-align: center;
	font-size: 80px;
	padding-top: 5%;
`;

export const CategoryDropdown = styled.div`
	position: absolute;
	background-color: #564c4d;
	z-index: 1;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	padding: 4px;
	max-height: 150px;
	overflow-y: auto;
	overflow-x: hidden;
	width: 14.5%;
	margin-left: 2%;
	border-radius: 5px;
	font-size: small;

	div:not(:last-child) {
		margin-bottom: 4px;
		border-bottom: 1px solid #ccc;
		height: 20px;
		padding: 4px;
	}
	div:last-child {
		height: 20px;
		padding: 4px;
	}
	div:hover {
		background-color: #424242;
	}
`;

export const CategoryList = styled.div`
	background: #564c4d;
	border: 3px solid #41424c;
	border-radius: 10px;
	color: #c0c0c0;
	width: 90%;
	max-height: 50%;
	overflow: auto;
	display: grid;
	align-self: center;
	grid-template-columns: repeat(auto-fill, minmax(29%, 1fr));
	gap: 5px 50px;
	padding: 10px;
	margin-top: 30px;
	margin-left: auto;
	margin-right: auto;
`;

export const CategoryListItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-basis: calc(5%);
	margin-bottom: 1px;
`;

export const CategoryTasks = styled.div`
	border-radius: 10px;
	position: absolute;
	width: 70%;
	height: 70%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #36454f;
	border: 3px solid #41424c;
	color: #c0c0c0;
	z-index: 1;
	text-align: center;
`;

export const CloseMark = styled.div`
	position: absolute;
	right: 15px;
	top: 10px;
	cursor: pointer;
`;

export const FooterContainer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 50px;
	background-color: #36454f;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 12px;
	color: #c0c0c0;
`;

export const FooterButton = styled.div`
    padding: 8px;
    margin: 10px;
    background-color: #424242;
    color: #C0C0C0;
    border-radius: 10px;
    border 1px solid #564c4d;
    cursor: pointer;
    &:hover {
        background-color: darkgrey;
        color: #36454f;
    }
`;

export const InputContainer = styled.div`
	width: 100%;
	height: 50%;
	position: absolute;
	display: flex;
	bottom: 20%;
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

export const NavigationBar = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	height: 50px;
	background-color: #36454f;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const NavigationButton = styled.button`
	text-decoration: none;
	color: #c0c0c0;
	background: none;
	height: 20px;
	border: none;
	font-size: 15px;
	padding-left: 20px;
	padding-right: 20px;
	border-left: 1px solid #c0c0c0 !important;
	&:hover {
		color: white;
	}
	&:first-child {
		border-left: none !important;
	}
`;

export const NotesContainer = styled.div`
	width: 40%;
	color: #c0c0c0;
	background: #41424c;
	right: 0;
	margin-right: 5%;
	margin-left: 5%;
	text-align: center;
	display: block;
	border-radius: 15px;
`;

export const NoteList = styled.div`
	width: 90%;
	font-size: small;
	position: relative;
	max-height: 55%;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 5px;
	margin-top: 15px;
	margin-left: auto;
	margin-right: auto;
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

export const PageHeader = styled.div`
	color: DarkSlateGray;
	font-family: 'Arial Black', sans-serif;
	text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
	font-weight: bold;
	text-align: center;
	font-size: 30px;
	padding-top: 7%;
`;

export const SaveNoteButton = styled(LoginPageButton)`
	position: absolute;
	right: 35%;
	bottom: 10%;
`;

export const SaveTaskButton = styled(LoginPageButton)`
	position: absolute;
	left: 35%;
	bottom: 10%;
`;

export const DeleteTaskButton = styled(LoginPageButton)`
	position: absolute;
	right: 5%;
	bottom: 10%;
`;

export const TargetButton = styled(LoginPageButton)`
	&:disabled {
		background-color: #41424c;
	}
`;

export const TaskChart = styled.div`
	padding-top: 5px;
	display: flex;
	justify-content: center;
`;

export const TaskInput = styled.input`
	width: 80%;
	background: #41424c;
	border: 2px solid #564c4d;
	color: white;
	text-align: center;
	border-radius: 7px;
	heigth: 25px;
	padding: 5px;
`;

export const TargetInput = styled(TaskInput)`
	width: 75px;
	height: 25px;
`;

export const TargetContainer = styled.div`
	position: absolute;
	right: 15px;
	bottom: 15px;
`;

export const TaskInputContainer = styled.table`
	padding-left: 5%;
	padding-right: 5%;
	width: 50%;
	height: 100%;
	left: 0;
	color: #c0c0c0;
	tr {
		background: #564c4d;
	}
	td {
		height: 35px;
		width: 50%;
		border-radius: 10px;
		padding: 5px;
		text-align: center;
	}
	tr:nth-child(odd) {
		background-color: #424242;
	}
	tr:nth-child(even) {
		${TaskInput} {
			border-color: #424242 !important;
		}
	}
`;

export const TitleInput = styled.input`
	height: 25px;
	width: 275px;
	border 2px solid #564c4d;
	border-radius: 10px;
	position: absolute;
	left: 50%;
	right: 50%;
	bottom: 70%;
	transform: translate(-50%, -50%);
	fon-weight: bold;
	color: #c0c0c0;
	text-align: center;
	background: #41424C;
	&::placeholder {
		color: #c0c0c0;
	}
`;

export const TaskList = styled.table`
	width: 80%;
	margin: 20px auto;
	border-collapse: collapse;
	font-size: small;
	color: #c0c0c0;
	border: 2px solid ##564c4d;
	margin-bottom: 10%;

	th {
		padding: 10px;
		color: #787276;
		border: 2px solid #564c4d;
		background-color: #424242;
	}

	tr {
		border: 2px solid #564c4d;
		background-color: #564c4d;

		&:nth-child(even) {
			background-color: #424242;
		}

		&:hover {
			background-color: #787276;
		}
	}

	td {
		border: 2px solid #564c4d;
		padding: 10px;
		text-align: center;
	}
`;

export const StatisticsChart = styled.div`
	position: absolute;
	right: 0;
	width: 45%;
	margin-top: auto;
	margin-bottom: auto;
`;

export const StatisticsContainer = styled.div`
	position: absolute;
	left: 0;
	background-color: #36454f;
	font-size: 14px;
	margin-top: 165px;
	margin-left: 10%;
	padding: 20px;
	border-radius: 10px;
	border: 3px solid #564c4d;
`;

export const StatisticsText = styled.div`
	color: #c0c0c0;
	display: flex;
	align-items: center;
	p {
		padding: 10px;
		font-weight: bold;
		margin: 0;
	}
`;

export const NoteInput = styled(TaskInput)`
	width: 80%;
	height: 10%;
	margin: 10%;
	align-self: center;
	margin-top: 20px !important;
	margin: 0;
`;
