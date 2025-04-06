import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function ForgotPassword({ onClose }) {

    function handleForgotPassword(e) {
        e.preventDefault();
        // To be implemented
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-md relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl leading-9 font-bold tracking-tight text-accent">Forgot Password</h2>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} className="text-gray-600 hover:text-gray-700 text-xl"/>
                    </button>
                </div>
                <p className="text-gray-700 text-md mb-4">
                    Please enter your email address below to receive a link to reset your password.
                </p>
                <form onSubmit={handleForgotPassword}>
                    <div>
                        <label htmlFor="email" className="block text-md font-medium leading-6 text-accent">
                        Email address
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
