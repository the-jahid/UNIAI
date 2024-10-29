'use client'

import React, { useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { MotionConfig, motion as motion2D } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface MarketingWheelProps {
  position: [number, number, number]
}

const MarketingWheel = ({ position }: MarketingWheelProps) => {
  const wheelRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z = state.clock.getElapsedTime() * 0.1
    }
  })

  const scale = Math.min(viewport.width, viewport.height) * 0.2

  return (
    <group position={position} ref={wheelRef} scale={[scale, scale, 1]}>
      <mesh>
        <ringGeometry args={[0.8, 1, 64]} />
        <meshStandardMaterial color="#0066cc" opacity={0.7} transparent />
      </mesh>
      {['SEO', 'Blog', 'Brand', 'Ads', 'Strategy', 'Marketing'].map((text, index) => (
        <Text
          key={index}
          position={[
            Math.cos((index / 6) * Math.PI * 2) * 1.2,
            Math.sin((index / 6) * Math.PI * 2) * 1.2,
            0
          ]}
          fontSize={0.2}
          color="#ffffff"
        >
          {text}
        </Text>
      ))}
      <mesh>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Text position={[0, 0, 0.1]} fontSize={0.3} color="#0066cc">
        ⚡
      </Text>
    </group>
  )
}

interface AnimatedTextProps {
  children: React.ReactNode
  position: [number, number, number]
  delay?: number
}

const AnimatedText = ({ children, position, delay = 0 }: AnimatedTextProps) => (
  <motion.group
    initial={{ opacity: 0, y: -1 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    <Text position={position} fontSize={0.5} color="#ffffff">
      {children}
    </Text>
  </motion.group>
)

export default function Marketing() {
  const [hovered, setHovered] = useState(false)

  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <div className="w-full h-screen bg-black text-white overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <AnimatedText position={[-4, 2, 0]} delay={0.2}>
              Marketing
            </AnimatedText>
            <AnimatedText position={[-4, 1, 0]} delay={0.4}>
              The easiest way to
            </AnimatedText>
            <AnimatedText position={[-4, 0, 0]} delay={0.6}>
              drive traffic.
            </AnimatedText>
            <AnimatedText position={[-4, -1, 0]} delay={0.8}>
              Grow your business with built-in SEO,
            </AnimatedText>
            <AnimatedText position={[-4, -2, 0]} delay={1}>
              automated blogging, ad generation,
            </AnimatedText>
            <AnimatedText position={[-4, -3, 0]} delay={1.2}>
              and review management.
            </AnimatedText>

            <MarketingWheel position={[3, 0, 0]} />
          </Canvas>
        </Suspense>

        <motion2D.div
          className="absolute bottom-10 left-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Learn more{' '}
            <motion2D.span
              className="inline-block ml-2"
              animate={{ x: hovered ? 5 : 0 }}
            >
              →
            </motion2D.span>
          </Button>
        </motion2D.div>
      </div>
    </MotionConfig>
  )
}