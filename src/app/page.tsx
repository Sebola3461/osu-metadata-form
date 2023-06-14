"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
	useEffect(() => {
		fetch("/api/authorize")
			.then((r) => r.text())
			.then((url) => window.location.replace(url));
	}, []);

	return <main className={styles.main}>Please wait... Redirecting you</main>;
}
