function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");

  //   note:pakai backtick untuk multiple lines

  // decalre array untuk tiga titik
  let vertices = [
    //C
    0.5, 0.5, 0.0, 1.0, 1.0,
    //M
    0.0, 0.0, 1.0, 0.0, 1.0,
    // Y
    -0.5, 0.5, 1.0, 1.0, 0.0,
    // K
    0.0, 1.0, 1.0, 1.0, 1.0,
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
  varying vec3 vColor;
  void main(){
    float x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
    float y = cos(uTheta) * aPosition.x + sin(uTheta) * aPosition.y;
    gl_Position = vec4(x, y, 0.0, 1.0);
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

  var theta = 0.0;

  // Variabel pointer ke GLSL
  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");

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

  gl.clearColor(0.5, 0.7, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
  // gl.POINTS
  // gl.LINE_LOOP
  // gl.LINE_STRIP
  // gl.TRIANGLES
  // gl.TRIANGLE_STRIP
  // gl.TRIANGLE_FAN

  function render(params) {
    gl.clearColor(1.0, 0.65, 0.0, 1.0); // Oranye
    //            Merah     Hijau   Biru    Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta += 0.01;
    gl.uniform1f(uTheta, theta);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    render();
  }
  setInterval(render, 0.5);
}
