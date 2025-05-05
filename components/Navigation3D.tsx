'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

interface Section {
  id: string;
  component: React.ReactNode;
}

interface Navigation3DProps {
  sections: Section[];
  mousePosition: { x: number; y: number };
}

export const Navigation3D: React.FC<Navigation3DProps> = ({ sections, mousePosition }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<CSS3DRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const nodesRef = useRef<CSS3DObject[]>([]);
  
  // État pour garder une trace de la section active
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  
  // Initialiser la scène 3D
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Créer la scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Créer la caméra
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.z = 1500;
    cameraRef.current = camera;
    
    // Créer le renderer CSS3D
    const renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Ajouter des contrôles pour la navigation
    
    // Ajouter des contrôles pour la navigation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 3000;
    controlsRef.current = controls;
    
    // Fonction pour gérer le redimensionnement
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controls) {
        controls.update();
      }
      
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    
    return () => {
      if (renderer && container) {
        container.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Créer les nœuds 3D pour chaque section
  useEffect(() => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    const nodes: CSS3DObject[] = [];
    
    // Disposer les sections en cercle ou en sphère
    const radius = 1000;
    const sectionAngle = (2 * Math.PI) / sections.length;
    
    sections.forEach((section, index) => {
      // Créer un conteneur pour la section
      const element = document.createElement('div');
      element.className = 'section-3d-container';
      element.style.width = '600px';
      element.style.height = '800px';
      element.style.backgroundColor = 'rgba(20, 20, 30, 0.8)';
      element.style.borderRadius = '10px';
      element.style.padding = '20px';
      element.style.overflow = 'auto';
      element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      
      // Utiliser React pour rendre le composant à l'intérieur du div
      const root = document.createElement('div');
      root.id = `section-3d-${section.id}`;
      element.appendChild(root);
      
      // Créer l'objet 3D CSS
      const object = new CSS3DObject(element);
      
      // Positionner l'objet en cercle
      const angle = sectionAngle * index;
      object.position.x = radius * Math.cos(angle);
      object.position.y = 0;
      object.position.z = radius * Math.sin(angle);
      
      // Faire face au centre
      object.lookAt(scene.position);
      
      // Ajouter à la scène
      scene.add(object);
      nodes.push(object);
      
      // Rendre le composant React dans le conteneur
      const reactElement = React.createElement(
        'div',
        { className: 'section-content' },
        section.component
      );
      
      // Utiliser un setTimeout pour s'assurer que l'élément est ajouté au DOM
      setTimeout(() => {
        const container = document.getElementById(`section-3d-${section.id}`);
        if (container) {
          const root = createRoot(container);
          root.render(reactElement);
        }
      }, 0);
    });
    
    nodesRef.current = nodes;
    
    return () => {
      // Nettoyer la scène
      nodes.forEach(node => {
        scene.remove(node);
      });
    };
  }, [sections]);
  
  // Navigation entre les sections
  const navigateToSection = (sectionId: string) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (sectionIndex === -1 || !cameraRef.current || !controlsRef.current) return;
    
    setActiveSection(sectionId);
    
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const nodes = nodesRef.current;
    
    if (nodes[sectionIndex]) {
      const targetNode = nodes[sectionIndex];
      const targetPosition = new THREE.Vector3()
        .copy(targetNode.position)
        .normalize()
        .multiplyScalar(camera.position.length());
      
      // Animation pour se déplacer vers la section
      const startPosition = camera.position.clone();
      const animationDuration = 1000; // 1 seconde
      const startTime = Date.now();
      
      const animateCamera = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Fonction d'easing pour une animation fluide
        const easeInOutCubic = (t: number) => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const easedProgress = easeInOutCubic(progress);
        
        camera.position.lerpVectors(
          startPosition,
          targetPosition,
          easedProgress
        );
        
        // Regarder la section
        camera.lookAt(targetNode.position);
        
        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        } else {
          // Animation terminée, mise à jour des contrôles
          controls.target.copy(targetNode.position);
          controls.update();
        }
      };
      
      animateCamera();
    }
  };
  
  // Effets lorsque la position de la souris change
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return;
    
    // Ajouter un léger effet de mouvement basé sur la position de la souris
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    
    // Ajuster légèrement la rotation de la caméra basée sur la position de la souris
    const rotationX = mousePosition.y * 0.05;
    const rotationY = mousePosition.x * 0.05;
    
    camera.rotation.x += (rotationX - camera.rotation.x) * 0.05;
    camera.rotation.y += (rotationY - camera.rotation.y) * 0.05;
    
  }, [mousePosition]);
  
  return (
    <div className="navigation-3d-container" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Navigation UI */}
      <div className="navigation-controls" style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '30px',
        zIndex: 100
      }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => navigateToSection(section.id)}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: activeSection === section.id ? '#4a90e2' : 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Instructions */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        borderRadius: '5px',
        zIndex: 100
      }}>
        <p>Cliquez et faites glisser pour faire pivoter</p>
        <p>Molette de la souris pour zoomer</p>
      </div>
    </div>
  );
};