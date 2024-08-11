'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  dados: [{
    date: string;
    baselineWork: string;
    work: string;
    actualWork: string;
  }]
}

const CurvaS = ({dados}: Props) => {
  const maxValue = Math.max(...dados.map(d => Math.max(Number(d.baselineWork), Number(d.work), Number(d.actualWork))));


  return (
    <>
    <p className='text-center fw-semibold'>Curva S</p>
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={dados}
          margin={{
            top: 5,
            right: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis tickCount={4} tickSize={0} axisLine={false} tickMargin={10}  domain={[0, maxValue]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actualWork" stroke="#a6d482" strokeWidth={2}/>
          <Line type="monotone" dataKey="baselineWork" stroke="#198754" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      </>
  );
};


export default CurvaS;