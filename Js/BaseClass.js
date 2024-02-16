import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class BaseScene {
  constructor() {
    this.container = document.querySelector('#scene-container');

    this.createScene();
    this.createRenderer();
    this.createControls();
    this.addEventListeners();
    this.render();
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
  }

  createControls() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 5, 15);
    this.controls = new OrbitControls(this.camera, this.container);
  }

  addEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default BaseScene;
