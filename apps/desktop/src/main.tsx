import './index.css';
import { FreitasProvider } from '@freitas-ds/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router';
import {
	RedirectAuthenticated,
	RequireSession,
} from '@/components/SessionGate';
import MainLayout from '@/layouts/MainLayout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<FreitasProvider theme={{ seed: '#0F766E' }}>
			<HashRouter>
				<Routes>
					<Route
						path="/login"
						element={
							<RedirectAuthenticated>
								<LoginPage />
							</RedirectAuthenticated>
						}
					/>
					<Route
						path="/auth/callback"
						element={<AuthCallbackPage />}
					/>
					<Route
						element={
							<RequireSession>
								<MainLayout />
							</RequireSession>
						}>
						<Route
							index
							element={<HomePage />}
						/>
					</Route>
				</Routes>
			</HashRouter>
		</FreitasProvider>
	</React.StrictMode>
);
