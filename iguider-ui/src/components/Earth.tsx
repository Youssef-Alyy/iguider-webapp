import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from './Loader'
import { useState } from 'react'

const Earth = () => {
	const earth = useGLTF('/planet/scene.gltf')

	return (
		<primitive object={earth.scene} scale={1.5} position-y={0} rotation-y={0} />
	)
}

interface EarthCanvasProps {
	styles?: React.CSSProperties | undefined
}

const EarthCanvas: React.FC<EarthCanvasProps> = ({ styles }) => {
	return (
		<Canvas
			shadows
			frameloop='demand'
			dpr={[1, 2]}
			gl={{ preserveDrawingBuffer: true }}
			style={styles}
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [-4, 3, 6],
			}}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					autoRotate
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Earth />

				<Preload all />
			</Suspense>
		</Canvas>
	)
}

export default EarthCanvas
