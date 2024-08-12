'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  max: number;
  dados: [{
    date: string;
    trabalho_lb: string;
    trabalho: string;
    trabalho_real: string;
  }]
}

const CurvaS = ({dados, max}: Props) => {
  const arredondado = Math.ceil(max / 500) * 500;
  
  return (
    <>
    <p className='text-center fw-semibold'>Curva S</p>
    <ResponsiveContainer width="100%" >
        <LineChart
          data={dados}
          margin={{
            top: 5,
            right: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis 
            tickCount={3} 
            ticks={[0, 0.5, 1]}
            tickSize={0} 
            axisLine={false} 
            tickMargin={10} 
            domain={[0, 1]} 
            scale='auto' 
            type='number'
            tickFormatter={(value) => `${(value * 100)}%`} 
          />
          <Tooltip formatter={(value) => {
            if (typeof value === 'number') {
                  return `${(value * 100).toFixed(2)}%`;
              }
              return value;
            }} 
          />
          <Legend />
          <Line type="monotone" dataKey="trabalho_real" label="Trabalho" stroke="#a6d482" strokeWidth={2} />
          <Line type="monotone" dataKey="trabalho_lb" stroke="#198754" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      </>
  );
};


export default CurvaS;