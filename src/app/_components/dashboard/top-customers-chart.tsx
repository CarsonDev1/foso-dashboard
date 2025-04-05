'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, TooltipProps, LabelList } from 'recharts';

interface CustomerData {
	name: string;
	value: number;
}

interface TopCustomersChartProps {
	data?: CustomerData[];
	isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md'>
				<p className='text-sm font-medium'>{label}</p>
				<p className='text-sm text-blue-600 dark:text-blue-400'>
					<span className='font-medium'>Số lượng:</span> {payload[0].value}
				</p>
			</div>
		);
	}

	return null;
};

export function TopCustomersChart({ data, isLoading }: TopCustomersChartProps) {
	// Sample data to match the design
	const sampleData = [
		{ name: 'Công ty Dệt may Happy Polla', value: 3100 },
		{ name: 'Công ty May mặc Saigon trendy', value: 3000 },
		{ name: 'Outlet Lemon squeeze', value: 3200 },
		{ name: 'Shop quần áo streetwear New York', value: 2900 },
		{ name: 'Shop thời trang công sở Basic Office', value: 2800 },
	];

	const chartData = !data || data.length === 0 ? sampleData : data;

	const renderCustomizedLabel = (props: any) => {
		const { x, y, width, height, value } = props;
		// Only show label for specific value (2,900 in the example image)
		if (value === 2900) {
			return (
				<g>
					<text
						x={x + width + 5}
						y={y + height / 2}
						fill='#000'
						textAnchor='start'
						dominantBaseline='middle'
						className='text-xs font-medium'
					>
						{value.toLocaleString()}
					</text>
				</g>
			);
		}
		return null;
	};

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between pb-2'>
				<CardTitle className='text-base font-medium'>Top 5 Khách Hàng Có Sản Lượng Nhiều Nhất</CardTitle>
				<Select defaultValue='nam-nay'>
					<SelectTrigger className='w-28 h-8 text-xs'>
						<SelectValue placeholder='Năm nay' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='nam-nay'>Năm nay</SelectItem>
						<SelectItem value='quy-nay'>Quý này</SelectItem>
						<SelectItem value='thang-nay'>Tháng này</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='pt-4 pb-2'>
				{isLoading ? (
					<Skeleton className='h-[300px] w-full' />
				) : !data || data.length === 0 ? (
					<div className='flex items-center justify-center h-[300px] text-gray-400'>
						<p>Chưa có dữ liệu</p>
					</div>
				) : (
					<div>
						<div className='mb-2 text-xs text-gray-500'>
							<div className='flex justify-between items-center'>
								<div>Khách hàng</div>
							</div>
						</div>
						<ResponsiveContainer width='100%' height={280}>
							<BarChart
								data={chartData}
								layout='vertical'
								margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
								barCategoryGap={16}
							>
								<XAxis
									type='number'
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12 }}
									domain={[0, 3500]}
									tickCount={5}
									ticks={[0, 800, 1600, 2400, 3200]}
									tickFormatter={(value) => `${value}`}
								/>
								<YAxis
									type='category'
									dataKey='name'
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12, fill: '#6B7280' }}
									width={180}
								/>
								<Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />

								<Bar dataKey='value' fill='#3B82F6' minPointSize={2} barSize={14}>
									<LabelList dataKey='value' position='right' content={renderCustomizedLabel} />
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
