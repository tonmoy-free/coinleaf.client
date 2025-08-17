import React from "react";

const PublicAPI = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 lg:px-24 py-12">
            <div className='pt-10'>
                <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>Public API Documentation</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-2 lg:mb-8 md:mb-8 dark:text-white'>
                    Welcome to the official <strong>CoinLeaf Public API</strong>.
                    Use these APIs to integrate tasks, submissions, and coins into your apps.
                </p>
            </div>

            <div className="max-w-5xl mx-auto">


                {/* Base URL */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-2">Base URL</h2>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                        https://api.coinleaf.com/v1
                    </pre>
                </section>

                {/* Authentication */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-2">Authentication</h2>
                    <p>
                        Some endpoints require authentication using an <strong>API Key</strong>.
                        Send your key in the request header:
                    </p>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-3">
                        {`Authorization: Bearer YOUR_API_KEY`}
                    </pre>
                </section>

                {/* Endpoints */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">Endpoints</h2>

                    {/* Get All Tasks */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">1. Get All Tasks</h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            GET /tasks
                        </pre>
                        <p className="mt-2">Returns a list of all available tasks.</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            {`Response:
[
  {
    "id": "64ab1c",
    "title": "Write a short article",
    "payable_amount": 10,
    "required_workers": 5,
    "status": "active"
  }
]`}
                        </pre>
                    </div>

                    {/* Get Task by ID */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">2. Get Task by ID</h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            GET /tasks/:id
                        </pre>
                        <p className="mt-2">Fetch a single task by its ID.</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            {`Response:
{
  "id": "64ab1c",
  "title": "Write a short article",
  "detail": "Write a 500-word blog post about AI.",
  "payable_amount": 10,
  "required_workers": 5,
  "approved_workers": 2,
  "status": "active"
}`}
                        </pre>
                    </div>

                    {/* Get User Balance */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">3. Get User Balance</h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            GET /users/:email/balance
                        </pre>
                        <p className="mt-2">Returns the coin balance of a user.</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            {`Response:
{
  "email": "worker@mail.com",
  "coins": 250,
  "usd_value": 12.5
}`}
                        </pre>
                    </div>

                    {/* Submit Task Work */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">4. Submit Task Work</h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            POST /submissions
                        </pre>
                        <p className="mt-2">Submit completed work for a task.</p>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
                            {`Request Body:
{
  "task_id": "64ab1c",
  "worker_email": "worker@mail.com",
  "submission_detail": "Here is my completed work link."
}

Response:
{
  "message": "Submission received",
  "status": "pending"
}`}
                        </pre>
                    </div>
                </section>

                {/* Rate Limits */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-2">Rate Limits</h2>
                    <p>Free Tier: <strong>60 requests/minute</strong></p>
                    <p>Pro Tier: <strong>500 requests/minute</strong></p>
                </section>

                
            </div>
        </div>
    );
};

export default PublicAPI;
