
import * as THREE from 'three';

class AddText extends THREE.Object3D {
    constructor(scene,objectarr) {
        super();
        this.scene = scene;
        this.arr = objectarr;

        const input = document.getElementById("myInput");

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        this.color = 0xffffff;
        this.size = 32;

        // Calculate the total height of the text block
        const calculateTotalHeight = () => {
            const lines = this.text.split('\n');
            return lines.length * this.size;
        };

        this.updateCanvas = () => {
            // Remove existing text mesh from the scene
            this.removeTextMesh();

            canvas.width = 256; // Adjust this based on your desired width
            canvas.height = calculateTotalHeight();
            canvas.style.backgroundColor = 'yellow';

            context.font = `${this.size}px Arial`;
            context.textAlign = 'center';
            context.fillStyle = this.color;

            // Render each line of text on the canvas
            const lines = this.text.split('\n');
            lines.forEach((line, index) => {
                context.fillText(line, canvas.width / 2, this.size * (index + 1));
            });

            const texture = new THREE.CanvasTexture(canvas);

            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                color: this.color,
                side: THREE.DoubleSide // Ensure that the plane is visible from both sides
            });

            const planeGeometry = new THREE.PlaneGeometry(canvas.width / 100, calculateTotalHeight() / 100);
            this.textMesh = new THREE.Mesh(planeGeometry, material);

            this.add(this.textMesh);
            this.scene.add(this);
            this.arr.push(this.textMesh);
        };

        // Method to remove existing text mesh from the scene
        this.removeTextMesh = () => {
            if (this.textMesh) {
                this.scene.remove(this);
                this.remove(this.textMesh);
            }
        };

        // Initial text value
        // this.text = input.value;

        // Update the canvas and texture when the input value changes
        input.addEventListener('input', () => {
            this.text = input.value;
        });
    }
}

export default AddText;

