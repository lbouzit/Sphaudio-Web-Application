function generateSphere(shape_no, position, color)
{
	// scene node
	var scene = document.getElementById("scene");
	scene.setAttribute("id", "scene");

	// configure transformation
	var trans = document.createElement("transform");
	var trans_id = shape_no + "trans";
	trans.setAttribute("id", trans_id);

	trans.setAttribute("translation", position);

	// configure shape
	var shape_node = document.createElement("shape");
	var shape_id = shape_no + "shape";
	shape_node.setAttribute("id", shape_id);

	// sphere node
	var sphere_node = document.createElement("sphere");
	var sphere_id = shape_no + "sphere";
	sphere_node.setAttribute("id", sphere_id);

	// app node
	var app_node = document.createElement("appearance");
	var app_id = shape_no + "app";
	app_node.setAttribute("id", app_id);

	// mat node
	var mat_node = document.createElement("material");
	var mat_id = shape_no + "mat";
	mat_node.setAttribute("id", mat_node);
	mat_node.setAttribute("diffuseColor", color);

	// configure DOM tree
	app_node.appendChild(mat_node);
	shape_node.appendChild(sphere_node);
	shape_node.appendChild(app_node);
	trans.appendChild(shape_node);
	scene.appendChild(trans);
}

// first row of spheres
generateSphere("0", "3,0,0", "green");
generateSphere("0", "0,0,0", "green");
generateSphere("0", "-3,0,0", "green");

// second row of spheres
generateSphere("0", "3,0,-3","green");
generateSphere("0", "0,0,-3","green");
generateSphere("0", "-3,0,-3","green");

// third row of spheres
generateSphere("0", "3,0,-6","green");
generateSphere("0", "0,0,-6","green");
generateSphere("0", "-3,0,-6","green");