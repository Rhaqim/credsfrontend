"use client";

import React, { useEffect, useState } from "react";

import { COOKIE_EXPIRATION_DAYS } from "@/config/app";

import CookiePreferencesModal from "./CookiePreferenceModal";

const COOKIE_NAME = "cookieConsent";
const TwentyfourHours = 24 * 60 * 60;

const CookieConsentBanner: React.FC = () => {
	const [consent, setConsent] = useState<boolean | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		// Check if the user has previously accepted or rejected the cookie consent
		const consentCookie = document.cookie
			.split("; ")
			.find(cookie => cookie.startsWith(COOKIE_NAME));
		if (consentCookie) {
			const [, value] = consentCookie.split("=");
			setConsent(value === "accepted");
		} else {
			setConsent(null);
		}
	}, []);

	const handle = (value: "accepted" | "rejected") => {
		document.cookie = `${COOKIE_NAME}=${value}; max-age=${
			Number(COOKIE_EXPIRATION_DAYS) * TwentyfourHours
		};`;
		setConsent(value === "accepted");
	};

	const handlePreferenceChange = () => {
		setShowModal(true); // Open the modal
	};

	if (consent === null) {
		return (
			<div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4">
				<p className="text-center">
					This website uses cookies to ensure you get the best experience on our
					website.
				</p>
				<div className="flex justify-center mt-4">
					<button
						className="mr-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
						onClick={() => handle("accepted")}
					>
						I Agree
					</button>
					<button
						className="mr-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
						onClick={() => handle("rejected")}
					>
						I Decline
					</button>
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
						onClick={handlePreferenceChange}
					>
						Change My Preference
					</button>
				</div>
				{showModal && (
					<CookiePreferencesModal onClose={() => setShowModal(false)} />
				)}{" "}
				{/* Render the modal */}
			</div>
		);
	}

	return null; // Do not display the banner if consent has been given or rejected
};

export default CookieConsentBanner;
