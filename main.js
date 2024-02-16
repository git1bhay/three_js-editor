import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

import { TransformControls } from "three/examples/jsm/controls/TransformControls";



import { Text } from "troika-three-text";

const container = document.querySelector("#scene-container");
const positionElement = document.getElementById("position");
const rotationElement = document.getElementById("rotation");
const scaleElement = document.getElementById("scale");

let transformControls, object, box, cube, imgplane,text,texture;
let objectsToIntersect = [];
function displayValues(transformControls) {
  const objectPosition = transformControls;
  // console.log(objectPosition.position);
  positionElement.innerText = `${objectPosition.position.x.toFixed(2)},
     ${objectPosition.position.y.toFixed(2)},
      ${objectPosition.position.z.toFixed(2)}`;

  rotationElement.innerText = `${objectPosition.rotation.x.toFixed(2)},
      ${objectPosition.rotation.y.toFixed(2)},
       ${objectPosition.rotation.z.toFixed(2)}`;

  scaleElement.innerText = `${objectPosition.scale.x.toFixed(2)},
       ${objectPosition.scale.y.toFixed(2)},
        ${objectPosition.scale.z.toFixed(2)}`;
}
function createTransformaControls(sceneData, orbitControls, object) {
  // if(object.name==='plane'){
  console.log(object);

  // objectsToIntersect.push(object);
  console.log(objectsToIntersect);
  // }
  transformControls = new TransformControls(sceneData.camera, container);
  sceneData.scene.add(transformControls);
  console.log(transformControls);

  transformControls.addEventListener("dragging-changed", (e) => {
    // console.log(orbitControls.enabled);

    orbitControls.enabled = !e.value;
  });
  transformControls.addEventListener("change", () => {
    // console.log(transformControls);
    displayValues(transformControls.object);
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
  // displayValues(transformControls.object);

  return transformControls;
}
function createcube(sceneData, orbitControls) {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  cube = new THREE.Mesh(geometry, material);

  
  sceneData.scene.add(cube);

  objectsToIntersect.push(cube);
  const transformCon1 = createTransformaControls(
    sceneData,
    orbitControls,
    cube
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
  imgplane = new THREE.Mesh(geometry, material);
  

  sceneData.scene.add(imgplane);
  const transformCon = createTransformaControls(
    sceneData,
    orbitControls,
    imgplane
  );
  objectsToIntersect.push(imgplane);

  
}
function addtext(sceneData, orbitControls) {


  const input = document.getElementById('myInput');

  
  // Initial text setup

  // Function to update the text on the canvas and adjust the plane size
  

  
  let text1 = new Text()
  // text1.font = 'path/to/font.woff'
  function updateText() {
    const textValue = input.value;

    text1.text = textValue;

    text1.fontSize = 0.2
    text1.color = 0x9966FF

    text1.sync()

  }
  // console.log(text);
  
  
  // myScene.add(text)
  text = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          color: "black"
        })
      );
  // text.add(text1);
  sceneData.scene.add(text1);
  updateText();

  const transformCon = createTransformaControls(
    sceneData,
    orbitControls,
    text1
  );
  objectsToIntersect.push(text);
  

  // Event listener for text input changes
  input.addEventListener('input', updateText);
}



function createVideo(sceneData, orbitControls) {
  const video = document.createElement('video');
  video.src = "Cannon.js Tutorial For Beginners - Add Gravity, Collision, And Other Physics Laws To Your 3D Web App.mp4"; // Replace with the path to your video file
  video.loop = true;
  video.crossOrigin = "anonymous";
  video.play(); 

  const videoTexture = new THREE.VideoTexture(video);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide,
    transparent:true,
    opacity: 0.9
   });
  const videoplane = new THREE.Mesh(geometry, material);

  sceneData.scene.add(videoplane);
  const transformCon = createTransformaControls(sceneData, orbitControls, videoplane);
  objectsToIntersect.push(videoplane);
}

let selected = null;
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
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener("click", (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x =
      ((event.clientX - rect.left) / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y =
      -((event.clientY - rect.top) / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Get the list of objects the ray intersects
    const intersects = raycaster.intersectObjects(objectsToIntersect);
    console.log("hi1", objectsToIntersect);
    console.log("hi", intersects);
    
    if (intersects.length > 0) {
      selected = true;
      console.log(selected, intersects);
      transformControls.visible = true;
    } else {
      selected = false;
      console.log(selected, intersects);
      transformControls.visible = false;
    }
  });
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


// function textContent(){
//   const cssRenderer = new CSS3DRenderer();

// }
// textContent();
function animate() {
  requestAnimationFrame(animate);
  initialControls.update();
  renderer.render(currentSceneData.scene, currentSceneData.camera);
}
animate();

function intialvalue() {
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
intialvalue();



document.querySelector("#new-scene-button").addEventListener("click", () => {
  currentSceneData = createNewScene();
  intialvalue();
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

document.querySelector("#add-text-button").addEventListener("click", () => {
  if (currentSceneData) {
    addtext(currentSceneData, currentSceneData.controls);

    renderer.render(currentSceneData.scene, currentSceneData.camera);
    initialControls.update();
  }
});
document.querySelector("#add-video-button").addEventListener("click", () => {
  if (currentSceneData) {
    createVideo(currentSceneData, currentSceneData.controls);
    renderer.render(currentSceneData.scene, currentSceneData.camera);
    initialControls.update();
  }
});

window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  renderer.setSize(width, height);
  currentSceneData.camera.aspect = width / height;
  currentSceneData.camera.updateProjectionMatrix();
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
