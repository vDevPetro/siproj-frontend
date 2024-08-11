'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  dados: [{
    date: string;
    baselineWork: number;
    work: number;
    actualWork: number;
  }]
}

const CurvaS = ({dados}: Props) => {

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
          <YAxis tickCount={6} tickSize={0} axisLine={false} tickMargin={10} domain={[0, 2500]} scale='auto' type='number' />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actualWork" label="Trabalho" stroke="#a6d482" strokeWidth={2} />
          <Line type="monotone" dataKey="baselineWork" stroke="#198754" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      </>
  );
};


export default CurvaS;