import React, { useState } from 'react'

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [bmi, setBMI] = useState(null);
    const [message, setMessage] = useState('');
    const calculateBMI = () => {
        if (weight && feet && inches !== '') {
            const totalHeightInInches = parseFloat(feet) * 12 + parseFloat(inches);
            const heightInMeters = totalHeightInInches * 0.0254; // Convert inches to meters
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBMI(bmiValue.toFixed(2));
            setMessage(getBMIMessage(bmiValue));
        }
    };
    const getBMIMessage = (bmiValue) => {
        if (bmiValue < 18.5) return 'Underweight';
        if (bmiValue >= 18.5 && bmiValue < 24.9) return 'Normal weight';
        if (bmiValue >= 25 && bmiValue < 29.9) return 'Overweight';
        return 'Obesity';
    };
    return (
        <div className='max-w-3xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
            <h2 className='text-center font-semibold font text-3xl'>BMICalculator</h2>
            <div>

            <div className='gap-3 '>
                <label className='block text-lg font-medium mb-2' htmlFor="Weight">Weigth (kg):</label>
                <input value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight in kg" className='w-full p-4 border-2 border-gray-800 focus:ring-4 focus:ring-gray-800' type="number" />
            </div>
            <div className='gap-3 '>
                <label className='block text-lg font-medium mb-2' htmlFor="Weight">Height:</label>
                <div className='flex flex-row gap-2'>
                    
                <input value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        placeholder="Feet" className='w-full p-4 border-2 border-gray-800 focus:ring-4 focus:ring-gray-800' type="number" />
                <input value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        placeholder="Inches" className='w-full p-4 border-2 border-gray-800 focus:ring-4 focus:ring-gray-800' type="number" />
                </div>
            </div>
            </div>
            <button className='focus:ring-2 w-full mt-5 outline-dotted ease-in duration-300  focus:ring-gray-700-500 focus:outline-none focus:ring-offset-2 px-5 py-2 bg-gray-700-600 text-gray-800 rounded-md hover:bg-gray-700 hover:text-white' onClick={calculateBMI}>Calculate BMI</button>
            {bmi && (
                <div className='mt-5'>
                    <h2>Your BMI: {bmi}</h2>
                    <h3>{message}</h3>
                </div>
            )}
        </div>
    )
}

export default BMICalculator 