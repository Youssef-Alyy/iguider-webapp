import React from 'react';

const people = [
  { name: 'Ahmed Lekssays', role: 'Mentor' },
  { name: 'Maira Waheed', role: 'Intern' },
  { name: 'Ali Zair', role: 'Intern' },
  { name: 'Omar Elshenhabi', role: 'Intern' },
  { name: 'Othman Ouzzani', role: 'Intern' },
  { name: 'Youssef Aly', role: 'Intern' },
];

export default function TeamSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600"></p>
        </div>
        <ul role="list" className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <li key={person.name} className="bg-purple-100 p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-x-4">
                <div>
                  <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


