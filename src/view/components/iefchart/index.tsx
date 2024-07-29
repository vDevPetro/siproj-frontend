'use client';

import { RadialBar, RadialBarChart, Legend, Tooltip, ResponsiveContainer, Text } from "recharts";

const data = [
    {
        "name": "Real",
        "mes": 0.79,
        "ano": 0.97,
        "fill": "#a3b18a"
    },
    {
    "name": "Prev",
    "mes": 0.84,
    "ano": 1,
    "fill": "#588157"
    },
    {
        "name": "IEF",
        "mes": 0.93,
        "ano": 0.97,
        "fill": "#3a5a40"
    }
];

const formatPercentage = (value: number) => `${(value * 100).toFixed(0)}%`;

const IefChart = () => {
    return (
        <div className="d-flex flex-wrap justify-content-center my-4 my-md-0">
            <div className="col-12 col-sm-6 my-3 my-sm-0">
                <div className="position-absolute mt-md-5 ps-2 ps-xxl-4"><p className="text-center ms-5 ms-md-4 fw-semibold">IEF mês</p></div>
                <ResponsiveContainer height={300}>
                    <RadialBarChart 
                        innerRadius="35%" 
                        outerRadius="120%" 
                        data={data} 
                        startAngle={180} 
                        endAngle={0}
                    >
                        <RadialBar 
                            label={{ 
                                position: 'inside', 
                                formatter: formatPercentage, 
                                fill: '#e5e5e5' 
                            }} 
                            background 
                            dataKey='mes' 
                        />
                        <Legend iconSize={13} layout='horizontal' verticalAlign='bottom' align="right"/>
                        <Tooltip formatter={formatPercentage} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            <div className="col-12 col-sm-6 mt-3 mt-sm-0">
            <div className="position-absolute mt-md-5 ps-2 ps-xxl-4"><p className="text-center ms-5 ms-md-4 fw-semibold">IEF ano</p></div>
                <ResponsiveContainer height={300}>
                    <RadialBarChart 
                        innerRadius="35%" 
                        outerRadius="120%" 
                        data={data} 
                        startAngle={180} 
                        endAngle={0}
                    >
                        <RadialBar 
                            label={{  
                                formatter: formatPercentage, 
                                fill: '#e5e5e5' 
                            }} 
                            background 
                            dataKey='ano' 
                        />
                        <Legend iconSize={13} layout='horizontal' verticalAlign='bottom' align="right" />
                        <Tooltip formatter={formatPercentage} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default IefChart;
