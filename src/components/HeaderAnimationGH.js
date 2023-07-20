import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import React from "react"
import styled from 'styled-components';

class HeaderAnimation extends React.Component {
  _onWindowResize = null;
  _toggleHeaderVisibility = null;
  _renderer = null;

  componentDidMount() {
    const scene = new THREE.Scene()
    const initialWindowInnerHeight = window.innerHeight;

    // scene.background = new THREE.Color('#2f39ae');
    scene.add(new THREE.AmbientLight( '#fe317e', 1 ));
    scene.add(new THREE.DirectionalLight('#fe317e', 2));
    scene.add(new THREE.DirectionalLight('#2f39ae', 3));
    scene.add(new THREE.DirectionalLight('#fcb045', 2));

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ antialiasing: false, powerPreference: "high-performance", alpha: true })
    this._renderer = renderer
    renderer.outputEncoding = THREE.sRGBEncoding

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.getElementById(`header-animation-container`).appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = false

    const envTexture = new THREE.CubeTextureLoader().load([
        'img/px_50.png',
        'img/nx_50.png',
        'img/py_50.png',
        'img/ny_50.png',
        'img/pz_50.png',
        'img/nz_50.png'
    ])
    envTexture.mapping = THREE.CubeReflectionMapping
    const material = new THREE.MeshPhysicalMaterial({
        color: '#fe317e',
        envMap: envTexture,
        metalness: 0.1,
        roughness: 0.8,
        opacity: 0.4,
        transparent: true,
        clearcoat: 0.8,
        clearcoatRoughness: 0.65
    })

    function onWindowResize() {
        renderer.setSize(window.innerWidth, initialWindowInnerHeight);

        if (window.devicePixelRatio < 2) {
            renderer.setPixelRatio(window.devicePixelRatio/1.5);
        } else {
            renderer.setPixelRatio(window.devicePixelRatio/2);
        }

        camera.aspect = window.innerWidth / initialWindowInnerHeight;
        camera.updateProjectionMatrix();

        render();
    }
    this._onWindowResize = onWindowResize;

    const headerWrapper = document.getElementById('header-wrapper')

    let headerVisible = true;

    function makeHeaderWrapperDisappear() {
        headerWrapper.style.pointerEvents = 'none';
        headerWrapper.style.opacity = '0%';
        headerVisible = false;
    }

    function makeHeaderWrapperAppear() {
        headerWrapper.style.pointerEvents = 'auto';
        headerWrapper.style.opacity = '100%';
        headerVisible = true;
    }

    function toggleHeaderVisibility() {
        headerVisible ? makeHeaderWrapperDisappear() : makeHeaderWrapperAppear()
    }
    this._toggleHeaderVisibility = toggleHeaderVisibility;

    // document.getElementById(`header-animation-container`).addEventListener('touchstart', toggleHeaderVisibility, false)
    // document.getElementById(`header-animation-container`).addEventListener('click', toggleHeaderVisibility, false)
    // document.getElementById(`header-wrapper`).addEventListener('touchstart', toggleHeaderVisibility, false)
    // document.getElementById(`header-wrapper`).addEventListener('click', toggleHeaderVisibility, false)

    window.addEventListener('resize', onWindowResize, false)
    onWindowResize();

    const radius = 0.003;
    let theta = 0.000024

    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        theta += 0.1;

        if (mesh) {
            mesh.rotation.z += radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
            mesh.rotation.y += radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
            mesh.rotation.x += radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
        }

        render()
    }

    function render() {
        renderer.render(scene, camera)
    }

    function resolved(result) {
        mesh = new THREE.Mesh(result, material)
        scene.add(mesh)
        mesh.rotateX(5)
        animate();
    }

    function rejected(result) {
        if (process.env.NODE_ENV === 'development') {
            console.error(result);
        }
    }

    const loader = new STLLoader()
    let mesh;
    loader.loadAsync(
        '/stefkn-2021-small.stl'
    ).then(
        resolved, rejected
    )
  }

  componentWillUnmount() {
    this._renderer.dispose();
    window.removeEventListener('resize', this._onWindowResize);
    // document.getElementById(`header-animation-container`).removeEventListener('touchstart', this._toggleHeaderVisibility);
    // document.getElementById(`header-animation-container`).removeEventListener('click', this._toggleHeaderVisibility);
    // document.getElementById(`header-wrapper`).removeEventListener('touchstart', this._toggleHeaderVisibility);
    // document.getElementById(`header-wrapper`).removeEventListener('click', this._toggleHeaderVisibility);
  }

  render() {
    const HeaderAnimContainer = styled.div`
        -webkit-transition: all 0s ease;
        transition: all 0s ease;

        canvas {
            width: 100% !important;
            height: 100% !important;
            display: block;
            position: relative;
            z-index: 1;

            -webkit-transition: all 0s ease;
            transition: all 0s ease;
            background: conic-gradient(from 124deg at 50% 50%, #5600ff, #cf00d4, #ff00a3, #ff0074, #ff004b, #ff6c24, #ff9f00, #ffc800);
        }
    `
    return (
      <HeaderAnimContainer id={`header-animation-container`}></HeaderAnimContainer>
    )
  }
}

export default HeaderAnimation