import type { Metadata } from 'next';
import { Lexend_Deca } from 'next/font/google';
import './globals.css';
import { DashboardHeader } from '@/app/_components/DashboardHeader';

const lexend = Lexend_Deca({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'MRP Dashboard',
	description: 'Dashboard for MRP production management',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={lexend.className}>
				<main>
					<DashboardHeader />
					{children}
				</main>
			</body>
		</html>
	);
}
