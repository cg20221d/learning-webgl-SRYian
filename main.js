function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");

  //   note:pakai backtick untuk multiple lines

  // decalre array untuk tiga titik
  let vertices = [0.5, 0.5, 0.0, 0.0, -0.5, 0.5, 0.0, 1.0];
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //   vertex shader - posisi
  //   shader code
  let vertexShaderCode = `
  attribute vec2 aPosition;
  void main(){
     float x = aPosition.x;
     float y = aPosition.y;
     gl_PointSize = 10.0;
     gl_Position = vec4( x, y, 0.0, 1.0);
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
  void main(){
    float r = 0.0;
    float g = 0.0;
    float b = 1.0;
    gl_FragColor = vec4(r , g, b, 1.0);
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

  // Teach the GPU how to collect position value from ARRAY_BUFFERS for every vertex that is processed
  let aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

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
}
