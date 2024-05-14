import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TotalTransaction = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [paymentSearchData, setPaymentSearchData] = useState([]);
  const [successData, setSuccessData] = useState([]);
  const [successTotalData, setTotalSuccessData] = useState(0);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
    calculatePendingTotalAmount();
    calculateTotalTransactions();
  }, [paymentData]);

  const calculateTotalAmount = () => {
    const successfulPayments = paymentData.filter(payment => payment.status === 'PAYMENT_SUCCESS');
    const totalAmount = successfulPayments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);
    setTotalAmount(totalAmount);
  };

  const calculatePendingTotalAmount = () => {
    const pendingPayments = paymentData.filter(payment => payment.status === 'PAYMENT_PENDING');
    const totalPending = pendingPayments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);
    setTotalPending(totalPending);
  };

  const calculateTotalTransactions = () => {
    setTotalTransactions(paymentData.length);
  };

  const handleSearch = () => {
    const formattedDate = selectedDate ? formatDate(selectedDate) : '';
    fetch(`https://tronixpayment.axispay.cloud/api/v1/serchtransDate?createdAt=${formattedDate}`)
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
          setPaymentSearchData([]);
        } else {
          setPaymentSearchData(data);
          setSearchError('');
          const successTransactions = data.filter(payment => payment.status === 'PAYMENT_SUCCESS');
          const successCount = successTransactions.length;
          const successData = successTransactions.map(payment => ({
            status: payment.status,
            amount: payment.amount,
            TransactionDate: new Date(payment.createdAt).toISOString().split('T')[0]
          }));

          console.log('successData =>', successData);

          setSuccessCount(successCount);
          setSuccessData(successData);
          const totalAmountt = successData.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
          console.log('totalAmountt =>', totalAmountt);

          setTotalSuccessData(totalAmountt);
        }
      })
      .catch(error => {
        setSearchError('Error fetching data.');
        console.error('Error:', error);
      });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <main className="main-container">
      <div className="p-5">
        <div className="main-cards">
          <div className="relative p-5 bg-gradient-to-r from-red-400 to-red-600 rounded-md overflow-hidden">
            <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">{totalTransactions}</div>
            <div className="relative z-10 text-white leading-none font-semibold">Total Transaction</div>
          </div>

          <div className="relative p-5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-md overflow-hidden">
            <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">Rs.{totalAmount}</div>
            <div className="relative z-10 text-white leading-none font-semibold">Total Amount of SUCCESS</div>
          </div>

          <div className="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md overflow-hidden">
            <div className="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">Rs.{totalPending}</div>
            <div className="relative z-10 text-white leading-none font-semibold">Total Amount of PENDING</div>
          </div>

          
        </div>

        <div style={{ borderBottom: '1px solid #f84525', padding: '12px 0' }}></div>

          <div className="relative max-w-[19rem] mt-4">
            <DatePicker
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 pr-5"
              placeholderText="Select date"
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
            />

            <button
              type="button"
              className="absolute inset-y-0 right-5 flex items-center px-3 bgsearch text-white text-sm rounded-r-lg focus:outline-none"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="mt-3">
            <section className="grid sm:grid-cols-2 gap-1 w-full max-w-6xl">
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mt-3 flex">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-black">Total Successful Transactions</h3>
                  <p className="text-white font-bold mt-1">
                    <span className='bgsearch px-3 py-1 rounded text-white'>Count&nbsp;:&nbsp;{successCount}</span>
                  </p>
                </div>
                <div className="border-l border-gray-300 pl-3">
                  <h3 className="text-lg font-semibold text-black">Total Amount</h3>
                  <p className="text-white font-bold mt-1">
                    <span className='bgsearch px-3 py-1 rounded text-white'>Rs.{successTotalData.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="p-6 overflow-x-auto">
        <table className="mt-4 w-full min-w-max table-auto text-left text-black">
              <thead >
                <tr className='text-black'>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                    <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                      Id
                    </p>
                  </th>

                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                    <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                      Transaction Date
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
                </tr>
              </thead>
              <tbody>
                {successData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-black py-4">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  successData.length > 0 ? (
                    successData.map((payment, index) => (
                      <tr key={index} className=' text-black'>
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
                                {payment.TransactionDate}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                {payment.amount}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block antialiased font-sans text-sm leading-normal text-green-900 bg-green-200 font-bold">
                                {payment.status}
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
      </div>
    </main>
  );
}

export default TotalTransaction;
