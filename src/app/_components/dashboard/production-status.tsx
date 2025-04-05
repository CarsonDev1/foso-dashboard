'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface ProductionStatusData {
	total: number;
	completed: number;
	inProgress: number;
	planned: number;
}

interface ProductionStatusProps {
	data?: ProductionStatusData;
	isLoading?: boolean;
	className?: string;
}

const CustomizedLabel = (props: any) => {
	const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, fill, viewportWidth } = props;
	const RADIAN = Math.PI / 180;

	const labelScale = viewportWidth < 768 ? 0.8 : viewportWidth < 1280 ? 1.1 : 1.4;
	const radius = outerRadius * labelScale;
	const labelWidth = viewportWidth < 768 ? 40 : 50;
	const labelHeight = viewportWidth < 768 ? 24 : 30;
	const fontSize = viewportWidth < 768 ? 10 : 12;

	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	const lineX1 = cx + outerRadius * 0.7 * Math.cos(-midAngle * RADIAN);
	const lineY1 = cy + outerRadius * 0.7 * Math.sin(-midAngle * RADIAN);

	if (viewportWidth < 375) {
		return null;
	}

	return (
		<g>
			<line x1={lineX1} y1={lineY1} x2={x} y2={y} stroke={fill} strokeWidth={2} />

			<rect
				x={x - labelWidth / 2}
				y={y - labelHeight / 2}
				width={labelWidth}
				height={labelHeight}
				rx={labelHeight / 2}
				fill={fill}
				filter='url(#shadow)'
			/>

			<text
				x={x}
				y={y + 1}
				fill='#FFFFFF'
				textAnchor='middle'
				dominantBaseline='middle'
				fontWeight='bold'
				fontSize={fontSize}
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		</g>
	);
};

export function ProductionStatus({ data, isLoading, className }: ProductionStatusProps) {
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
	const [chartHeight, setChartHeight] = useState(240);
	type PeriodOption = 'hom-nay' | 'thang-nay' | 'quy-nay' | 'nam-nay';

	const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('hom-nay');
	const [displayData, setDisplayData] = useState<ProductionStatusData | undefined>(data);

	type MockDataType = {
		[key in PeriodOption]: {
			total: number;
			completed: number;
			inProgress: number;
			planned: number;
			chartValues: number[];
		};
	};

	const mockDataByPeriod: MockDataType = {
		'hom-nay': {
			total: data?.total || 45,
			completed: data?.completed || 15,
			inProgress: data?.inProgress || 18,
			planned: data?.planned || 12,
			chartValues: [30, 40, 30],
		},
		'thang-nay': {
			total: 120,
			completed: 48,
			inProgress: 42,
			planned: 30,
			chartValues: [40, 35, 25],
		},
		'quy-nay': {
			total: 350,
			completed: 175,
			inProgress: 105,
			planned: 70,
			chartValues: [50, 30, 20],
		},
		'nam-nay': {
			total: 1200,
			completed: 720,
			inProgress: 300,
			planned: 180,
			chartValues: [60, 25, 15],
		},
	};

	useEffect(() => {
		if (isLoading || !data) return;

		const periodData = mockDataByPeriod[selectedPeriod];
		setDisplayData({
			total: periodData.total,
			completed: periodData.completed,
			inProgress: periodData.inProgress,
			planned: periodData.planned,
		});
	}, [selectedPeriod, data, isLoading]);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);

			if (window.innerWidth < 768) {
				setChartHeight(200);
			} else if (window.innerWidth < 1024) {
				setChartHeight(220);
			} else if (window.innerWidth < 1280) {
				setChartHeight(240);
			} else {
				setChartHeight(260);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const getChartSize = () => {
		if (windowWidth < 375) return 70;
		if (windowWidth < 768) return 80;
		if (windowWidth < 1024) return 90;
		return 100;
	};

	type ChartDataItem = {
		name: string;
		value: number;
		color: string;
	};

	const chartData: ChartDataItem[] = displayData
		? [
				{
					name: 'Hoàn thành',
					value: mockDataByPeriod[selectedPeriod].chartValues[0],
					color: '#10B981',
				},
				{
					name: 'Đang sản xuất',
					value: mockDataByPeriod[selectedPeriod].chartValues[1],
					color: '#2563EB',
				},
				{
					name: 'Chưa hoàn thành',
					value: mockDataByPeriod[selectedPeriod].chartValues[2],
					color: '#F97316',
				},
		  ]
		: [];

	const handlePeriodChange = (value: string) => {
		setSelectedPeriod(value as PeriodOption);
	};

	return (
		<Card className={cn(className, 'h-full flex flex-col')}>
			<CardHeader className='flex flex-row items-center justify-between pb-2 flex-shrink-0'>
				<CardTitle className='text-base font-medium'>Tình Hình Sản Xuất</CardTitle>
				<Select defaultValue='hom-nay' onValueChange={handlePeriodChange}>
					<SelectTrigger className='w-28 h-8 text-xs'>
						<SelectValue placeholder='Hôm nay' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='hom-nay'>Hôm nay</SelectItem>
						<SelectItem value='thang-nay'>Tháng này</SelectItem>
						<SelectItem value='quy-nay'>Quý này</SelectItem>
						<SelectItem value='nam-nay'>Năm nay</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='pt-0 pb-4 px-4 sm:px-6 flex-grow flex flex-col'>
				{isLoading ? (
					<Skeleton className='h-full w-full min-h-[250px]' />
				) : !displayData ? (
					<div className='flex flex-col items-center justify-center h-full min-h-[250px] text-gray-400'>
						<div className='relative w-32 h-32 rounded-full border-8 border-gray-200 mb-4'>
							<div className='absolute inset-0 flex items-center justify-center'>
								<span className='text-2xl font-bold text-gray-300'>0</span>
							</div>
						</div>
						<p>Lệnh sản xuất</p>
						<div className='flex justify-between w-full mt-6'>
							<div className='text-center'>
								<p className='text-xl font-bold text-gray-300'>0</p>
								<p className='text-sm text-gray-400'>Chưa hoàn thành</p>
							</div>
							<div className='text-center'>
								<p className='text-xl font-bold text-gray-300'>0</p>
								<p className='text-sm text-gray-400'>Đang sản xuất</p>
							</div>
							<div className='text-center'>
								<p className='text-xl font-bold text-gray-300'>0</p>
								<p className='text-sm text-gray-400'>Hoàn thành</p>
							</div>
						</div>
					</div>
				) : (
					<div className='flex flex-col h-full'>
						<div className='relative flex-grow flex justify-center items-center h-[200px] sm:h-[220px] md:h-[240px] lg:h-[240px] xl:h-[260px]'>
							<svg width='0' height='0'>
								<defs>
									<filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
										<feDropShadow dx='0' dy='2' stdDeviation='2' floodOpacity='0.2' />
									</filter>
								</defs>
							</svg>

							<ResponsiveContainer width='100%' height='100%'>
								<PieChart>
									<Pie
										data={chartData}
										cx='50%'
										cy='50%'
										labelLine={false}
										label={(props) => CustomizedLabel({ ...props, viewportWidth: windowWidth })}
										outerRadius={getChartSize()}
										innerRadius={getChartSize() * 0.6}
										startAngle={90}
										endAngle={-270}
										paddingAngle={5}
										dataKey='value'
										strokeWidth={0}
										stroke='none'
										isAnimationActive={true}
									>
										{chartData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={entry.color}
												style={{
													filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1))',
													strokeWidth: 0,
												}}
											/>
										))}
									</Pie>
								</PieChart>
							</ResponsiveContainer>

							<div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
								<div className='text-center'>
									<p className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
										{displayData.total}
									</p>
									<p className='text-xs sm:text-sm text-gray-500'>Lệnh sản xuất</p>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-3 gap-2 mt-2 sm:mt-4 md:mt-6 xl:mt-8 flex-shrink-0'>
							<div className='border border-[#DDDDE2] rounded-lg p-2'>
								<p className='text-lg sm:text-xl md:text-2xl font-bold text-amber-500'>
									{displayData.planned}
								</p>
								<p className='text-xs sm:text-sm'>Chưa hoàn thành</p>
							</div>

							<div className='border border-[#DDDDE2] rounded-lg p-2'>
								<p className='text-lg sm:text-xl md:text-2xl font-bold text-blue-600'>
									{displayData.inProgress}
								</p>
								<p className='text-xs sm:text-sm'>Đang sản xuất</p>
							</div>

							<div className='border border-[#DDDDE2] rounded-lg p-2'>
								<p className='text-lg sm:text-xl md:text-2xl font-bold text-emerald-500'>
									{displayData.completed}
								</p>
								<p className='text-xs sm:text-sm'>Hoàn thành</p>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
