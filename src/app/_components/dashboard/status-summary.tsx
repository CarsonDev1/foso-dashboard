'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StatusItem {
	count: number;
	label: string;
	color: string;
}

interface StatusSummaryProps {
	data?: StatusItem[];
	isLoading?: boolean;
	className?: string;
}

export function StatusSummary({ data, isLoading, className }: StatusSummaryProps) {
	return (
		<Card className={cn(className)}>
			<CardContent className='p-6'>
				{isLoading ? (
					<div className='space-y-4'>
						{Array(3)
							.fill(0)
							.map((_, index) => (
								<Skeleton key={index} className='h-16 w-full' />
							))}
					</div>
				) : !data || data.length === 0 ? (
					<div className='flex flex-col items-center justify-center h-[300px] text-gray-400'>
						<div className='grid grid-cols-3 gap-6 w-full'>
							<div className='text-center'>
								<div className='bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-2 flex justify-center items-center'>
									<span className='text-2xl font-bold text-gray-300'>0</span>
								</div>
								<span className='text-sm text-gray-400'>Chưa hoàn thành</span>
							</div>
							<div className='text-center'>
								<div className='bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-2 flex justify-center items-center'>
									<span className='text-2xl font-bold text-gray-300'>0</span>
								</div>
								<span className='text-sm text-gray-400'>Đang sản xuất</span>
							</div>
							<div className='text-center'>
								<div className='bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-2 flex justify-center items-center'>
									<span className='text-2xl font-bold text-gray-300'>0</span>
								</div>
								<span className='text-sm text-gray-400'>Hoàn thành</span>
							</div>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-3 gap-x-4 gap-y-6'>
						{data.map((item, index) => (
							<div key={index} className='text-center'>
								<div
									className={cn(
										'rounded-md p-4 mb-2 flex justify-center items-center',
										item.color === 'amber' && 'bg-amber-100 dark:bg-amber-900/20',
										item.color === 'blue' && 'bg-blue-100 dark:bg-blue-900/20',
										item.color === 'green' && 'bg-green-100 dark:bg-green-900/20'
									)}
								>
									<span
										className={cn(
											'text-3xl font-bold',
											item.color === 'amber' && 'text-amber-600 dark:text-amber-400',
											item.color === 'blue' && 'text-blue-600 dark:text-blue-400',
											item.color === 'green' && 'text-green-600 dark:text-green-400'
										)}
									>
										{item.count}
									</span>
								</div>
								<span className='text-sm'>{item.label}</span>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
