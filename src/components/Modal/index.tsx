"use client";

import React, { useEffect, useRef } from "react";

interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen">
				<div className="fixed inset-0 bg-gray-500 opacity-75"></div>
				<div
					ref={modalRef}
					className="relative bg-white rounded-lg p-8 max-w-md w-full"
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
