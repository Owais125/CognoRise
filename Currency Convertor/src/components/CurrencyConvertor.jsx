import React, { useEffect, useState } from 'react'
import CurrencyDropDown from './DropDown'
import { HiArrowsRightLeft } from 'react-icons/hi2'

const CurrencyConvertor = () => {
    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('INR')
    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting, setConverting] = useState(false)
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorite'))||["INR","EUR"])
    //  'api.frankfurter.app/currencies'
    const fetchCurrency = async()=>{
        try {
            const res = await fetch('https://api.frankfurter.app/currencies')
            const data = await res.json()
            setCurrencies(Object.keys(data))


        } catch (error) {
            console.log('Fetching Error',error)
        }
    }
    useEffect(() => {
      fetchCurrency()
    }, [])
    console.log(currencies)

    //  'api.frankfurter.app/latest?amount=1&from=USD&to=INR'

    const currcrnyConvert = async()=>{
        if(!amount)return
        setConverting(true)
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
            const data = await res.json()
            setConvertedAmount(data.rates[toCurrency] + ' '+ toCurrency)

        } catch (error) {
            console.log('Fetching Error',error)
        }finally{setConverting(false)}
    }
    
    const handleFavorite = (currency)=>{
        let updateFavorites = [...favorites]
        if (favorites.includes(currency)) {
             updateFavorites = updateFavorites.filter((fav)=> fav !== currency)
        }
        else{
            updateFavorites.push(currency)
        }
        setFavorites(updateFavorites)
        localStorage.setItem("favorite",JSON.stringify(updateFavorites))
    }
    
    const swapCurrency = ()=>{
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }
  return (
    <div className='max-w-3xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Convertor</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center'>
            <CurrencyDropDown favorites={favorites} currencies={currencies} title='From' setCurrency={setFromCurrency} currency={fromCurrency} handleFavorite={handleFavorite} />
            {/* Swap Currency Button */}
            <div className='flex justify-center mt-3 sm:mb-0'>
               <button onClick={swapCurrency} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
               <HiArrowsRightLeft className='text-xl text-gray-700'/>
               </button>
            </div>
            <CurrencyDropDown favorites={favorites} currencies={currencies} title='To' setCurrency={setToCurrency} currency={toCurrency} handleFavorite={handleFavorite} />
        </div>
        <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700' htmlFor="amount">Amount:</label>
            <input onChange={(e)=>setAmount(e.target.value)} value={amount} className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none' type="number" />
        </div>
        <div className='flex justify-end mt-6'>
            <button onClick={currcrnyConvert} className={`focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${converting?"animate-pulse":''}`}>Convert</button>
        </div>
        {convertedAmount && <div className='mt-4 text-lg font-medium text-right text-green-600'>
            Converted Amount: {convertedAmount}
        </div>}
    </div>
  )
}

export default CurrencyConvertor