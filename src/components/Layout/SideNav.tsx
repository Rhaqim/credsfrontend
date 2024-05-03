import React from "react";
import Link from "next/link";

import { SideNavProps } from "@/types/account/items.type";

const SideNav = ({
	header,
	isOpen,
	toggleSideNav,
	items,
	links,
	activeSection,
}: SideNavProps) => {
	return (
		<div className="min-h-screen flex overflow-hidden bg-gray-100">
			{/* Side bar */}
			<div
				className={`hidden md:flex md:flex-shrink-0 ${
					isOpen ? "block" : "hidden"
				}`}
			>
				<div className="flex flex-col w-64">
					{/* Your side navigation header */}
					{header && (
						<button
							onClick={header.onClick}
							className="bg-gray-800 p-4 h-16 flex items-center justify-start"
						>
							<h1 className="text-white text-2xl font-bold">{header.label}</h1>
						</button>
					)}
					{/* Your side navigation content */}
					<div className="bg-gray-100 border-r border-gray-200 flex flex-col flex-grow pt-5 pb-4">
						{/* Your side navigation items */}
						<div className="px-4 space-y-1">
							{items &&
								items.map((item, index) => (
									<a
										key={index}
										onClick={item.onClick}
										href="#"
										className={`bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-2 ${
											activeSection === item.label
												? "text-gray-900 bg-gray-200"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										}`}
									>
										{/* Your navigation item content */}
										{item.label}
									</a>
								))}
							{links &&
								links.map((link, index) => (
									<Link key={index} href={link.href}>
										<p
											className={`bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-2 ${
												activeSection === link.label
													? "text-gray-900 bg-gray-200"
													: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
											}`}
										>
											{/* Your navigation item content */}
											{link.label}
										</p>
									</Link>
								))}
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu button */}
			<div className="md:hidden">
				<div
					className={`fixed inset-0 flex z-40 ${
						isOpen ? "bg-gray-600 bg-opacity-75" : "hidden"
					}`}
					onClick={toggleSideNav}
				></div>
				<div
					className={`fixed inset-y-0 right-0 flex z-50 ${
						isOpen
							? "transition ease-out duration-400 transform translate-x-0"
							: "transition ease-in duration-200 transform translate-x-full"
					}`}
				>
					<div className="relative w-screen max-w-xs">
						<div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
							<div className="px-4 sm:px-6">
								<button
									onClick={header?.onClick}
									className="text-gray-900 group flex items-center justify-between w-full p-2 text-sm font-medium rounded-md"
								>
									<span>{header?.label}</span>
									<svg
										className="text-gray-400 h-6 w-6 transform group-hover:text-gray-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<div className="px-4 space-y-1">
								{/* Your mobile side navigation items */}
								{items &&
									items.map((item, index) => (
										<a
											key={index}
											onClick={item.onClick}
											href="#"
											className={`bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
												activeSection === item.label
													? "text-gray-900 bg-gray-200"
													: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
											}`}
										>
											{/* Your navigation item content */}
											{item.label}
										</a>
									))}
								{links &&
									links.map((link, index) => (
										<Link key={index} href={link.href}>
											<p
												className={`bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
													activeSection === link.label
														? "text-gray-900 bg-gray-200"
														: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
												}`}
											>
												{/* Your navigation item content */}
												{link.label}
											</p>
										</Link>
									))}
							</div>
						</div>
					</div>
				</div>
				<div className="flex-shrink-0 w-14">
					<button
						onClick={toggleSideNav}
						className="bg-gray-800 p-1 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span className="sr-only">Open sidebar</span>
						{/* Icon for menu toggle */}
						<svg
							className="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SideNav;

// <div className='max-w-xs bg-gray-800 text-white min-h-screen hidden md:block'>
