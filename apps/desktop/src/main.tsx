import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router';
import { GuestRoute, ProtectedRoute } from '@/components/SessionGate';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import MainLayout from '@/layouts/MainLayout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import { ThemeProvider } from './components/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<HashRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route element={<GuestRoute />}>
							<Route
								path="/login"
								element={<LoginPage />}
							/>
						</Route>
						<Route
							path="/auth/callback"
							element={<AuthCallbackPage />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route element={<AuthenticatedLayout />}>
							<Route
								index
								element={<HomePage />}
							/>
						</Route>
					</Route>
				</Routes>
			</HashRouter>
		</ThemeProvider>
	</React.StrictMode>
);
