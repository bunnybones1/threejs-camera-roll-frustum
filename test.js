var onReady = function() {
	var View = require('threejs-managed-view').View;
	var cameraRoll = require('./');
	var view = new View();

	cameraRoll(view.camera);

	view.camera.setRoll(1);
	view.camera.updateProjectionMatrix();

	var totalHandles = 4;

	var geometry = new THREE.SphereGeometry(1, 32, 16)
	for (var i = -2; i <= 2; i++) {
		var handle = new THREE.Mesh( geometry)
		handle.position.x = i / totalHandles * 8;
		view.scene.add(handle);
	};

	view.renderManager.onEnterFrame.add(function() {
		var time = (new Date()).getTime() * .001;
		view.camera.setRoll(Math.sin(time));
	})
}

var loadAndRunScripts = require('loadandrunscripts');
loadAndRunScripts(
	[
		'bower_components/three.js/three.js'
	],
	onReady
);