function setCubeVert () {
    return new Float32Array([
    0.5,  0.5,  -.5,  // right, top,    far
    -0.5,  0.5,  -.5, // left,  top,    far
    -0.5, -0.5,  -.5, // left,  bottom, far
    0.5, -0.5,  -.5,  // right, bottom, far
    0.5,  0.5,  .5,   // right, top,    near
    -0.5,  0.5,  .5,  // left,  top,    near
    -0.5, -0.5,  .5,  // left,  bottom, near
    0.5, -0.5,  .5    // right, bottom, near
    ])
}
function setCubeColor () {  //black
    return new Float32Array([
    0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,
    0.1, 0.1, 0.1,
    ]);
}
function setCubeColorB () { //brown
    return new Float32Array([
    0.5, 0.25, 0,
    0.5, 0.25, 0,
    0.15, 0.1, 0,
    0.15, 0.1, 0,
    0.5, 0.25, 0,
    0.5, 0.25, 0,
    0.15, 0.1, 0,
    0.15, 0.1, 0,
    ]);
}
function setCubeColorG () { //grey
    return new Float32Array([
    0.5, 0.4, 0.3,
    0.5, 0.4, 0.3,
    0.5, 0.4, 0.3,
    0.5, 0.4, 0.3,
    0.5, 0.4, 0.3,
    0.5, 0.4, 0.3,
    0.5, 0.4, 0.3,
    0.5, 0.4, 0.3,
    ]);
}
function setCubeIndices () {
    return new Uint16Array([
    0,1,2, // far face
    0,2,3, // far face
    0,3,7, // right face
    0,7,4, // right face
    6,2,3, // bottom face
    6,3,7, // bottom face
    5,1,2, // left face
    5,2,6, // left face
    5,1,0, // top face
    5,0,4, // top face
    5,6,7, // near face
    5,7,4  // near face
    ]);
}

// helper function to create cylinder vertices, creates vertices for a circle along the X and Z axes, with Y offset from argument
// --- start AI code --- 
function createCircleVertices(segments = 32, y = 0) {
  const radius = 0.5;
  const vertices = new Float32Array(segments * 3);

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    vertices[i * 3 + 0] = x;
    vertices[i * 3 + 1] = y;
    vertices[i * 3 + 2] = z;
  }

  return vertices;
}
// --- end AI code ---

//get vertices, vertex colors, and draw indices for cylinder
function setCylinderVert () {
    const topCircle = createCircleVertices(32, 0.5);
    const bottomCircle = createCircleVertices(32, -0.5);
    return new Float32Array([
    0,  0.5,  0,  // top middle
    ...topCircle,  //top circle vertices
    0, -0.5,  0, // bottom middle
    ...bottomCircle  //bottom circle vertices
    ])
}
function setCylinderColor () { //standard person color
    const segments = 32;
    const color = new Float32Array((segments*2+2)*3);
    for (let i = 0; i < (segments+1); i++) {
        color[i * 3 + 0] = 0.6;
        color[i * 3 + 1] = 0.2;
        color[i * 3 + 2] = 0.2;
    }
    for (let i = 0; i < (segments+1); i++) {
        color[(segments+1+i) * 3 + 0 ] = 0.2;
        color[(segments+1+i)* 3 + 1 ] = 0.2;
        color[(segments+1+i) * 3 + 2 ] = 0.6;
    }
    return color;
}
function setCylinderColorB () { //vlue barrel color
    const segments = 32;
    const color = new Float32Array((segments*2+2)*3);
    for (let i = 0; i < (segments+1); i++) {
        color[i * 3 + 0] = 0.4;
        color[i * 3 + 1] = 0.4;
        color[i * 3 + 2] = 0.6;
    }
    for (let i = 0; i < (segments+1); i++) {
        color[(segments+1+i) * 3 + 0 ] = 0.2;
        color[(segments+1+i)* 3 + 1 ] = 0.2;
        color[(segments+1+i) * 3 + 2 ] = 0.3;
    }
    return color;
}
function setCylinderIndices () {
    const indices = new Uint16Array(96+96+192); // 96 for top face, 96 for bottom face, 192 for side faces
    //top face
    const segments = 32;
    for (let i = 0; i < segments; i++) {
        indices[i * 3 + 0] = 0; // top middle vertex
        indices[i * 3 + 1] = i + 1; 
        indices[i * 3 + 2] = i + 2;
        if (i == segments - 1) {
            indices[i * 3 + 2 ] = 1; // wrap last vertex around to the first
        }
    }
    //bottom face
    for (let i = 0; i < segments; i++) {
        indices[i * 3 + 0 + (segments * 3)] = segments+1; // bottom middle vertex
        indices[i * 3 + 1 + (segments * 3)] = i + segments+2; 
        indices[i * 3 + 2 + (segments * 3)] = i + segments+3;
        if (i == segments - 1) {
            indices[i * 3 + 2 + (segments * 3)] = segments+2; // wrap last vertex around to the first
        }
    }
    //side faces
    for (let i = 0; i < segments; i++) {
        indices[i * 6 + 0 + (segments * 6)] = i + 1; 
        indices[i * 6 + 1 + (segments * 6)] = i + segments+2; 
        indices[i * 6 + 2 + (segments * 6)] = i + segments+3;

        indices[i * 6 + 3 + (segments * 6)] = i + 1; 
        indices[i * 6 + 4 + (segments * 6)] = i + segments+3;
        indices[i * 6 + 5 + (segments * 6)] = i + 2;

        if (i == segments - 1) { // wrap around last vertices for the last face
            indices[i * 6 + 2 + (segments * 6)] = segments+2; 
            indices[i * 6 + 4 + (segments * 6)] = segments+2;
            indices[i * 6 + 5 + (segments * 6)] = 1;
        }
    }
    return indices;
}


//get vertices, vertex colors, and draw indices for sphere
// --- start AI code --- 
function setSphereVert (latSegments = 16, lonSegments = 16) {
    const vertices = [];
    const radius = 0.5;
     for (let lat = 0; lat <= latSegments; lat++) {
        const theta = lat * Math.PI / latSegments;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        for (let lon = 0; lon <= lonSegments; lon++) {
            const phi = lon * 2 * Math.PI / lonSegments;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;

            vertices.push(radius * x, radius * y, radius * z);
            
        }
    }
    const ret = new Float32Array(vertices)
    return ret;
}
function setSphereIndices (latSegments = 16, lonSegments = 16) {
    const indices = [];
    for (let lat = 0; lat < latSegments; lat++) {
        for (let lon = 0; lon < lonSegments; lon++) {
            const first = lat * (lonSegments + 1) + lon;
            const second = first + lonSegments + 1;

            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }
    const ret = new Uint16Array(indices)
    return ret;
}
// --- end AI code ---

function setSphereColor (latSegments = 16, lonSegments = 16) {
    const count = (latSegments + 1) * (lonSegments + 1);
    const color = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        color[i * 3 + 0] = 0.6;
        color[i * 3 + 1] = 0.4;
        color[i * 3 + 2] = 0.2;
    }
    return color;
}