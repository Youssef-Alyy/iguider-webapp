'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export default function Upload({ onClose }) {
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState('');
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [uploadCompleteMessage, setUploadCompleteMessage] = useState('');
	const router = useRouter();

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			const allowedTypes = ['application/octet-stream', 'application/json'];
			if (!allowedTypes.includes(selectedFile.type)) {
				setErrorMessage('Invalid file type. Please upload a binary file or a CAPE Report in JSON format.');
				setFile(null);
			} else {
				setFile(selectedFile);
				setUploadProgress(0);
				setIsUploading(false);
				setErrorMessage('');
			}
		}
	};

	const handleUpload = async () => {
		if (file && title) {
			setIsUploading(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('title', title);

			try {
				const response = await fetch('http://localhost:3000/api/reports/upload', {
					method: 'POST',
					body: formData,
					credentials: 'include',
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.detail || 'Upload failed. Please try again.');
				}

				setUploadCompleteMessage('Upload complete!');
				setUploadProgress(0);
				setFile(null);
				setTitle('');
				if (onClose) {
					setTimeout(onClose, 2000);
				}
			} catch (error) {
				setErrorMessage("Unable to upload file");
			} finally {
				setIsUploading(false);
			}
		}
	};

	return (
		<div className='flex flex-col items-center justify-center gap-12 px-4 md:px-0'>
			<div className='w-full max-w-md space-y-6 bg-white dark:bg-gray-950 rounded-2xl p-8'>
				<div className='relative grid gap-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer transition-colors hover:border-gray-400 dark:hover:border-gray-600'>
					<div className='flex flex-col items-center justify-center space-y-4'>
						<UploadIcon className='h-10 w-10 text-gray-400' />
						<div className='space-y-1'>
							<h3 className='text-center text-lg font-semibold'>Drag and drop a file</h3>
							<p className='text-center text-gray-500 dark:text-gray-400'>or click to select a file to upload</p>
						</div>
					</div>
					<input
						className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
						type='file'
						accept='.bin,application/octet-stream,application/json'
						onChange={handleFileChange}
					/>
				</div>
				{errorMessage && (
					<div className='text-red-500 dark:text-red-400 text-sm'>{errorMessage}</div>
				)}
				{file && (
					<div className='space-y-4'>
						<div className='text-sm text-gray-600 dark:text-gray-300'>
							Selected file: <strong>{file.name}</strong>
						</div>
					</div>
				)}
				<input
					className='w-full border border-gray-300 rounded-lg p-2'
					type='text'
					placeholder='Enter title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				{uploadCompleteMessage && (
					<div className='text-green-500 dark:text-green-400 text-sm'>{uploadCompleteMessage}</div>
				)}
				{isUploading && (
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium'>Uploading...</span>
							<span className='text-sm font-medium'>{uploadProgress}%</span>
						</div>
						<Progress className='h-3 rounded-full' value={uploadProgress} />
					</div>
				)}
				<Button className='w-full text-white' onClick={handleUpload} disabled={!file || isUploading}>
					{isUploading ? 'Uploading...' : 'Upload'}
				</Button>
			</div>
		</div>
	);
}

function UploadIcon(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
			<polyline points='17 8 12 3 7 8' />
			<line x1='12' x2='12' y1='3' y2='15' />
		</svg>
	);
}
