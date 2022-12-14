import glmt from "gl-matrix";
function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");

  //   note:pakai backtick untuk multiple lines

  // decalre array untuk tiga titik
  let vertices = [
    //C
    0.5, 0.0, 0.0, 1.0, 1.0,
    //M
    0.0, -0.5, 1.0, 0.0, 1.0,
    // Y
    -0.5, 0.0, 1.0, 1.0, 0.0,
    // K
    0.0, 0.5, 1.0, 1.0, 1.0,
  ];
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //   vertex shader - posisi
  //   shader code
  let vertexShaderCode = `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  uniform float uTheta;
  uniform vec2 uDelta;
  varying vec3 vColor;
  uniform vec2 u_translation;
  void main(){
    // float x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
    // float y = cos(uTheta) * aPosition.x + sin(uTheta) * aPosition.y;
    // float x = aPosition.x + u_translation.x;
    // float y = aPosition.y + u_translation.y;
    // mat4 translation=[]
    // gl_Position = vec4(x, y, 0.0, 1.0);

    vec2 position = aPosition;
        mat4 rotation = mat4(
            cos(uTheta), sin(uTheta), 0.0, 0.0,
            -sin(uTheta), cos(uTheta), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        );
        mat4 translation = mat4(
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            u_translation.x, u_translation.y, 0.0, 1.0
        );
    gl_Position = translation * rotation * vec4(position, 0.0, 1.0);
    vColor = aColor;
     //also works like aPossition.xy
  }`;
  //assignment yg diterrima yg terkahir saja, supaya shader
  // bisa dipanggil beberpaa kali, drawarrays harus dipanggil beberpaa kali

  //   creaate shader object
  let vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  //   compile the shader
  gl.compileShader(vertexShaderObject);

  // fragment shader - warna
  //   shader code
  let fragmentShaderCode = `
  precision mediump float;
  varying vec3 vColor;
  void main(){
    gl_FragColor = vec4(vColor, 1.0);
  }`;
  let fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  //   compile the shader
  gl.compileShader(fragmentShaderObject);

  //   ".exe" file, but it's empty
  let shaderProgram = gl.createProgram();

  //   attach the shader to the file
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);

  //   link the Program
  gl.linkProgram(shaderProgram);

  // use the program, which color to use?
  gl.useProgram(shaderProgram);

  var theta = [0.1, 0.1];
  let freeze = false;
  // Variabel pointer ke GLSL
  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");
  var transLocation = gl.getUniformLocation(shaderProgram, "u_translation");

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  // Teach the GPU how to collect position value from ARRAY_BUFFERS for every vertex that is processed
  let aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(
    aPosition,
    2,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    0 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(aPosition);

  let aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(
    aColor,
    3,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(aColor);

  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
  // gl.POINTS
  // gl.LINE_LOOP
  // gl.LINE_STRIP
  // gl.TRIANGLES
  // gl.TRIANGLE_STRIP
  // gl.TRIANGLE_FAN

  function onMouseClick(event) {
    freeze = !freeze;
  }
  document.addEventListener("click", onMouseClick);
  function onKeyUp(event) {
    if (event.keyCode == 32) {
      freeze = !freeze;
    }
  }
  function onKeyDown(event) {
    if (event.keyCode == 32) {
      freeze = !freeze;
    }
  }
  let wkey = false;
  let skey = false;
  let akey = false;
  let dkey = false;
  // w
  function onKeyWUp(event) {
    if (event.keyCode == 87) {
      wkey = !wkey;
    }
  }
  // w
  function onKeyWDown(event) {
    if (event.keyCode == 87) {
      wkey = !wkey;
    }
  }
  // s
  function onKeySUp(event) {
    if (event.keyCode == 83) {
      skey = !skey;
    }
  }
  function onKeySDown(event) {
    if (event.keyCode == 83) {
      skey = !skey;
    }
  }
  // a
  function onKeyAUp(event) {
    if (event.keyCode == 65) {
      akey = !akey;
    }
  }
  // a
  function onKeyADown(event) {
    if (event.keyCode == 65) {
      akey = !akey;
    }
  }
  // d
  function onKeyDUp(event) {
    if (event.keyCode == 68) {
      dkey = !dkey;
    }
  }
  function onKeyDDown(event) {
    if (event.keyCode == 68) {
      dkey = !dkey;
    }
  }
  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("keydown", onKeyDown);

  document.addEventListener("keydown", onKeyWDown);
  document.addEventListener("keyup", onKeyWUp);
  document.addEventListener("keydown", onKeySDown);
  document.addEventListener("keyup", onKeySUp);
  document.addEventListener("keydown", onKeyADown);
  document.addEventListener("keyup", onKeyAUp);
  document.addEventListener("keydown", onKeyDDown);
  document.addEventListener("keyup", onKeyDUp);

  function render(params) {
    gl.clearColor(0.5, 0.7, 0.5, 1.0);
    //            Merah     Hijau   Biru    Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (wkey) {
      theta[1] += 0.01;
    }
    if (skey) {
      theta[1] -= 0.01;
    }
    if (dkey) {
      theta[0] += 0.01;
    }
    if (akey) {
      theta[0] -= 0.01;
    }

    // theta[0] += 0.01;
    gl.uniform2fv(transLocation, theta);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  gl.clearColor(0.5, 0.7, 0.5, 1.0);
  // //            Merah     Hijau   Biru    Transparansi
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

  // setInterval(render, 1000 / 60);
}
