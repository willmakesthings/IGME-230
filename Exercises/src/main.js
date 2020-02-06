//SCROLLING INIT
    luxy.init();

    //HEADER TEXT
    $("#js-rotating").Morphext({
        animation: "moveTextUp",
        separator: ",",
        speed: 2500,
        complete: function () {
        }
    });
    
    //CURSOR
    var cursor = document.getElementById('cursor');
    window.addEventListener('mousemove' , function(e){
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    });
 
    //CURSOR HOVER ZOOM
    $(".nav-logo, a, .hero-text, .hero-arrow, .grid-item").hover(function() {
        $("#cursor").addClass("zoom");
//        console.log("is this thing on")
    }, function() {
        $("#cursor").removeClass("zoom");
    });
    
    //SCROLL TO
    $("#aboutLink, .hero-arrow").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#about").offset().top
        }, 0);
    });
    $(".burger-about").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#about").offset().top
        }, 0);
        $("#toggle").toggleClass('active');
        $(".hero-text span").toggle();
        $('#overlay').toggleClass('open');
        $('body').toggleClass('noscroll')
    });
    
    $("#workLink").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#work").offset().top
        }, 0);
    });
    $(".burger-work").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#work").offset().top
        }, 0);
        
        $("#toggle").toggleClass('active');
        $(".hero-text span").toggle();
        $('#overlay').toggleClass('open');
        $('body').toggleClass('noscroll')
    });
    
    $("#contactLink").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#contact").offset().top
        }, 0);
    });
    $(".burger-contact").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#contact").offset().top
        }, 0);
        
        $("#toggle").toggleClass('active');
        $(".hero-text span").toggle();
        $('#overlay').toggleClass('open');
        $('body').toggleClass('noscroll')
    });
    
    //LIGHT MODE SCROLL
    $(function() {
        $(window).scroll(function () {
          if ($(this).scrollTop() > 70) {
             $("body, main, .overlay").addClass("lightBG");
             $(".burger_menu-top, .burger_menu-bottom").addClass("darkmode");
             $(".nav-logo, .nav-menu-item a, .hero-text, .about, .overlay ul li a").addClass("lightText");
//              cursor.style.background = "#000";

          }
          if ($(this).scrollTop() < 70) {
             $("body, main, .overlay").removeClass("lightBG");
              $(".burger_menu-top, .burger_menu-bottom").removeClass("darkmode");
             $(".nav-logo, .nav-menu-item a, .hero-text, .about, .overlay ul li a").removeClass("lightText");
//              cursor.style.background = "#fff";
          }
        });
    });
    
    //HAMBURGER TOGGLE
    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $(".hero-text span").toggle();
        $('#overlay').toggleClass('open');
        $('body').toggleClass('noscroll')
    });

//<!--
//<script type="module">
//    
//        $(window).scroll(function () {
//          if ($(this).scrollTop() > 70) {
//             invertColor(true);
//          }
//          if ($(this).scrollTop() < 70) {
//             invertColor(false);
//          }
//        });
//    
//import {GLTFLoader} from "./src/GLTFLoader.js";
//    
//    var mesh, scene, camera;
//    var renderer, material, dark, light, points;
//    
//    init();
//    animate();
//    
//    window.addEventListener('resize', onResize, false);
//    
//    function init() {
//    scene = new THREE.Scene();
//    scene.AmbientLight = new THREE.Color( 0x0 );
//    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.11, 1000 );
//
//    const canvas = document.querySelector('#c');
//    renderer = new THREE.WebGLRenderer({canvas, alpha: true});
//    renderer.setPixelRatio(window.devicePixelRatio);
//    renderer.setSize( window.innerWidth, window.innerHeight );
////    canvas.appendChild(renderer.domElement)
//
//        var geometry = new THREE.BoxGeometry( 200, 200, 200 );
//        dark = new THREE.Color( 0xffffff );
//        light = new THREE.Color( 0x000000);
//        material = new THREE.MeshBasicMaterial( { 
//            color: dark,
//            wireframe: true
//        });
//
//        var loader = new THREE.GLTFLoader();
//        loader.load( './media/coriolis_centered.glb', function ( gltf ) {
//            mesh = gltf.scene;
//
//            mesh.traverse((node) => {
//          if (!node.isMesh) return;
//          node.material.wireframe = true;
//                node.material = material;
//            });
////            scene.add( mesh );
//            
//    var pointsmaterial = new THREE.PointsMaterial({color: 0xFFFF00, size: 10});
//    //console.log(mesh);
//    points = new THREE.Points(mesh.children[0].geometry, pointsmaterial);
////    scene.add(points);
//    });
//        
//    
//    //var cube = new THREE.Mesh( geometry, material );
//    //scene.add( cube );
//    //    
//    camera.position.z = 500;
//    camera.position.x = -100;
//}
//    function onResize() {
//        canvas.width  = canvas.clientWidth;
//        canvas.height = canvas.clientHeight;
//        renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
//        camera.aspect = canvas.clientWidth / canvas.clientHeight;
//        camera.updateProjectionMatrix();
//}
//    
//    function invertColor(invertval){
//        //console.log(mesh.children[0].material);
//        if(invertval){
//            mesh.children[0].material.color = light;
//            points.material.color = light;
//        }
//        else{
//             mesh.children[0].material.color = dark;
//            points.material.color = dark;
//        }
//    }
//    
//    function animate() {
//            
//            const canvas = renderer.domElement;
//            camera.aspect = canvas.clientWidth / canvas.clientHeight;
//            camera.updateProjectionMatrix();
//        
//            requestAnimationFrame( animate );
//            
//            points.rotation.x += 0.0025;
////            mesh.rotation.x += 0.0025;
//            points.rotation.y += 0.00055;
////            mesh.rotation.y += 0.00055;
//            //console.log(mesh);
//            //console.log(cube);
//        
//            renderer.render( scene, camera );
//        
////            mesh.traverse((node) => {
////            if (!node.isMesh) return;
////                node.material.color = localStorage.getItem('wam-wireframe-color');;
////        });
//};
//
//
//
//</script>
//-->


