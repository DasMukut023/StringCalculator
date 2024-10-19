
import React, { useState } from 'react';

const StringCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const add = (numbers) => {
        // console.log(numbers)
        if (numbers === '') return 0; 
        const delimiterRegex = /\/\/(.)\n/;
        let delimiter = ',';
        
        if (delimiterRegex.test(numbers)) {
            const parts = numbers.split(delimiterRegex);
            delimiter = parts[1];
            numbers = parts[2];
        }
        const nums = numbers.split(new RegExp(`[${delimiter}\n]`)).map(Number);
        
        const negatives = nums.filter(num => num < 0);
        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
        }

        return nums.reduce((acc, num) => acc + num, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            const sum = add(input);
            setResult(sum);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <h1>String Calculator</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter numbers"
                />
                <div>

                <button style={{marginTop:"10px"}} type="submit">Add</button>
                </div>
                
            </form>
            {result !== null && <h2>Result: {result}</h2>}
            {error && <h2 style={{ color: 'red' }}>{error}</h2>}
        </div>
    );
};

export default StringCalculator;
