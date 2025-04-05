'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';

interface MaterialItem {
	id: string;
	rank: number;
	name: string;
	type: string;
	unit: string;
	quantity: number;
}

interface MaterialsNeededProps {
	data?: MaterialItem[];
	isLoading?: boolean;
	className?: string;
}

export function MaterialsNeeded({ data, isLoading, className }: MaterialsNeededProps) {
	return (
		<Card className={cn(className)}>
			<CardHeader className='flex flex-row items-center justify-between pb-2 mb-4'>
				<CardTitle className='text-base font-medium'>Nguyên Vật Liệu Cần Mua</CardTitle>
				<Select defaultValue='tuan-nay'>
					<SelectTrigger className='w-28 h-8 text-xs'>
						<SelectValue placeholder='Tuần này' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='tuan-nay'>Tuần này</SelectItem>
						<SelectItem value='thang-nay'>Tháng này</SelectItem>
						<SelectItem value='quy-nay'>Quý này</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='pt-0'>
				{isLoading ? (
					<div className='space-y-4'>
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<div key={index} className='flex items-center space-x-4'>
									<Skeleton className='h-8 w-8 rounded-full' />
									<div className='space-y-2 flex-1'>
										<Skeleton className='h-4 w-40' />
										<Skeleton className='h-4 w-20' />
									</div>
									<Skeleton className='h-4 w-16' />
								</div>
							))}
					</div>
				) : !data || data.length === 0 ? (
					<div className='flex items-center justify-center h-[300px] text-gray-400'>
						<p>Chưa có dữ liệu</p>
					</div>
				) : (
					<div className='space-y-4'>
						<div className='grid grid-cols-12 text-xs text-gray-500 py-2'>
							<div className='col-span-1'>STT</div>
							<div className='col-span-5'>Nguyên vật liệu</div>
							<div className='col-span-3'>Đơn vị tính</div>
							<div className='col-span-3 text-right'>Số lượng</div>
						</div>

						{data.map((item, index) => (
							<div
								key={item.id}
								className={`grid grid-cols-12 items-center py-5 ${
									index !== data.length - 1 ? 'border-b' : ''
								}`}
							>
								<div className='col-span-1 text-sm'>{item.rank}</div>
								<div className='col-span-5 flex items-center gap-2'>
									<Avatar className='h-8 w-8 bg-gray-100 text-gray-600 text-xs'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='32'
											height='32'
											viewBox='0 0 32 32'
											fill='none'
										>
											<rect width='32' height='32' rx='4' fill='#D0D5DD' />
											<path
												d='M16.2301 4.40502L16.7401 4.91502C17.5051 5.68002 17.9251 6.69502 17.9251 7.77002C17.9251 8.84502 17.5101 9.85502 16.7551 10.615L12.8801 14.49C12.6801 14.69 12.5701 14.955 12.5701 15.24C12.5701 15.525 12.6801 15.795 12.8801 15.995L17.9501 21.065C18.8851 21.96 20.3651 21.945 21.2801 21.03L18.5801 23.73L16.2251 26.08L9.50507 19.36C8.31007 18.165 7.71007 16.575 7.81007 14.88C7.89507 13.46 8.53007 12.1 9.59007 11.035L16.2251 4.40002L16.2301 4.40502Z'
												fill='#52575E'
											/>
											<path
												d='M20.0801 8.26L22.9501 11.13C24.0501 12.23 24.6551 13.69 24.6551 15.25C24.6551 16.805 24.0501 18.265 22.9501 19.365L21.2801 21.035C20.3651 21.95 18.8801 21.965 17.9501 21.07L16.2301 19.35L19.5851 15.995C19.7851 15.795 19.8951 15.525 19.8951 15.245C19.8951 14.96 19.7851 14.69 19.5851 14.49C18.8101 13.715 18.3901 12.7 18.3901 11.62C18.3901 10.54 18.8101 9.52501 19.5751 8.76501L20.0851 8.255L20.0801 8.26Z'
												fill='#667085'
											/>
											<path
												d='M16.2341 12.8516L18.2034 14.8209C18.4368 15.0543 18.4368 15.4361 18.2034 15.6694L16.2341 17.6387L14.2648 15.6694C14.0315 15.4361 14.0315 15.0543 14.2648 14.8209L16.2341 12.8516Z'
												fill='#52575E'
											/>
										</svg>
									</Avatar>
									<div>
										<p className='text-sm font-medium'>{item.name}</p>
										<p className='text-xs text-gray-500'>{item.type}</p>
									</div>
								</div>
								<div className='col-span-3 text-sm'>{item.unit}</div>
								<div className='col-span-3 text-right text-sm font-medium'>{item.quantity}</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
