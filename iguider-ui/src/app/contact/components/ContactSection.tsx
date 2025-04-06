import React from 'react';

function ContactSection() {
  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Contact Us</h2>
      <form className="max-w-lg mx-auto px-4">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ContactSection;

