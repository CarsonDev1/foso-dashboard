'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LabelList } from 'recharts';

interface ProductionData {
	category: string;
	planned: number;
	actual: number;
}

interface ProductionChartProps {
	data?: ProductionData[];
	isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-white p-2 border border-gray-200 rounded shadow-sm'>
				<p className='text-sm font-medium'>{label}</p>
				{payload.map((entry: any, index: number) => (
					<p key={`tooltip-${index}`} className='text-sm' style={{ color: entry.color }}>
						{entry.name}: {entry.value}
					</p>
				))}
			</div>
		);
	}
	return null;
};

export function ProductionChart({ data, isLoading }: ProductionChartProps) {
	const sampleData = [
		{ category: 'Mặt hàng', planned: 60, actual: 40 },
		{ category: 'Áo ba lỗ', planned: 100, actual: 60 },
		{ category: 'Áo sơ mi', planned: 80, actual: 20 },
		{ category: 'Áo thun polo', planned: 70, actual: 45 },
		{ category: 'Quần baggy', planned: 85, actual: 55 },
	];

	const chartData = useMemo(() => {
		if (!data || data.length === 0) return sampleData;
		return data;
	}, [data]);

	const [activeBar, setActiveBar] = useState<string | null>(null);

	// Check if we should display empty state (no data view)
	const showEmptyState = !data || data.length === 0;

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between pb-2'>
				<CardTitle className='text-base font-medium'>Kế Hoạch Sản Xuất</CardTitle>
				<Select defaultValue='quy-nay'>
					<SelectTrigger className='w-28 h-8 text-xs'>
						<SelectValue placeholder='Quý này' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='quy-nay'>Quý này</SelectItem>
						<SelectItem value='thang-nay'>Tháng này</SelectItem>
						<SelectItem value='tuan-nay'>Tuần này</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='pt-4 pb-2'>
				{isLoading ? (
					<Skeleton className='h-[300px] w-full' />
				) : showEmptyState ? (
					<div className='flex flex-col h-[300px]'>
						<div className='flex justify-between mb-4 text-xs text-gray-500'>
							<div>Đơn vị</div>
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-1'>
									<div className='w-3 h-3 rounded-full bg-blue-500'></div>
									<span>Kế hoạch</span>
								</div>
								<div className='flex items-center gap-1'>
									<div className='w-3 h-3 rounded-full bg-emerald-500'></div>
									<span>Thực hiện</span>
								</div>
							</div>
						</div>

						<div className='relative flex-1'>
							<div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2'>
								<div>100</div>
								<div>80</div>
								<div>60</div>
								<div>40</div>
								<div>20</div>
								<div>0</div>
							</div>
						</div>
					</div>
				) : (
					<div className='relative'>
						<div className='flex justify-between mb-4 text-xs text-gray-500'>
							<div>Cái</div>
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-1'>
									<div className='w-3 h-3 rounded-full bg-blue-500'></div>
									<span>Kế hoạch</span>
								</div>
								<div className='flex items-center gap-1'>
									<div className='w-3 h-3 rounded-full bg-emerald-500'></div>
									<span>Thực hiện</span>
								</div>
							</div>
						</div>

						<ResponsiveContainer width='100%' height={300}>
							<BarChart
								data={chartData}
								margin={{ top: 5, right: 10, left: 0, bottom: 40 }}
								barGap={8}
								onMouseMove={(e) => {
									if (e && e.activeTooltipIndex !== undefined) {
										setActiveBar(chartData[e.activeTooltipIndex]?.category || null);
									} else {
										setActiveBar(null);
									}
								}}
								onMouseLeave={() => setActiveBar(null)}
							>
								<CartesianGrid
									strokeDasharray='3 3'
									horizontal={true}
									vertical={false}
									stroke='#E5E7EB'
								/>
								<XAxis
									dataKey='category'
									axisLine={false}
									tickLine={false}
									tick={{ fill: '#6B7280', fontSize: 12 }}
									interval={0}
									height={30}
									tickMargin={10}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tickCount={6}
									ticks={[0, 20, 40, 60, 80, 100]}
									domain={[0, 100]}
									tick={{ fill: '#6B7280', fontSize: 12 }}
								/>
								<Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
								<Bar
									name='Kế hoạch'
									dataKey='planned'
									fill='#3B82F6'
									radius={[4, 4, 0, 0]}
									barSize={24}
									isAnimationActive={false}
								/>
								<Bar
									name='Thực hiện'
									dataKey='actual'
									fill='#10B981'
									radius={[4, 4, 0, 0]}
									barSize={24}
									isAnimationActive={false}
								></Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
