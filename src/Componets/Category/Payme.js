import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Payment = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [searchError, setSearchError] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch('https://tronixpayment.axispay.cloud/api/v1/getalldata');
            if (response.ok) {
                const data = await response.json();
                console.log('data =>', data);

                if (data.result) {
                    setPaymentData(data.result);
                    setSearchError(''); // Clear search error when new data is fetched
                } else {
                    console.error('Data format is not as expected');
                }

            } else {
                console.error('Failed to fetch data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = () => {
        // Format selected date to YYYY-MM-DD format
        // const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

        fetch(`https://tronixpayment.axispay.cloud/api/v1/serchtransDate?createdAt=${selectedDate}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Data not found');
                }
            })
            .then(data => {
                console.log(data);
                if (data.length === 0) {
                    setSearchError('No records found.');
                    setPaymentData([]);
                } else {
                    setPaymentData(data);
                    setSearchError('');
                }
            })
            .catch(error => {
                setSearchError('Error fetching data.');
                console.error('Error:', error);
            });
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col main-container px-4 overflow-hidden text-sm ">
            <div className="">
                <div className="mt-5">

                    <nav class="flex bg-gray-50 text-gray-700 border border-gray-200 py-3 px-5 rounded-lg " aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <a href='/dashboard' class="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center dark:text-gray-400 ">
                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="#" class="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium dark:text-gray-400 dark:hover:text-white">Payment</a>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div style={{ borderBottom: '1px solid #f84525', padding: '12px 0' }}>
                        {/* Content here */}
                    </div>


                    <div className="relative max-w-[19rem] mt-4">
                        <DatePicker
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-s-lg text-sm block w-full  p-2.5 pr-5"
                            placeholderText="Select date"
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />


                        <button
                            type="button"
                            className="absolute inset-y-0 right-12 flex items-center px-3 bgsearch text-white text-sm rounded-r-lg  focus:outline-none"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    <div className="p-6 overflow-scroll  px-0">
                                <table className="mt-4 w-full min-w-max table-auto text-left text-black">
                                    <thead >
                                        <tr>
                                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Id
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Transaction ID
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Transaction Date
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Transaction Time
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Amount
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Status
                                                </p>
                                            </th>
                                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                                    Payment Url
                                                </p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentData.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className="text-center py-4">
                                                    No products found.
                                                </td>
                                            </tr>
                                        ) : (

                                            paymentData.length > 0 ? (
                                                paymentData.map((payment, index) => (
                                                    <tr key={index}>

                                                        <td className="p-4 border-b border-blue-gray-50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                                        {index + 1}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 border-b border-blue-gray-50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                                        {payment.transId}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 border-b border-blue-gray-50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                                        {new Date(payment.createdAt).toISOString().split('T')[0]}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 border-b border-blue-gray-50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                                        {new Date(payment.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 border-b border-blue-gray-50">
                                                            <div className="flex flex-col">
                                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold ">
                                                                    Rs.{payment.amount}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 border-b border-blue-gray-50">
                                                            <div className="w-max">
                                                                <p className={`block antialiased font-sans text-sm leading-normal font-bold ${payment.status === 'PAYMENT_SUCCESS' ? 'text-green-900 bg-green-200' : payment.status === 'PAYMENT_PENDING' ? 'text-red-900 bg-red-200' : ''}`}>
                                                                    {payment.status}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 border-b border-blue-gray-50">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                                        {payment.webUrl}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="p-4 border-b border-blue-gray-50">
                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                            {searchError || 'No records found.'}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>

                            </div>


                    {/* <div className="relative overflow-auto shadow-md">
                        <div className="table-container overflow-auto max-h-[900px]">

                          
                        </div>
                    </div> */}

                </div>

            </div>
        </div>
    );
};

export default Payment;
