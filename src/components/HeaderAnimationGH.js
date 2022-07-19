import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
// import Stats from 'three/examples/jsm/libs/stats.module'

import React from "react"
import styled from 'styled-components';

class HeaderAnimation extends React.Component {
  componentDidMount() {
    const scene = new THREE.Scene()
    // scene.add(new THREE.AxesHelper(5))

    scene.background = new THREE.Color('#2f39ae');

    const light = new THREE.SpotLight()
    light.position.set(50, 50, 50)
    scene.add(light)

    const light2 = new THREE.AmbientLight( '#2f39ae' ); // soft white light
    scene.add( light2 );

    const light0 = new THREE.DirectionalLight('#fe317e', 1);
    scene.add(light0);

    const light10 = new THREE.DirectionalLight('#fe317e', 0.6);
    scene.add(light10);

    const light1 = new THREE.PointLight('red', 10, 1, 0);
    scene.add(light1);

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 70

    const renderer = new THREE.WebGLRenderer({ antialiasing: false, powerPreference: "high-performance" })
    renderer.outputEncoding = THREE.sRGBEncoding

    // Thanks https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera); // eslint-disable-line
        return check;
    };

    renderer.setSize(window.innerWidth, window.innerHeight-200)
    if (window.mobileCheck()) {
        renderer.setSize(window.innerWidth, window.innerHeight+20)
    }

    if (window.devicePixelRatio < 2) {
        renderer.setPixelRatio(window.devicePixelRatio/1.5);
    } else {
        renderer.setPixelRatio(window.devicePixelRatio/2);
    }

    document.getElementById(`header-animation-container`).appendChild(renderer.domElement)

    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true

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
        color: '#616be6',
        envMap: envTexture,
        metalness: 0.25,
        roughness: 0.1,
        opacity: 1.0,
        transparent: true,
        transmission: 0.99,
        clearcoat: 1.0,
        clearcoatRoughness: 0.25
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

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth-10, window.innerHeight-200)
        render()
    }

    // const stats = Stats()
    // document.body.appendChild(stats.dom)
    const radius = 0.003;
    let theta = 0.000024

    function animate() {
        requestAnimationFrame(animate)

        // controls.update()
        theta += 0.1;

        if (mesh) {
            // mesh.rotation.y += 0.005
            // mesh.rotation.x += 0.005
            // mesh.rotation.z += 0.0025
            mesh.rotation.z += radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
            mesh.rotation.y += radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
            mesh.rotation.x += radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
        }

        render()

        // stats.update()
    }

    function render() {
        renderer.render(scene, camera)
    }

    animate()
  }

  render() {
    const HeaderAnimContainer = styled.div`
        -webkit-transition: all 0s ease;
        transition: all 0s ease;
        position: sticky;

        canvas {
            width: 90vw;
            height: 60em;
            display: block;
            position: relative;
            background-color: #2f39ae;
            z-index: 1;

            -webkit-transition: all 0s ease;
            transition: all 0s ease;
        }

        @media (max-width: 1420px) {
            top: -1028px;
        }
        @media (max-width: 320px) {
            top: -1026px;
        }
        @media (min-width: 1420px) {
            top: -1026px;
        }
    `
    return (
      <HeaderAnimContainer id={`header-animation-container`}></HeaderAnimContainer>
    )
  }
}

export default HeaderAnimation