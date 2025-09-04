import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
    EXTRUDE_SETTINGS,
    CONFIGURATIONS,
    CONFIG_ORDER,
    LIFT_HEIGHT,
    PAUSE_DURATION,
    LIFT_DURATION,
    PLACE_DURATION,
    ConfigurationName,
    Configuration,
    PieceConfig
} from '../Loader/TamgramConfig';

// Define el tipo para las definiciones de las formas
interface ShapeDef {
    id: string;
    color: string;
    points: number[][];
}

const Tangram3d: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Usamos `useRef` para mantener las instancias de Three.js entre renderizados
    // sin provocar nuevos renders al actualizarlas.
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const controlsRef = useRef<OrbitControls>();
    const shapeMeshesRef = useRef<Record<string, THREE.Mesh>>({});
    const animationFrameIdRef = useRef<number>();
    const currentConfigIndexRef = useRef(0);
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        // --- Variables y Lógica de Inicialización ---
        if (!canvasRef.current) return;

        let SHAPES_DEFS: ShapeDef[] = [];

        // Esta función es similar a `initShapes` en Angular
        const initShapes = () => {
            const style = getComputedStyle(document.documentElement);
            SHAPES_DEFS = [
                { id: 'largeBlue', color: style.getPropertyValue('--color-primary').trim(), points: [[-100, -50], [0, 50], [100, -50]] },
                { id: 'largePink', color: style.getPropertyValue('--color-secondary').trim(), points: [[100, -50], [0, 50], [-100, -50]] },
                { id: 'mediumPurple', color: style.getPropertyValue('--color-tertiary').trim(), points: [[-50, -50], [50, -50], [50, 50]] },
                { id: 'squareGreen', color: style.getPropertyValue('--color-quaternary').trim(), points: [[-50, 0], [0, -50], [50, 0], [0, 50]] },
                { id: 'parallelogramOrange', color: style.getPropertyValue('--color-quinary').trim(), points: [[-75, 25], [25, 25], [75, -25], [-25, -25]] },
                { id: 'smallTurquoise1', color: style.getPropertyValue('--color-primary').trim(), points: [[0, -25], [50, 25], [-50, 25]] },
                { id: 'smallRed', color: style.getPropertyValue('--color-secondary').trim(), points: [[0, -25], [50, 25], [-50, 25]] }
            ];
        };

        const initThreeJS = () => {
            sceneRef.current = new THREE.Scene();
            sceneRef.current.background = new THREE.Color(0x2a2a2a);

            cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            cameraRef.current.position.set(0, 0, 400);
            cameraRef.current.up.set(0, -1, 0);
            cameraRef.current.lookAt(0, 0, 0);

            rendererRef.current = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true });
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            rendererRef.current.setPixelRatio(window.devicePixelRatio);
            rendererRef.current.shadowMap.enabled = true;
            rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;

            controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
            controlsRef.current.enableDamping = true;
            controlsRef.current.dampingFactor = 0.05;
            controlsRef.current.minDistance = 200;
            controlsRef.current.maxDistance = 600;

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            sceneRef.current.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
            directionalLight.position.set(-150, 150, 300);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            directionalLight.shadow.camera.left = -300;
            directionalLight.shadow.camera.right = 300;
            directionalLight.shadow.camera.top = 300;
            directionalLight.shadow.camera.bottom = -300;
            sceneRef.current.add(directionalLight);

            const groundPlane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.ShadowMaterial({ opacity: 0.25 }));
            groundPlane.receiveShadow = true;
            groundPlane.position.z = -11;
            sceneRef.current.add(groundPlane);

            window.addEventListener('resize', onWindowResize);
        };

        const createShapes = () => {
            SHAPES_DEFS.forEach(def => {
                const shape = new THREE.Shape();
                shape.moveTo(def.points[0][0], def.points[0][1]);
                for (let i = 1; i < def.points.length; i++) {
                    shape.lineTo(def.points[i][0], def.points[i][1]);
                }
                shape.lineTo(def.points[0][0], def.points[0][1]);

                const geometry = new THREE.ExtrudeGeometry(shape, EXTRUDE_SETTINGS);
                geometry.center();

                const material = new THREE.MeshStandardMaterial({
                    color: def.color, metalness: 0.3, roughness: 0.6, transparent: true
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                sceneRef.current?.add(mesh);
                shapeMeshesRef.current[def.id] = mesh;
            });
        };

        const initializeShapes = () => {
            const initialConfig = CONFIGURATIONS[CONFIG_ORDER[0]];
            Object.keys(shapeMeshesRef.current).forEach(id => {
                const target: PieceConfig = initialConfig[id] || { opacity: 0 };
                const mesh = shapeMeshesRef.current[id];

                mesh.position.set(target.x || 0, target.y || 0, 0);
                mesh.rotation.z = THREE.MathUtils.degToRad(target.angle || 0);
                (mesh.material as THREE.MeshStandardMaterial).opacity = target.opacity ?? 1;
                mesh.scale.x = target.scaleX || 1;
            });

            timeoutIdRef.current = setTimeout(startNextTransition, PAUSE_DURATION);
        };

        const ease = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animateTask = (
            duration: number,
            updateCallback: (progress: number) => void,
            onCompleteCallback?: () => void
        ) => {
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

        const placePiecesSequentially = (tasks: any[]) => {
            let currentPieceIndex = 0;
            const placeNextPiece = () => {
                if (currentPieceIndex >= tasks.length) {
                    currentConfigIndexRef.current = (currentConfigIndexRef.current + 1) % CONFIG_ORDER.length;
                    timeoutIdRef.current = setTimeout(startNextTransition, PAUSE_DURATION);
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
            const fromConfig = CONFIGURATIONS[CONFIG_ORDER[currentConfigIndexRef.current]];
            const toConfig = CONFIGURATIONS[CONFIG_ORDER[(currentConfigIndexRef.current + 1) % CONFIG_ORDER.length]];
            const movingTasks: any[] = [];

            SHAPES_DEFS.forEach(def => {
                const mesh = shapeMeshesRef.current[def.id];
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
                currentConfigIndexRef.current = (currentConfigIndexRef.current + 1) % CONFIG_ORDER.length;
                timeoutIdRef.current = setTimeout(startNextTransition, PAUSE_DURATION);
                return;
            }

            let liftCounter = movingTasks.length;
            movingTasks.forEach(task => {
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

        const onWindowResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };

        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);
            controlsRef.current?.update();
            if (sceneRef.current && cameraRef.current && rendererRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        // --- Secuencia de Ejecución ---
        initShapes();
        initThreeJS();
        createShapes();
        initializeShapes();
        animate();

        // --- Función de Limpieza (Cleanup) ---
        // Se ejecuta cuando el componente se desmonta, equivalente a `ngOnDestroy`
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
            window.removeEventListener('resize', onWindowResize);

            // Limpiar recursos de Three.js
            rendererRef.current?.dispose();
            Object.values(shapeMeshesRef.current).forEach(mesh => {
                mesh.geometry.dispose();
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach(mat => mat.dispose());
                } else {
                    mesh.material.dispose();
                }
            });
            controlsRef.current?.dispose();
        };

    }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez (al montar)

    return (
        <div className="m-0 overflow-hidden font-primary">
            <canvas className="block" ref={canvasRef} />
        </div>
    );
};

export default Tangram3d;