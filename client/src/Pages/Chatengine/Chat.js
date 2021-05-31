import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';

function Chat() {
	const [username, setUsername] = useState('')
	const [list] = useState(['Adams', 'Smith', 'bob_baker', 'John'])
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
				<input type="text" list="data" placeholder="New Chat" name="list"
				onChange={(e) => setUsername(e.target.value)} />

				<datalist id="data">

					{list.map((item, key) =>
						<option key={key} value={item} />
					)}
                    
				</datalist>
	
    			<button onClick={() => createDirectChat(creds)}>
					Chat
				</button>
			</div>
		)
	}


	return (
			<ChatEngine
				projectID='dc80bf30-2bdc-4a05-99e9-c1e71719f33b'
				userName='Adams' // diisi dengan orang yang sedang login
				userSecret='test1234' // ambil passwordnya
				height='93vh'
				renderNewChatForm={(creds) => renderChatForm(creds)}
			/>
	);
}

export default Chat;
