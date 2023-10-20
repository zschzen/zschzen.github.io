#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// transformation matrix
// protanopia
const mat3 protanopia = mat3(
    0.567, 0.433, 0.0,
    0.558, 0.442, 0.0,
    0.0, 0.242, 0.758
);
// deuteranopia
const mat3 deuteranopia = mat3(
    0.625, 0.375, 0.0,
    0.7, 0.3, 0.0,
    0.0, 0.3, 0.7
);
// tritanopia
const mat3 tritanopia = mat3(
    0.95, 0.05, 0.0,
    0.0, 0.433, 0.567,
    0.0, 0.475, 0.525
);

void main() {
    // get the pixel coordinates
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // color based on pixel coordinates and time
    vec3 color = vec3( st, abs( sin( u_time ) ) );

    // apply transformation matrix
    vec3 transformed = color;

    // uncomment to apply transformation matrix
    // transformed = protanopia * color;
    // transformed = deuteranopia * color;
    // transformed = tritanopia * color;

    // set the output color of the pixel shader
    gl_FragColor = vec4(transformed, 1.0);
}