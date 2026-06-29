import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import type { StripEmptyObjects } from 'better-auth/react';
import { authClient } from './lib/auth-client';

function App() {
	const [greetMsg, setGreetMsg] = useState('');
	const [name, setName] = useState('');

	const [loginLoading, setLoginLoading] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);
	const [user, setUser] = useState<StripEmptyObjects<{
		id: string;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		emailVerified: boolean;
		name: string;
		image?: string | null | undefined;
	}> | null>(null);

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke('greet', { name }));
	}

	async function signInWithEmail() {
		setLoginLoading(true);
		const { data, error } = await authClient.signIn.email({
			email: 'john.doe@example.com',
			password: 'password1234',
		});
		console.log(data, error);
		setLoginLoading(false);

		if (error) {
			setLoginError(error.message ?? 'Erro desconhecido!');
		}

		setUser(data?.user ?? null);
	}

	return (
		<main className="container">
			<h1>Welcome to Tauri + React</h1>

			{!user && loginLoading ? (
				<p>Carregando...</p>
			) : (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'start',
					}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'start',
							gap: 2,
						}}>
						<img
							src={user?.image ?? ''}
							alt="Foto de perfil"
						/>
						<h2>{user?.name}</h2>
					</div>
					<p>{user?.email}</p>
				</div>
			)}

			<button
				type="button"
				onClick={signInWithEmail}>
				Login
			</button>

			<div className="row">
				<a
					href="https://vite.dev"
					target="_blank"
					rel="noopener">
					<img
						src="/vite.svg"
						className="logo vite"
						alt="Vite logo"
					/>
				</a>
				<a
					href="https://tauri.app"
					target="_blank"
					rel="noopener">
					<img
						src="/tauri.svg"
						className="logo tauri"
						alt="Tauri logo"
					/>
				</a>
				<a
					href="https://react.dev"
					target="_blank"
					rel="noopener">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={e => {
					e.preventDefault();
					greet();
				}}>
				<input
					id="greet-input"
					onChange={e => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}

export default App;