import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
// import Stats from 'three/examples/jsm/libs/stats.module'

import React from "react"
import styled from 'styled-components';

class HeaderAnimation extends React.Component {
  _onWindowResize = null;
  _renderer = null;

  componentDidMount() {
    const scene = new THREE.Scene()

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

    // const material = new THREE.MeshBasicMaterial({})
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
        transmission: 0.8,
        clearcoat: 0.8,
        clearcoatRoughness: 0.65
    })

    const loader = new STLLoader()
    let mesh;
    loader.load(
        '/stefkn-2021.stl',
        function (geometry) {
            mesh = new THREE.Mesh(geometry, material)
            scene.add(mesh)
            mesh.rotateX(5)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )

    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (window.devicePixelRatio < 2) {
            renderer.setPixelRatio(window.devicePixelRatio/1.5);
        } else {
            renderer.setPixelRatio(window.devicePixelRatio/2);
        }

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        render();
    }
    this._onWindowResize = onWindowResize;

    const headerWrapper = document.getElementById('header-wrapper')

    function makeHeaderWrapperDisappear() {
        headerWrapper.style.pointerEvents = 'none';
        headerWrapper.style.opacity = '0%';
    }

    function makeHeaderWrapperAppear() {
        headerWrapper.style.pointerEvents = 'auto';
        headerWrapper.style.opacity = '100%';
    }

    let mouseInElem = false
    let mouseInElemCounter = 0

    function recursivelyWaitForMouseInElem(timeSoFar, step, limit) {
        if (timeSoFar < limit) {
          setTimeout(
            () => {
                // console.log(mouseInElemCounter);

                if (window.location.pathname === '/') {
                    recursivelyWaitForMouseInElem(timeSoFar+step, step, limit);
                }

                mouseInElem = Array.from(
                    document.querySelectorAll(":hover")
                ).some(
                    el => {
                        return el.id === "header-animation-container" || el.id === "header-wrapper"
                    }
                );

                if (mouseInElem) {
                    mouseInElemCounter++;
                    if (mouseInElemCounter > 1) {
                        makeHeaderWrapperDisappear();
                    }
                } else {
                    mouseInElemCounter = 0;
                    makeHeaderWrapperAppear();
                }
            },
            step
          );
        }
    }

    recursivelyWaitForMouseInElem(0, 500, 1000*60*5);

    window.addEventListener('resize', onWindowResize, false)
    onWindowResize();

    // const stats = Stats()
    // document.body.appendChild(stats.dom)
    const radius = 0.003;
    let theta = 0.000024

    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        theta += 0.1;

        if (mesh) {
            // mesh.rotation.y += 0.005
            // mesh.rotation.x += 0.005
            // mesh.rotation.z += 0.0025
            mesh.rotation.z += radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
            mesh.rotation.y += radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
            mesh.rotation.x += radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
            // console.log(Math.sin( THREE.MathUtils.degToRad( theta ) ));
            // camera.position.z += Math.sin( THREE.MathUtils.degToRad( theta ) )*15;
        }

        render()

        // stats.update()
    }

    function render() {
        renderer.render(scene, camera)
    }

    animate()
  }

  componentWillUnmount() {
    this._renderer.dispose();
    window.removeEventListener('resize', this._onWindowResize);
  }

  render() {
    const HeaderAnimContainer = styled.div`
        -webkit-transition: all 0s ease;
        transition: all 0s ease;

        canvas {
            width: 100% !important;
            height: 60em;
            display: block;
            position: relative;
            z-index: 1;

            -webkit-transition: all 0s ease;
            transition: all 0s ease;
            background-color: #0e063e;
            background-image: url(/apple-bg4.jpeg);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }

        audio {
            position: absolute;
            z-index: 100;
            right: 2em;
            bottom: 2em;
            height: 38px;
        }
    `
    return (
      <HeaderAnimContainer id={`header-animation-container`}>
        <audio controls loop preload="true" src="/Percussions_digital_arpeggios.mp3"></audio>
      </HeaderAnimContainer>
    )
  }
}

export default HeaderAnimation