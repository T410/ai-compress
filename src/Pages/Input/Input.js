import { useEffect, useState, useRef } from "react";
import style from "./Input.module.css";
function Input() {
	const canvasRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState("");

	useEffect(() => {
		console.log(selectedFile);
	}, [selectedFile]);

	function onFileSelected(e) {
		setSelectedFile(e.target.files[0]);

		const img = new Image();
		img.onload = () => {
			canvasRef.current.getContext("2d").drawImage(img, 0, 0);
		};

		img.src = URL.createObjectURL(e.target.files[0]);
	}

	return (
		<div className={style.outerContainer}>
			<input type="file" onChange={onFileSelected}></input>
			<canvas width={512} height={512} ref={canvasRef}></canvas>
		</div>
	);
}

export default Input;
