function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");
  //   vertex shader
  //   note:pakai backtick untuk multiple lines

  //   shader code
  let vertexShaderCode = `void main(){
      
}`;
  //   creaate shader object
  let vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  //   compile the shader
  gl.compileShader(vertexShaderObject);

  // fragment shader
  //   shader code
  let fragmentShaderCode = `void main(){

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
  gl.clearColor(0.5, 0.7, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
