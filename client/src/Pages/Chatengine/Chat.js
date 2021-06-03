import React, { useEffect, useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { fetchUserChatEngine, fetchDataUser } from "../../Stores/action";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Box } from "@chakra-ui/react"


function Chat() {
	const [username, setUsername] = useState('')
	const listUser = useSelector(state => state.listUserChatEngine)
	const loading = useSelector(state => state.loading)
	const dataUser = useSelector(state => state.dataUser)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserChatEngine());
		dispatch(fetchDataUser());
	}, []);

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		console.log(listUser)
		return (
			<Box my="4" ml="4">
				<Input type="text" list="data" placeholder="New Chat" name="list" w="60%"
					onChange={(e) => setUsername(e.target.value)} />
				<datalist id="data">

					{listUser.map((item, key) =>
						<option key={key} value={item} />
					)}

				</datalist>

				<Button ml="4" bg="blue.100" color="blue.500" onClick={() => createDirectChat(creds)}>
					Chat
				</Button>
			</Box>
		)
	}

	if (loading || !dataUser.username || !dataUser.password) {
		return <div>Loading</div>
	} else {
		const pas = dataUser.password
		const secret = pas.substring(0, 5)
		return (
			<ChatEngine
				userName={dataUser.username}
				userSecret={secret}
				height='93vh'
				projectID='a698d02f-96a3-4a7d-a444-69b215a8c666'
				renderNewChatForm={(creds) => renderChatForm(creds)}
			/>
		);
	}
}

export default Chat;
