
export default function FlowSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container grid items-start gap-12 px-4 md:px-6">
				<div className="space-y-4 text-center">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
						Streamlined Malware Analysis Workflow
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Our powerful malware analysis tool guides you through every step of the process.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col items-center gap-4">
						<UploadIcon className="h-12 w-12 text-primary" />
						<div className="space-y-2 text-center">
							<h3 className="text-xl font-semibold">Upload Malware</h3>
							<p className="text-muted-foreground">Submit the malware file for comprehensive analysis.</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-4">
						<CogIcon className="h-12 w-12 text-primary" />
						<div className="space-y-2 text-center">
							<h3 className="text-xl font-semibold">Analysis Engine</h3>
							<p className="text-muted-foreground">Our advanced engine processes the malware in-depth.</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-4">
						<BrainIcon className="h-12 w-12 text-primary" />
						<div className="space-y-2 text-center">
							<h3 className="text-xl font-semibold">Leverage LLM</h3>
							<p className="text-muted-foreground">Utilizing our large language model for comprehensive analysis.</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-4">
						<FileTextIcon className="h-12 w-12 text-primary" />
						<div className="space-y-2 text-center">
							<h3 className="text-xl font-semibold">Generate Report</h3>
							<p className="text-muted-foreground">Receive a detailed report of the malware analysis.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function BrainIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
			<path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
			<path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
			<path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
			<path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
			<path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
			<path d="M19.938 10.5a4 4 0 0 1 .585.396" />
			<path d="M6 18a4 4 0 0 1-1.967-.516" />
			<path d="M19.967 17.484A4 4 0 0 1 18 18" />
		</svg>
	)
}


function CogIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
			<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
			<path d="M12 2v2" />
			<path d="M12 22v-2" />
			<path d="m17 20.66-1-1.73" />
			<path d="M11 10.27 7 3.34" />
			<path d="m20.66 17-1.73-1" />
			<path d="m3.34 7 1.73 1" />
			<path d="M14 12h8" />
			<path d="M2 12h2" />
			<path d="m20.66 7-1.73 1" />
			<path d="m3.34 17 1.73-1" />
			<path d="m17 3.34-1 1.73" />
			<path d="m11 13.73-4 6.93" />
		</svg>
	)
}

function FileTextIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
			<path d="M14 2v4a2 2 0 0 0 2 2h4" />
			<path d="M10 9H8" />
			<path d="M16 13H8" />
			<path d="M16 17H8" />
		</svg>
	)
}


function UploadIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" x2="12" y1="3" y2="15" />
		</svg>
	)
}