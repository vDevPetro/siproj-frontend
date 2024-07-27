'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      name: 'Mar/2023',
      real: 24,
      programado: 25,
      lb: 2400,
    },
    {
      name: 'Abr/2023',
      real: 80,
      programado: 120,
      lb: 2210,
    },
    {
      name: 'Jun/2023',
      real: 150,
      programado: 140,
      lb: 2290,
    },
    {
      name: 'Jul/2023',
      real: 220,
      programado: 220,
      lb: 2000,
    },
    {
      name: 'Ago/2023',
      real: 260,
      programado: 260,
      lb: 2181,
    },
    {
      name: 'Set/2023',
      real: 380,
      programado: 400,
      lb: 2500,
    },
    {
      name: 'Out/2023',
      real: 400,
      programado: 420,
      lb: 2100,
    },
  ];
  

const CurvaS = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis tickCount={5} tickSize={0} axisLine={false} tickMargin={10} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="real" stroke="#0d6efd" strokeWidth={2}/>
          <Line type="monotone" dataKey="programado" stroke="#198754" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
  );
};


export default CurvaS;