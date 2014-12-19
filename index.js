function cameraRoll(camera) {
	var cameraRollMatrix = new THREE.Matrix4();

	//replace makeFrustum
	var oldMakeFrustum = camera.projectionMatrix.makeFrustum.bind(camera.projectionMatrix);
	camera.projectionMatrix.makeFrustum = function(left, right, bottom, top, near, far) {
		return oldMakeFrustum(left, right, bottom, top, near, far).multiply(cameraRollMatrix);
	};

	//give camera convenient method
	camera.setRoll = function(angle) {
		cameraRollMatrix.makeRotationZ(angle);
		this.updateProjectionMatrix();
	}
}

module.exports = cameraRoll;