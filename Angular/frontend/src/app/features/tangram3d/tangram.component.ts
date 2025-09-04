import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from "@angular/core";
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
} from './tangram3d-config';

@Component({
    selector: 'tangram3d',
    template: `
        <div class="m-0 overflow-hidden font-primary">
            <canvas class="block" #tangramCanvas></canvas>
        </div>
    `
})
export class Tangram3dComponent implements AfterViewInit, OnDestroy {
    @ViewChild('tangramCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
    private SHAPES_DEFS: { id: string, color: string, points: number[][] }[] = [];
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private controls!: OrbitControls;
    private shapeMeshes: Record<string, THREE.Mesh> = {};
    private animationFrameId!: number;

    private currentConfigIndex = 0;
    private configs: Record<ConfigurationName, Configuration> = CONFIGURATIONS;
    private configOrder: ConfigurationName[] = CONFIG_ORDER;



    ngAfterViewInit(): void {
        this.initShapes();
        this.initThreeJS();
        this.createShapes();
        this.initializeShapes();
        this.animate();
    }

    initShapes(): void {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim();
        const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-tertiary').trim();
        const quaternaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-quaternary').trim();
        const quinaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-quinary').trim();
        this.SHAPES_DEFS = [
          { id: 'largeBlue', color: primaryColor , points: [[-100, -50], [0, 50], [100, -50]] },
          { id: 'largePink', color: secondaryColor, points: [[100, -50], [0, 50], [-100, -50]] },
          { id: 'mediumPurple', color: tertiaryColor, points: [[-50, -50], [50, -50], [50, 50]] },
          { id: 'squareGreen', color: quaternaryColor, points: [[-50, 0], [0, -50], [50, 0], [0, 50]] },
          { id: 'parallelogramOrange', color: quinaryColor, points: [[-75, 25], [25, 25], [75, -25], [-25, -25]] },
          { id: 'smallTurquoise1', color: primaryColor, points: [[0, -25], [50, 25], [-50, 25]] },
          { id: 'smallRed', color: secondaryColor, points: [[0, -25], [50, 25], [-50, 25]] }
        ]
    }
    ngOnDestroy(): void {
        cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener('resize', this.onWindowResize);

        // Limpiar recursos de Three.js
        if (this.renderer) {
            this.renderer.dispose();
        }

        // Limpiar geometrías y materiales
        Object.values(this.shapeMeshes).forEach(mesh => {
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material && Array.isArray(mesh.material)) {
                mesh.material.forEach(mat => mat.dispose());
            } else if (mesh.material) {
                (mesh.material as THREE.Material).dispose();
            }
        });
    }

    private initThreeJS(): void {
        // 1. Configurar escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2a2a2a);

        // 2. Configurar cámara
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 400);
        this.camera.up.set(0, -1, 0);
        this.camera.lookAt(0, 0, 0);

        // 3. Configurar renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasRef.nativeElement,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // 4. Controles de órbita
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 200;
        this.controls.maxDistance = 600;

        // 5. Iluminación
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(-150, 150, 300);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.left = -300;
        directionalLight.shadow.camera.right = 300;
        directionalLight.shadow.camera.top = 300;
        directionalLight.shadow.camera.bottom = -300;
        this.scene.add(directionalLight);

        // 6. Plano de sombras
        const groundPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.ShadowMaterial({ opacity: 0.25 })
        );
        groundPlane.receiveShadow = true;
        groundPlane.position.z = -11;
        this.scene.add(groundPlane);

        // 7. Manejar redimensionamiento
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    private createShapes(): void {
        this.SHAPES_DEFS.forEach(def => {
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
                transparent: true
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            this.scene.add(mesh);
            this.shapeMeshes[def.id] = mesh;
        });
    }

    private initializeShapes(): void {
        const initialConfig = this.configs[this.configOrder[0]];

        Object.keys(this.shapeMeshes).forEach(id => {
            const target: PieceConfig = initialConfig[id] || { opacity: 0 };
            const mesh = this.shapeMeshes[id];

            mesh.position.x = target.x || 0;
            mesh.position.y = target.y || 0;
            mesh.position.z = 0;
            mesh.rotation.z = THREE.MathUtils.degToRad(target.angle || 0);
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(mat => {
                    (mat as THREE.Material & { opacity?: number }).opacity = target.opacity !== undefined ? target.opacity : 1;
                });
            } else {
                (mesh.material as THREE.Material & { opacity?: number }).opacity = target.opacity !== undefined ? target.opacity : 1;
            }
            mesh.scale.x = target.scaleX || 1;
        });

        setTimeout(() => this.startNextTransition(), PAUSE_DURATION);
    }

    private startNextTransition(): void {
        const fromConfig: Configuration = this.configs[this.configOrder[this.currentConfigIndex]];
        const toConfig: Configuration = this.configs[this.configOrder[
            (this.currentConfigIndex + 1) % this.configOrder.length
        ]];

        const movingTasks: any[] = [];

        this.SHAPES_DEFS.forEach(def => {
            const mesh = this.shapeMeshes[def.id];
            const fromState = fromConfig[def.id] || {
                opacity: 0,
                x: mesh.position.x,
                y: mesh.position.y,
                angle: THREE.MathUtils.radToDeg(mesh.rotation.z),
                scaleX: mesh.scale.x
            };

            const toState = toConfig[def.id] || {
                ...fromState,
                opacity: 0
            };

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
            this.currentConfigIndex = (this.currentConfigIndex + 1) % this.configOrder.length;
            setTimeout(() => this.startNextTransition(), PAUSE_DURATION);
            return;
        }

        let liftCounter = movingTasks.length;

        movingTasks.forEach(task => {
            this.animateTask(
                LIFT_DURATION,
                (progress) => {
                    task.mesh.position.z = progress * LIFT_HEIGHT;
                },
                () => {
                    liftCounter--;
                    if (liftCounter === 0) {
                        this.placePiecesSequentially(movingTasks);
                    }
                }
            );
        });
    }

    private placePiecesSequentially(tasks: any[]): void {
        let currentPieceIndex = 0;

        const placeNextPiece = () => {
            if (currentPieceIndex >= tasks.length) {
                this.currentConfigIndex = (this.currentConfigIndex + 1) % this.configOrder.length;
                setTimeout(() => this.startNextTransition(), PAUSE_DURATION);
                return;
            }

            const task = tasks[currentPieceIndex];
            const { mesh, fromState, toState } = task;
            const startX = fromState.x;
            const startY = fromState.y;

            this.animateTask(
                PLACE_DURATION,
                (progress) => {
                    mesh.position.x = THREE.MathUtils.lerp(startX, toState.x, progress);
                    mesh.position.y = THREE.MathUtils.lerp(startY, toState.y, progress);
                    mesh.position.z = (1 - progress) * LIFT_HEIGHT;

                    const fromOpacity = fromState.opacity ?? 1;
                    const toOpacity = toState.opacity ?? 1;
                    mesh.material.opacity = THREE.MathUtils.lerp(fromOpacity, toOpacity, progress);

                    mesh.scale.x = THREE.MathUtils.lerp(
                        fromState.scaleX || 1,
                        toState.scaleX || 1,
                        progress
                    );

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
    }

    private animateTask(
        duration: number,
        updateCallback: (progress: number) => void,
        onCompleteCallback?: () => void
    ): void {
        const startTime = performance.now();

        const tick = () => {
            const elapsedTime = performance.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = this.ease(progress);

            updateCallback(easedProgress);

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else if (onCompleteCallback) {
                onCompleteCallback();
            }
        };

        tick();
    }

    private ease(t: number): number {
        return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate(): void {
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}