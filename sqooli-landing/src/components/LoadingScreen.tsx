import sqooliLogo from '../assets/images/hero/logo.svg'

export default function LoadingScreen() {
	return (
		<main className="loading-screen" role="status" aria-live="polite" aria-label="Loading Sqooli">
			<div className="loading-card">
				<img src={sqooliLogo} alt="Sqooli" />
				<span className="loading-spinner" aria-hidden="true" />
				<p>Preparing your learning space</p>
			</div>
		</main>
	)
}
