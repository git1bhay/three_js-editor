

import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import BaseScene from "./Js/BaseClass";
// import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import AddText from "./Js/textClass";

import { Text } from "troika-three-text";

let base = new BaseScene();
let scene = base.scene;
let camera = base.camera;
let controlsOrbit = base.controls;
let container = base.container;
let renderer = base.renderer;
// let controls1 = base.controls1;

const positionElement = document.getElementById("position");
const rotationElement = document.getElementById("rotation");
const scaleElement = document.getElementById("scale");


let transformControls, object, box, cube, imgplane, text, texture;
let objectsToIntersect = [];
function displayValues(transformControls) {
  const objectPosition = transformControls;
  // console.log(objectPosition.position);
  if (objectPosition) {
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
}
function createTransformaControls() {
  // if(object.name==='plane'){
  console.log(object);

  // objectsToIntersect.push(object);
  console.log(objectsToIntersect);
  // }
  transformControls = new TransformControls(camera, renderer.domElement);
  scene.add(transformControls);
  console.log(transformControls);

  transformControls.addEventListener("dragging-changed", (e) => {
    // console.log(orbitControls.enabled);

    controlsOrbit.enabled = !e.value;
    // controls1.enabled = !e.value;
  });
  transformControls.addEventListener("change", () => {
    // console.log(transformControls);
    displayValues(transformControls.object);
  });

  // transformControls.attach(object);
  // transformControls.visible = false;
  console.log("hygfd", transformControls.object);

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
function createcube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
  cube.name = "cube";

  objectsToIntersect.push(cube);

  // transformControls.detach(cube);
}
function createimg() {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./graycloud_dn.jpg");

  const geometry = new THREE.PlaneGeometry(2, 2);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  imgplane = new THREE.Mesh(geometry, material);

  scene.add(imgplane);

  objectsToIntersect.push(imgplane);
}
function addtext() {

  // Initial text setup

  // Function to update the text on the canvas and adjust the plane size

  let text1 = new Text();
  // text1.font = 'path/to/font.woff'
  function updateText() {
    const textValue = input.value;

    text1.text = textValue;

    text1.fontSize = 0.2;
    text1.color = 0x9966ff;

    text1.sync();
  }
  // console.log(text);

  // myScene.add(text)
  text = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      color: "black",
    })
  );
  // text.add(text1);
  scene.add(text1);
  updateText();

  objectsToIntersect.push(text1);

  // Event listener for text input changes
  input.addEventListener("input", updateText);
}

// function textcss() {
//   const element = document.createElement("div");
//   element.style.width = "50px";
//   element.style.height = "50px";
//   element.style.background = "red";
//   element.style.color = "black";
//   element.textContent = "Flying HTML!";
//   const cssObject = new CSS3DObject(element);
//   cssObject.position.set(0, 0,-200);
//   // cssObject.rotation.set(0, Math.PI / 4, 0);

//   console.log(cssObject);
//   // scene.add(cssObject);

//   const planecss = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     new THREE.MeshBasicMaterial({
//       map: texture,
//       side: THREE.DoubleSide,
//       color: "black",
//     })
//   );
//   planecss.add(cssObject);
//   scene.add(planecss);
//   objectsToIntersect.push(planecss);

//   const transformCon = createTransformaControls(planecss);


// }

function createVideo() {
  const video = document.createElement("video");
  video.src =
    "Cannon.js Tutorial For Beginners - Add Gravity, Collision, And Other Physics Laws To Your 3D Web App.mp4"; // Replace with the path to your video file
  video.loop = true;
  video.crossOrigin = "anonymous";
  video.play();

  const videoTexture = new THREE.VideoTexture(video);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
  });
  const videoplane = new THREE.Mesh(geometry, material);

  scene.add(videoplane);
  const transformCon = createTransformaControls(videoplane);
  objectsToIntersect.push(videoplane);
}

let selected = null;
function createNewScene() {
  scene.background = new THREE.Color("skyblue");

  const gridhelper = new THREE.GridHelper();
  scene.add(gridhelper);

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
    // const object12 = intersects[0].object
    console.log(transformControls);
    if (intersects.length > 0) {
      selected = true;
      console.log(selected, intersects);
      // transformControls.visible = true;
      console.log("hiiii", intersects[0].object);
      transformControls.attach(intersects[0].object);
      console.log("hyyg", intersects[0].object);
    } else {
      selected = false;
      console.log(selected, intersects);
      // transformControls.visible = false;
      transformControls.detach(transformControls.object);

      console.log("yii", transformControls.object);
    }
  });
}

createTransformaControls();

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
createNewScene();




const textmesh = new AddText(scene,objectsToIntersect);
// const Mesh = textmesh.textMesh;
// objectsToIntersect.push(Mesh);
document.querySelector("#new-scene-button").addEventListener("click", () => {
  textmesh.updateCanvas();
});


document.querySelector("#add-cube-button").addEventListener("click", () => {
  createcube();
});

document.querySelector("#add-image-button").addEventListener("click", () => {
  createimg();
});

document.querySelector("#add-text-button").addEventListener("click", () => {
  addtext();
});
document.querySelector("#add-video-button").addEventListener("click", () => {
  createVideo();
});