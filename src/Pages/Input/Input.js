import { useEffect, useState, useRef } from "react";
import style from "./Input.module.css";
import skmeans from "skmeans";
import ga from "../../GA/ga";
import { fitness } from "./gaHelper";
function getRandomColor() {
	return Math.floor(Math.random() * 256);
}

function createCluster(i, clusters = []) {
	clusters.push({ center: { r: getRandomColor(), g: getRandomColor(), b: getRandomColor() }, targets: [] });
	if (--i > 0) {
		return createCluster(i, clusters);
	}
	return clusters;
}

function getColorSpace(canvas, clusterCount = 2) {
	const ctx = canvas.getContext("2d");
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
	let rgbArray = [];
	[...imageData]
		.map((x, id) => (id % 4 === 3 ? null : x))
		.filter((x) => x)
		.forEach((x, id) => {
			let cell = rgbArray[Math.floor(id / 3)];
			if (!cell) {
				rgbArray[Math.floor(id / 3)] = [];
			}
			rgbArray[Math.floor(id / 3)].push(x);
		});

	const clusters = createCluster(clusterCount);
	ga({
		populationCount: 8,
		chromosomeLength: 8 * 3 * clusterCount,
		fitness,
		validateFn: (x) => {
			console.log(x);
		},
	});
	// let r = new Uint8ClampedArray(canvas.width * canvas.height),
	// 	g = new Uint8ClampedArray(canvas.width * canvas.height),
	// 	b = new Uint8ClampedArray(canvas.width * canvas.height);

	// let j = 0;

	// for (let i = 0; i < imageData.length; i += 4) {
	// 	r[j] = imageData[i];
	// 	g[j] = imageData[i + 1];
	// 	b[j] = imageData[i + 2];
	// 	j++;
	// }

	// let wr = new Array(256).fill(0),
	// 	wg = new Array(256).fill(0),
	// 	wb = new Array(256).fill(0);
	// r.forEach((color) => {
	// 	wr[color]++;
	// });
	// g.forEach((color) => {
	// 	wg[color]++;
	// });
	// b.forEach((color) => {
	// 	wb[color]++;
	// });

	// const raw = [...r].map((_r, id) => {
	// 	return [parseInt(_r), parseInt(g[id]), parseInt(b[id])];
	// });

	// var res = skmeans(raw, 4);
	// let arr = [];
	// res.idxs.forEach((x) => {
	// 	arr.push(res.centroids[x][0]);
	// 	arr.push(res.centroids[x][1]);
	// 	arr.push(res.centroids[x][2]);
	// 	arr.push(255);
	// });
	// let quantizedImageDataArray = new Uint8ClampedArray(arr);

	// const quantizedImageData = new ImageData(quantizedImageDataArray, canvas.width, canvas.height);

	// return quantizedImageData;
}

function Input() {
	const canvasRef = useRef(null);
	const analyzeCanvasRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState("");

	function onFileSelected(e) {
		setSelectedFile(e.target.files[0]);
		if (e.target.files[0]) {
			console.log(e.target.files[0]);
			const img = new Image();
			img.onload = () => {
				canvasRef.current.width = img.width;
				canvasRef.current.height = img.height;

				analyzeCanvasRef.current.width = img.width;
				analyzeCanvasRef.current.height = img.height;

				console.log(img.width, img.height);

				canvasRef.current.getContext("2d").drawImage(img, 0, 0);
				// analyzeCanvasRef.current.getContext("2d").putImageData(getColorSpace(canvasRef.current), 0, 0);
				getColorSpace(canvasRef.current);
			};

			img.src = URL.createObjectURL(e.target.files[0]);
		}
	}

	return (
		<div className={style.outerContainer}>
			<input type="file" onChange={onFileSelected}></input>
			<canvas width={512} height={512} ref={canvasRef} className={style.canvas}></canvas>
			<canvas width={512} height={512} ref={analyzeCanvasRef} className={style.canvas}></canvas>
		</div>
	);
}

export default Input;
