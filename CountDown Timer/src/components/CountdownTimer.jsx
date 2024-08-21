import React, { useEffect, useState } from 'react'

const CountdownTimer = () => {
    const [targetDate, setTargetDate] = useState('');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(!isActive || !targetDate)return;
        const intercalId = setInterval(() => {

            const now = new Date().getTime()
            const distance = new Date(targetDate).getTime() - now

            if(distance >0){
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }else {
                clearInterval(intercalId);
                setIsActive(false);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
            
        }, 1000);
        return () => clearInterval(intercalId);
    }, [targetDate, isActive])

    const startCountdown = ()=>{
        if (targetDate) {
            setIsActive(true);
        }
    }

    const changeHandle = (e)=>{
        setTargetDate(e.target.value)
    }
    
    return (
        <div className='max-w-3xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
            <h2 className='mb-5 text-2xl font-semibold text-gray-700'>CountdownTimer</h2>
            <div className='gap-4 flex flex-col'>
                <input className='border p-3 focus:ring-4 focus:ring-gray-600 focus:ring-offset-neutral-600' type="datetime-local" onChange={changeHandle} />
                <button onClick={startCountdown} className='focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>Start Countdown</button>
            </div>
            <div className='mt-3 flex items-center justify-center'>
              {
                !targetDate?"": <h4 className='font-bold'> {targetDate} is Left</h4>
              }
            </div>
            <div className="flex gap-4 mt-5 flex-wrap justify-center">
                <div><span>{timeLeft.days}</span> Days</div>
                <div><span>{timeLeft.hours}</span> Hours</div>
                <div><span>{timeLeft.minutes}</span> Minutes</div>
                <div><span>{timeLeft.seconds}</span> Seconds</div>
            </div>
        </div>

    )
}

export default CountdownTimer