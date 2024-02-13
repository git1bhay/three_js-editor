import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

import { TransformControls } from "three/examples/jsm/controls/TransformControls";

const container = document.querySelector("#scene-container");
const positionElement = document.getElementById("position");
const rotationElement = document.getElementById("rotation");
const scaleElement = document.getElementById("scale");

function createTransformableObject(
  sceneData,
  orbitControls,
  geometry,
  material
) {
  const object = new THREE.Mesh(geometry, material);

  // if(object.name==='plane'){
  console.log(object);
  sceneData.scene.add(object);
  // }
  const transformControls = new TransformControls(sceneData.camera, container);
  sceneData.scene.add(transformControls);

  transformControls.addEventListener("dragging-changed", (e) => {
    console.log(orbitControls.enabled);

    orbitControls.enabled = !e.value;
    const objectPosition = transformControls.object;
    console.log(objectPosition.position);
    positionElement.innerText = `${objectPosition.position.x.toFixed(2)},
     ${objectPosition.position.y.toFixed(2)},
      ${objectPosition.position.z.toFixed(2)}`;

    rotationElement.innerText = `${objectPosition.rotation.x.toFixed(2)},
      ${objectPosition.rotation.y.toFixed(2)},
       ${objectPosition.rotation.z.toFixed(2)}`;

    scaleElement.innerText = `${objectPosition.scale.x.toFixed(2)},
       ${objectPosition.scale.y.toFixed(2)},
        ${objectPosition.scale.z.toFixed(2)}`;
        
  });

  transformControls.attach(object);

  window.addEventListener("keydown", (event) => {
    if (event.key === "1") {
      transformControls.setMode("translate");
    } else if (event.key === "2") {
      transformControls.setMode("rotate");
    } else if (event.key === "3") {
      transformControls.setMode("scale");
    }
  });

  return transformControls;
}
function createcube(sceneData, orbitControls) {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  // const cube = new THREE.Mesh(geometry, material);
  // sceneData.scene.add(cube);

  const transformCon = createTransformableObject(
    sceneData,
    orbitControls,
    geometry,
    material
  );
}
function createimg(sceneData, orbitControls) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./graycloud_dn.jpg");
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const transformCon = createTransformableObject(
    sceneData,
    orbitControls,
    geometry,
    material
  );
}

function createNewScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("skyblue");
  const fov = 75;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 15);
  const gridhelper = new THREE.GridHelper();
  scene.add(gridhelper);

  const controls = new OrbitControls(camera, container);
  return { scene, camera, controls };
}

let currentSceneData = createNewScene();

const initialScene = currentSceneData.scene;
const initialCamera = currentSceneData.camera;
const initialControls = currentSceneData.controls;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
renderer.render(initialScene, initialCamera);

// const controls = new OrbitControls(currentSceneData.camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  initialControls.update();
  renderer.render(currentSceneData.scene, currentSceneData.camera);
}
animate();

function intialvalue(){
  positionElement.innerText = `${0.0},
     ${0.0},
      ${0.0}`;
rotationElement.innerText = `${0.0},
      ${0.0},
       ${0.0}`;
scaleElement.innerText = `${0.0},
       ${0.0},
        ${0.0}`;
}
intialvalue()



document.querySelector("#new-scene-button").addEventListener("click", () => {
  currentSceneData = createNewScene();
  intialvalue()
  animate();
  initialControls.update();
});

document.querySelector("#add-cube-button").addEventListener("click", () => {
  if (currentSceneData) {
    createcube(currentSceneData, currentSceneData.controls);

    renderer.render(currentSceneData.scene, currentSceneData.camera);
    initialControls.update();
  }
});

document.querySelector("#add-image-button").addEventListener("click", () => {
  if (currentSceneData) {
    createimg(currentSceneData, currentSceneData.controls);

    renderer.render(currentSceneData.scene, currentSceneData.camera);
    initialControls.update();
  }
});

// const link = document.createElement("a");
// link.style.display = "none";
// document.body.appendChild(link); // Firefox workaround, see #6594

// function save(blob, filename) {
//   link.href = URL.createObjectURL(blob);
//   link.download = filename || "data.json";
//   link.click();

//   // URL.revokeObjectURL( url ); breaks Firefox...
// }

// function saveArrayBuffer(buffer, filename) {
//   save(new Blob([buffer], { type: "application/octet-stream" }), filename);
// }

// // createcube(currentSceneData);

// // Render the scene with the cube
// renderer.render(currentSceneData.scene, currentSceneData.camera);

// const exportGlbButton = document.createElement("button");
// exportGlbButton.textContent = "Export GLB";
// document.querySelector("#ui-container").appendChild(exportGlbButton);

// exportGlbButton.addEventListener("click", () => {
//   // await loadTextures(currentSceneData.scene);

//   var exporter = new GLTFExporter();

//   exporter.parse(
//     currentSceneData,
//     function (result) {
//       saveArrayBuffer(result, "scene.glb");
//     },
//     { binary: true }
//   );
// });
