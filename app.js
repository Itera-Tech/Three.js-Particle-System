const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const particles = new THREE.BufferGeometry();
const particleCount = 10000;

const positions = new Float32Array(particleCount * 30);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 200;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

  const color = new THREE.Color();
  color.setHSL(Math.random() * 0.1 + 0.6, 0.8, Math.random() * 0.2 + 0.5);
  colors[i * 3] = color.r;
  colors[i * 3 + 1] = color.g;
  colors[i * 3 + 2] = color.b;

  sizes[i] = Math.random() * 5;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const material = new THREE.PointsMaterial({
  size: 0.01,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  transparent: true
});

const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);

camera.position.z = 200;

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 5 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 1 + 1;
});

const animate = () => {
  requestAnimationFrame(animate);

  particleSystem.rotation.x += 0.0010;
  particleSystem.rotation.y += 0.0000;

  camera.position.x += (mouseX * 50 - camera.position.x) * 0.25;
  camera.position.y += (mouseY * 150 - camera.position.y) * 0.25;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();