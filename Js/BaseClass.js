
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import {CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer';

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
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // this.css3dContainer = document.createElement("div");
    // this.css3dContainer.style.position = 'absolute';
    //   // this.css3dContainer.style.width = "50px";
    // // this.css3dContainer.style.height = "50px";
    // this.container.appendChild(this.css3dContainer);
    
    // this.renderer1 = new CSS3DRenderer();
    // this.renderer1.setSize(
    //   this.container.clientWidth,
    //   this.container.clientHeight
    // );
    // this.css3dContainer.appendChild(this.renderer1.domElement);
  

  }

  createControls() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 5, 15);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls1 = new OrbitControls(this.camera,this.renderer1.domElement);
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
    // this.controls1.update();
    this.renderer.render(this.scene, this.camera);
    // this.renderer1.render(this.scene,this.camera);
  }
}

export default BaseScene;