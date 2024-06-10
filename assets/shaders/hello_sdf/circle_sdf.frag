#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float sdCircle( in vec2 p, in float r )
{
    return length(p)-r;
}

void main() {
    vec2 p = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
    vec2 m = (2.0*u_mouse.xy-u_resolution.xy)/u_resolution.y;

	float d = sdCircle(p,0.5);

	// coloring
  vec3 col = (d>0.0) ? vec3(0.9,0.6,0.3) : vec3(0.65,0.85,1.0);
  col *= 1.0 - exp(-6.0*abs(d));
  col *= 0.8 + 0.2*cos(150.0*d + (u_time * 15.0 * d / abs(d)));
  col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.01,abs(d)) );

  d = sdCircle(m,0.5);
  col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(0.0, 0.005, abs(length(p-m)-abs(d))-0.0025));
  col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(0.0, 0.005, length(p-m)-0.015));

  gl_FragColor = vec4(col,1.0);
}
