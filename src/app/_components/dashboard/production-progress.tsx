'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ProgressItem {
	id: string;
	label: string;
	value: number;
	total: number;
	percentage: number;
}

interface ProductionProgressProps {
	data?: ProgressItem[];
	isLoading?: boolean;
	className?: string;
}

export function ProductionProgress({ data, isLoading, className }: ProductionProgressProps) {
	return (
		<Card className={cn(className)}>
			<CardHeader className='flex flex-row items-center justify-between pb-2 mb-4'>
				<CardTitle className='text-base lg:text-lg font-medium'>Tiến Độ Sản Xuất Theo Nhóm</CardTitle>
				<Select defaultValue='hoan-thanh'>
					<SelectTrigger className='w-28 h-8 text-xs' showDateIcon={false}>
						<SelectValue placeholder='Hoàn thành' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='hoan-thanh'>Hoàn thành</SelectItem>
						<SelectItem value='dang-thuc-hien'>Đang thực hiện</SelectItem>
						<SelectItem value='chua-hoan-thanh'>Chưa hoàn thành</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='pt-0 pb-4'>
				{isLoading ? (
					<div className='space-y-8'>
						{Array(7)
							.fill(0)
							.map((_, index) => (
								<div key={index} className='space-y-2'>
									<Skeleton className='h-4 w-40' />
									<Skeleton className='h-4 w-full' />
								</div>
							))}
					</div>
				) : !data || data.length === 0 ? (
					<div className='flex items-center justify-center h-[300px] text-gray-400'>
						<p>Chưa có dữ liệu</p>
					</div>
				) : (
					<div className='space-y-8'>
						{data.map((item) => (
							<div key={item.id} className='space-y-2'>
								<div className='flex justify-between items-center'>
									<span className='font-medium text-sm'>{item.label}</span>
									<span>
										<span className='font-medium text-sm'>{item.value} cái</span>
										<span className='text-gray-500 text-sm ml-1'>({item.percentage}%)</span>
									</span>
								</div>
								<div className='w-full h-2 bg-gray-100 rounded-full overflow-hidden'>
									<div className='h-full bg-emerald-500' style={{ width: `${item.percentage}%` }} />
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
