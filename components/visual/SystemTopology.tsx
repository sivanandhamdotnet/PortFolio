"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isReducedMotion } from "@/lib/animations/gsap";

export default function SystemTopology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (isReducedMotion()) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const topologyGroup = new THREE.Group();
    scene.add(topologyGroup);

    // 1. Create distributed backend topology nodes
    const nodeCount = 42;
    const nodes: {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      basePos: THREE.Vector3;
      size: number;
      type: "core" | "satellite" | "worker";
    }[] = [];

    // Core cluster positions (representing DBs, microservices, workers)
    const clusters = [
      new THREE.Vector3(-18, 8, 0),
      new THREE.Vector3(14, -6, 5),
      new THREE.Vector3(-6, -14, -5),
      new THREE.Vector3(20, 14, -8),
      new THREE.Vector3(0, 0, 10),
    ];

    for (let i = 0; i < nodeCount; i++) {
      const cluster = clusters[i % clusters.length];
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 16
      );
      const pos = cluster.clone().add(offset);
      nodes.push({
        position: pos.clone(),
        basePos: pos.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        size: i < 5 ? 1.6 : Math.random() * 0.8 + 0.4,
        type: i < 5 ? "core" : i % 3 === 0 ? "worker" : "satellite",
      });
    }

    // Geometry & Materials for Nodes
    const nodeGeometry = new THREE.SphereGeometry(1, 12, 12);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xc85a32 }); // Clay
    const workerMaterial = new THREE.MeshBasicMaterial({ color: 0xd4f038 }); // Acid Lime
    const satMaterial = new THREE.MeshBasicMaterial({ color: 0x142822 }); // Deep Forest

    const nodeMeshes: THREE.Mesh[] = [];
    nodes.forEach((n) => {
      const mat = n.type === "core" ? coreMaterial : n.type === "worker" ? workerMaterial : satMaterial;
      const mesh = new THREE.Mesh(nodeGeometry, mat);
      mesh.position.copy(n.position);
      mesh.scale.setScalar(n.size);
      topologyGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // 2. Dynamic Connection Lines
    const maxDistance = 22;
    const linePositions = new Float32Array(nodeCount * nodeCount * 6);
    const lineColors = new Float32Array(nodeCount * nodeCount * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    topologyGroup.add(lineSegments);

    // 3. Data Packets (flowing along connections)
    const packetCount = 18;
    const packetGeometry = new THREE.SphereGeometry(0.35, 8, 8);
    const packetMaterial = new THREE.MeshBasicMaterial({ color: 0xd4f038 }); // Acid lime pulses
    const packets: {
      mesh: THREE.Mesh;
      from: number;
      to: number;
      progress: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < packetCount; i++) {
      const from = Math.floor(Math.random() * nodeCount);
      let to = Math.floor(Math.random() * nodeCount);
      while (to === from) to = Math.floor(Math.random() * nodeCount);

      const pMesh = new THREE.Mesh(packetGeometry, packetMaterial);
      topologyGroup.add(pMesh);
      packets.push({
        mesh: pMesh,
        from,
        to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      });
    }

    // Pointer Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      targetX = ((clientX / width) * 2 - 1) * 0.4;
      targetY = (-(clientY / height) * 2 + 1) * 0.4;
    };

    window.addEventListener("mousemove", onPointerMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer parallax
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      topologyGroup.rotation.y = currentX * 0.7 + elapsedTime * 0.03;
      topologyGroup.rotation.x = -currentY * 0.5 + Math.sin(elapsedTime * 0.2) * 0.02;

      // Update Node positions (subtle organic drift around base positions)
      nodes.forEach((node, i) => {
        node.position.x = node.basePos.x + Math.sin(elapsedTime * 0.7 + i) * 1.5;
        node.position.y = node.basePos.y + Math.cos(elapsedTime * 0.5 + i * 1.3) * 1.5;
        node.position.z = node.basePos.z + Math.sin(elapsedTime * 0.3 + i * 0.8) * 1.2;
        nodeMeshes[i].position.copy(node.position);
      });

      // Update Connection Lines
      let vertexIndex = 0;
      let colorIndex = 0;
      const positions = lineGeometry.attributes.position.array as Float32Array;
      const colors = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < maxDistance) {
            positions[vertexIndex++] = nodes[i].position.x;
            positions[vertexIndex++] = nodes[i].position.y;
            positions[vertexIndex++] = nodes[i].position.z;

            positions[vertexIndex++] = nodes[j].position.x;
            positions[vertexIndex++] = nodes[j].position.y;
            positions[vertexIndex++] = nodes[j].position.z;

            // Fade lines based on proximity
            const alpha = 1 - dist / maxDistance;
            // Warm clay or deep forest ink tint
            const isClay = nodes[i].type === "core" || nodes[j].type === "core";
            const r = isClay ? 0.78 * alpha : 0.07 * alpha;
            const g = isClay ? 0.35 * alpha : 0.15 * alpha;
            const b = isClay ? 0.20 * alpha : 0.12 * alpha;

            colors[colorIndex++] = r;
            colors[colorIndex++] = g;
            colors[colorIndex++] = b;

            colors[colorIndex++] = r;
            colors[colorIndex++] = g;
            colors[colorIndex++] = b;
          }
        }
      }

      lineGeometry.setDrawRange(0, vertexIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Update Data Packets
      packets.forEach((packet) => {
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.from = Math.floor(Math.random() * nodeCount);
          packet.to = Math.floor(Math.random() * nodeCount);
          while (packet.to === packet.from) {
            packet.to = Math.floor(Math.random() * nodeCount);
          }
        }

        const p1 = nodes[packet.from].position;
        const p2 = nodes[packet.to].position;
        packet.mesh.position.lerpVectors(p1, p2, packet.progress);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nodeGeometry.dispose();
      coreMaterial.dispose();
      workerMaterial.dispose();
      satMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none opacity-40 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
