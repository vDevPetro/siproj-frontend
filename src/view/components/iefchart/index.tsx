'use client';

import { RadialBar, RadialBarChart, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    {
      "name": "IEF",
      "mes": 0.93,
      "ano": 0.97,
      "fill": "#8884d8"
    },
    {
    "name": "Prev",
    "mes": 0.84,
    "ano": 1,
    "fill": "#8dd1e1"
    },
    {
      "name": "Real",
      "mes": 0.79,
      "ano": 0.97,
      "fill": "#83a6ed"
    }
];

const formatPercentage = (value: number) => `${(value * 100).toFixed(0)}%`;

const IefChart = () => {
    return (
        <div className="d-flex justify-content-center">
            <ResponsiveContainer width="45%" height={300}>
                <RadialBarChart 
                    innerRadius="30%" 
                    outerRadius="120%" 
                    data={data} 
                    startAngle={180} 
                    endAngle={0}
                >

                    <RadialBar 
                        label={{ 
                            position: 'inside', 
                            formatter: formatPercentage, 
                            fill: '#555' 
                        }} 
                        background 
                        dataKey='mes' 
                    />
                    <Legend iconSize={13} layout='horizontal' verticalAlign='bottom' align="right"/>
                    <Tooltip formatter={formatPercentage} />
                </RadialBarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="45%" height={300}>
                <RadialBarChart 
                    innerRadius="30%" 
                    outerRadius="120%" 
                    data={data} 
                    startAngle={180} 
                    endAngle={0}
                >
                    <RadialBar 
                        label={{  
                            formatter: formatPercentage, 
                            fill: '#666' 
                        }} 
                        background 
                        dataKey='ano' 
                    />
                    <Legend iconSize={13} layout='horizontal' verticalAlign='bottom' align="right" />
                    <Tooltip formatter={formatPercentage} />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default IefChart;
