import React, { useEffect, useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { fetchUserChatEngine, fetchDataUser } from "../../Stores/action";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@chakra-ui/react"


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
		return (
			<div>
				<Input type="text" list="data" placeholder="New Chat" w="100" name="list"
					onChange={(e) => setUsername(e.target.value)} />

				<datalist id="data">

					{listUser.map((item, key) =>
						<option key={key} value={item} />
					)}

				</datalist>

				<button onClick={() => createDirectChat(creds)}>
					Chat
				</button>
			</div>
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
