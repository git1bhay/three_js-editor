// import {
//     THREE
// } from 'pictarize-lib';
import * as THREE from 'three';

class TextSprite extends THREE.Object3D {

    constructor(text, color = 0xffffff, size = 1,scene) {

        super();
        this.scene = scene;

        console.log('scene',);
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;

        const context = canvas.getContext('2d');
        context.font = `${size}px Arial`;
        context.textAlign = 'center';
        context.fillStyle = color;
        context.fillText(text, 32, 41);

        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;

        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            color: color
        });

        const sprite = new THREE.Sprite(material);
        this.scene.add(sprite)

    }

}

export default TextSprite;