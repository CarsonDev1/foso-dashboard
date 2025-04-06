'use client';

import { ArrowDown, ArrowUp } from '@/app/_components/dashboard/animated-arrows';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductStat {
	id: string;
	value: number;
	label: string;
	sublabel: string;
	change?: number;
	trend?: 'up' | 'down';
}

interface StatsCardsProps {
	data?: ProductStat[];
	isLoading?: boolean;
}

export function StatsCards({ data, isLoading }: StatsCardsProps) {
	return (
		<div>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-base lg:text-lg font-medium'>Top Sản Phẩm Sản Xuất Nhiều Nhất</h2>
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
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
				{isLoading || !data
					? Array(5)
							.fill(0)
							.map((_, i) => (
								<Card key={i} className='overflow-hidden'>
									<CardContent className='p-4'>
										{isLoading ? (
											<>
												<Skeleton className='h-8 w-16 mb-2' />
												<Skeleton className='h-4 w-24 mb-4' />
												<Skeleton className='h-4 w-20' />
											</>
										) : (
											<div className='text-center py-2'>
												<p className='text-2xl font-semibold text-gray-300'>0</p>
												<p className='text-sm text-gray-400'>Chưa có một hàng</p>
											</div>
										)}
									</CardContent>
								</Card>
							))
					: data.map((stat) => (
							<Card key={stat.id} className='overflow-hidden'>
								<CardContent className='p-4'>
									<div className='flex items-start justify-between'>
										<div>
											<p className='text-3xl font-bold text-chart-blue'>{stat.value}</p>
										</div>
										{stat.change && (
											<div className='text-xs flex items-center gap-1'>
												{stat.trend === 'up' ? (
													<ArrowUp className='arrow-float' />
												) : (
													<ArrowDown className='arrow-float' />
												)}
												{stat.change}%
											</div>
										)}
									</div>
									<p className='text-sm mt-2'>{stat.label}</p>
								</CardContent>
							</Card>
					  ))}
			</div>
		</div>
	);
}
