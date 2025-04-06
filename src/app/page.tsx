'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useFakeData } from '@/app/lib/use-fake-data';
import { StatsCards } from '@/app/_components/dashboard/stats-cards';
import { ProductionChart } from '@/app/_components/dashboard/production-chart';
import { TopCustomersChart } from '@/app/_components/dashboard/top-customers-chart';
import { ProductionStatus } from '@/app/_components/dashboard/production-status';
import { ProductionProgress } from '@/app/_components/dashboard/production-progress';
import { MaterialsNeeded } from '@/app/_components/dashboard/materials-needed';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function DashboardPage() {
	const [hasData, setHasData] = useState(true);
	const { dashboardData, isLoading } = useFakeData(hasData);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		setWindowWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement
				.requestFullscreen()
				.then(() => {
					setIsFullScreen(true);
				})
				.catch((err) => {
					console.error(`Error attempting to enable fullscreen: ${err.message}`);
				});
		} else {
			if (document.exitFullscreen) {
				document
					.exitFullscreen()
					.then(() => {
						setIsFullScreen(false);
					})
					.catch((err) => {
						console.error(`Error attempting to exit fullscreen: ${err.message}`);
					});
			}
		}
	};

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullScreen(!!document.fullscreenElement);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);

		return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
	}, []);

	return (
		<div className={`flex min-h-screen flex-col transition-all duration-300 ${isFullScreen ? 'bg-white' : ''}`}>
			<div className='p-3 sm:p-4 flex justify-end items-center flex-wrap gap-2'>
				<div className='flex items-center gap-2 ml-auto'>
					<Button variant='outline' onClick={() => setHasData(!hasData)} className='text-xs h-8'>
						{hasData ? 'Hiển thị trạng thái không có dữ liệu' : 'Hiển thị trạng thái có dữ liệu'}
					</Button>
					<Button variant='ghost' size='icon' onClick={toggleFullScreen} className='h-8 w-8'>
						{isFullScreen ? <Minimize2 className='h-4 w-4' /> : <Maximize2 className='h-4 w-4' />}
						<span className='sr-only'>{isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
					</Button>
				</div>
			</div>

			<main
				className={`flex-1 p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 ${
					isFullScreen ? 'max-w-screen-2xl mx-auto w-full' : ''
				}`}
			>
				<StatsCards data={dashboardData?.topProducts} isLoading={isLoading} />

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6'>
					<ProductionChart data={dashboardData?.productionPlan} isLoading={isLoading} />
					<TopCustomersChart data={dashboardData?.topCustomers} isLoading={isLoading} />
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
					<div className={`${windowWidth < 1024 && windowWidth >= 640 ? 'sm:col-span-2' : ''}`}>
						<ProductionStatus data={dashboardData?.productionStatus} isLoading={isLoading} />
					</div>
					<div className={`${windowWidth < 1024 && windowWidth >= 640 ? 'sm:col-span-2' : ''}`}>
						<ProductionProgress data={dashboardData?.productionProgress} isLoading={isLoading} />
					</div>
					<div className={`${windowWidth < 1024 && windowWidth >= 640 ? 'sm:col-span-2' : ''}`}>
						<MaterialsNeeded data={dashboardData?.materialsNeeded} isLoading={isLoading} />
					</div>
				</div>
			</main>
		</div>
	);
}
