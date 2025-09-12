<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  EXTRUDE_SETTINGS,
  CONFIGURATIONS,
  CONFIG_ORDER,
  LIFT_HEIGHT,
  PAUSE_DURATION,
  LIFT_DURATION,
  PLACE_DURATION,
} from './TamgramConfig';

const canvasRef = ref(null);

let scene, camera, renderer, controls;
let shapeMeshes = {};
let animationFrameId, timeoutId;
let currentConfigIndex = 0;

// Definir onWindowResize en el scope superior para evitar problemas de referencia
function onWindowResize() {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

onMounted(() => {
  if (!canvasRef.value) return;

  let SHAPES_DEFS = [];

  const initShapes = () => {
    const style = getComputedStyle(document.documentElement);
    SHAPES_DEFS = [
      { id: 'largeBlue', color: style.getPropertyValue('--color-primary').trim(), points: [[-100, -50], [0, 50], [100, -50]] },
      { id: 'largePink', color: style.getPropertyValue('--color-secondary').trim(), points: [[100, -50], [0, 50], [-100, -50]] },
      { id: 'mediumPurple', color: style.getPropertyValue('--color-tertiary').trim(), points: [[-50, -50], [50, -50], [50, 50]] },
      { id: 'squareGreen', color: style.getPropertyValue('--color-quaternary').trim(), points: [[-50, 0], [0, -50], [50, 0], [0, 50]] },
      { id: 'parallelogramOrange', color: style.getPropertyValue('--color-quinary').trim(), points: [[-75, 25], [25, 25], [75, -25], [-25, -25]] },
      { id: 'smallTurquoise1', color: style.getPropertyValue('--color-primary').trim(), points: [[0, -25], [50, 25], [-50, 25]] },
      { id: 'smallRed', color: style.getPropertyValue('--color-secondary').trim(), points: [[0, -25], [50, 25], [-50, 25]] },
    ];
  };

  const initThreeJS = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 400);
    camera.up.set(0, -1, 0);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 200;
    controls.maxDistance = 600;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(-150, 150, 300);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -300;
    directionalLight.shadow.camera.right = 300;
    directionalLight.shadow.camera.top = 300;
    directionalLight.shadow.camera.bottom = -300;
    scene.add(directionalLight);

    const groundPlane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.ShadowMaterial({ opacity: 0.25 }));
    groundPlane.receiveShadow = true;
    groundPlane.position.z = -11;
    scene.add(groundPlane);

    window.addEventListener('resize', onWindowResize);
  };

  const createShapes = () => {
    SHAPES_DEFS.forEach((def) => {
      const shape = new THREE.Shape();
      shape.moveTo(def.points[0][0], def.points[0][1]);
      for (let i = 1; i < def.points.length; i++) {
        shape.lineTo(def.points[i][0], def.points[i][1]);
      }
      shape.lineTo(def.points[0][0], def.points[0][1]);

      const geometry = new THREE.ExtrudeGeometry(shape, EXTRUDE_SETTINGS);
      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: def.color,
        metalness: 0.3,
        roughness: 0.6,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      scene.add(mesh);
      shapeMeshes[def.id] = mesh;
    });
  };

  const initializeShapes = () => {
    const initialConfig = CONFIGURATIONS[CONFIG_ORDER[0]];
    Object.keys(shapeMeshes).forEach((id) => {
      const target = initialConfig[id] || { opacity: 0 };
      const mesh = shapeMeshes[id];

      mesh.position.set(target.x || 0, target.y || 0, 0);
      mesh.rotation.z = THREE.MathUtils.degToRad(target.angle || 0);
      mesh.material.opacity = target.opacity ?? 1;
      mesh.scale.x = target.scaleX || 1;
    });

    timeoutId = setTimeout(startNextTransition, PAUSE_DURATION);
  };

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

  const animateTask = (duration, updateCallback, onCompleteCallback) => {
    const startTime = performance.now();
    const tick = () => {
      const elapsedTime = performance.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      updateCallback(ease(progress));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        onCompleteCallback?.();
      }
    };
    tick();
  };

  const placePiecesSequentially = (tasks) => {
    let currentPieceIndex = 0;
    const placeNextPiece = () => {
      if (currentPieceIndex >= tasks.length) {
        currentConfigIndex = (currentConfigIndex + 1) % CONFIG_ORDER.length;
        timeoutId = setTimeout(startNextTransition, PAUSE_DURATION);
        return;
      }

      const task = tasks[currentPieceIndex];
      const { mesh, fromState, toState } = task;

      animateTask(
        PLACE_DURATION,
        (progress) => {
          mesh.position.x = THREE.MathUtils.lerp(fromState.x, toState.x, progress);
          mesh.position.y = THREE.MathUtils.lerp(fromState.y, toState.y, progress);
          mesh.position.z = (1 - progress) * LIFT_HEIGHT;

          mesh.material.opacity = THREE.MathUtils.lerp(fromState.opacity ?? 1, toState.opacity ?? 1, progress);
          mesh.scale.x = THREE.MathUtils.lerp(fromState.scaleX || 1, toState.scaleX || 1, progress);

          let angleDiff = (toState.angle || 0) - (fromState.angle || 0);
          if (angleDiff > 180) angleDiff -= 360;
          if (angleDiff < -180) angleDiff += 360;
          const currentAngle = (fromState.angle || 0) + angleDiff * progress;
          mesh.rotation.z = THREE.MathUtils.degToRad(currentAngle);
        },
        () => {
          currentPieceIndex++;
          placeNextPiece();
        }
      );
    };
    placeNextPiece();
  };

  const startNextTransition = () => {
    const fromConfig = CONFIGURATIONS[CONFIG_ORDER[currentConfigIndex]];
    const toConfig = CONFIGURATIONS[CONFIG_ORDER[(currentConfigIndex + 1) % CONFIG_ORDER.length]];
    const movingTasks = [];

    SHAPES_DEFS.forEach((def) => {
      const mesh = shapeMeshes[def.id];
      const fromState = fromConfig[def.id] || { opacity: 0, x: mesh.position.x, y: mesh.position.y, angle: THREE.MathUtils.radToDeg(mesh.rotation.z), scaleX: mesh.scale.x };
      const toState = toConfig[def.id] || { ...fromState, opacity: 0 };

      const needsToMove = Math.abs((fromState.x ?? 0) - (toState.x ?? 0)) > 0.1 ||
        Math.abs((fromState.y ?? 0) - (toState.y ?? 0)) > 0.1 ||
        Math.abs((fromState.angle || 0) - (toState.angle || 0)) > 0.1 ||
        Math.abs((fromState.opacity ?? 1) - (toState.opacity ?? 1)) > 0.1 ||
        Math.abs((fromState.scaleX || 1) - (toState.scaleX || 1)) > 0.1;

      if (needsToMove) {
        movingTasks.push({ mesh, fromState, toState });
      }
    });

    if (movingTasks.length === 0) {
      currentConfigIndex = (currentConfigIndex + 1) % CONFIG_ORDER.length;
      timeoutId = setTimeout(startNextTransition, PAUSE_DURATION);
      return;
    }

    let liftCounter = movingTasks.length;
    movingTasks.forEach((task) => {
      animateTask(
        LIFT_DURATION,
        (progress) => { task.mesh.position.z = progress * LIFT_HEIGHT; },
        () => {
          liftCounter--;
          if (liftCounter === 0) {
            placePiecesSequentially(movingTasks);
          }
        }
      );
    });
  };

  // ...existing code...

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls?.update();
    if (scene && camera && renderer) {
      renderer.render(scene, camera);
    }
  };

  initShapes();
  initThreeJS();
  createShapes();
  initializeShapes();
  animate();
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (timeoutId) clearTimeout(timeoutId);
  window.removeEventListener('resize', onWindowResize);

  renderer?.dispose();
  Object.values(shapeMeshes).forEach((mesh) => {
    mesh.geometry.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((mat) => mat.dispose());
    } else {
      mesh.material.dispose();
    }
  });
  controls?.dispose();
});
</script>

<template>
  <div class="m-0 overflow-hidden font-primary">
    <canvas class="block" ref="canvasRef" />
  </div>
</template>
