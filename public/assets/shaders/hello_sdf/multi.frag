#ifdef GL_ES
precision mediump float;
#endif

const vec3 POSITIVE_BG = vec3( 0.3843, 0.4471, 0.6431 );
const vec3 NEGATIVE_BG = vec3( 1.0   , 0.3333, 0.3333 );
const vec3 DISTANCE    = vec3( 0.9450, 0.9803, 0.5490 );
const vec3 BORDER      = vec3( 0.9725, 0.9725, 0.9490 );

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_mouse_over;

#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

float sdCirc(vec2 p, float r) {
  return length(p) - r;
}
float sdRect(vec2 p, float s) {
  return max(abs(p.x) - s, abs(p.y) - s);
}
float sdLine(vec2 p, vec2 p1, vec2 p2, float r) {
  vec2 a1 = p - p1; vec2 a2 = p2 - p1;
  float h = clamp(dot(a1, a2) / dot(a2, a2), 0.0, 1.0);
  return length(a1 - a2 * h) - r;
}
float sdTri(vec2 p, vec2 p0, vec2 p1, vec2 p2) {
  vec2 e0 = p1 - p0, e1 = p2 - p1, e2 = p0 - p2;
  vec2 v0 = p - p0, v1 = p - p1, v2 = p - p2;
  vec2 pq0 = v0 - e0 * clamp(dot(v0, e0) / dot(e0, e0), 0.0, 1.0);
  vec2 pq1 = v1 - e1 * clamp(dot(v1, e1) / dot(e1, e1), 0.0, 1.0);
  vec2 pq2 = v2 - e2 * clamp(dot(v2, e2) / dot(e2, e2), 0.0, 1.0);
  float s = e0.x * e2.y - e0.y * e2.x;
  vec2 f = min(min(
      vec2(dot(pq0, pq0), s * (v0.x * e0.y - v0.y * e0.x)),
      vec2(dot(pq1, pq1), s * (v1.x * e1.y - v1.y * e1.x))),
    vec2(dot(pq2, pq2), s * (v2.x * e2.y - v2.y * e2.x))
  );
  return -sqrt(f.x) * sign(f.y);
}

float map(vec2 p) {
  float d = 1.0;

  d = min(d, sdCirc(p - vec2(-0.4, 0.6), 0.1));
  d = min(d, sdCirc(p - vec2(0.5, -0.3), 0.2));

  d = min(d, sdRect((p - vec2(-0.2, 0.1)) * rot(-u_time * 0.8), 0.1));
  d = min(d, sdRect(p - vec2(0.9, 0.5), 0.1));

  d = min(d, sdLine(p, vec2(-0.7, -0.2), vec2(-0.7, 0.4), 0.025));

  {
    vec2 a = vec2(0.8, -0.2);
    vec2 b = vec2(0.6, 0.2);
    vec2 m = (a + b) / 2.0;
    d = min(d, sdLine((p - m) * rot(u_time * 0.9) + m, a, b, 0.01));
  }

  {
    vec2 a = vec2(-0.2, -0.5);
    vec2 b = vec2(-0.3, -0.7);
    vec2 c = vec2(0.0, -0.6);
    vec2 m = (a + b + c) / 3.0;
    vec2 q = (p - m) * rot(u_time) + m;
    d = min(d, sdTri(q, a, b, c));
    d = min(d, sdCirc(q - a, 0.05));
    d = min(d, sdCirc(q - b, 0.05));
    d = min(d, sdCirc(q - c, 0.05));
  }

  return d;
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

  vec3 col = vec3(0.0);
  float d = 0.0;

  {
    d = map(p);
    col = d < .0 ? NEGATIVE_BG : POSITIVE_BG;
    col *= 1.0 - exp(-50.0 * abs(d));
	  col *= 0.8 + 0.2 * cos(200.0 * d);
    col = mix(col, BORDER, 1.0 - smoothstep(0.0, 0.005, abs(d)));
  }

  {
    vec2 m = vec2(0.0);

    if ( u_mouse_over < 0.01 )
    {
      m = sin( -0.17 * u_time * vec2( 1.1, 1.3 ) + vec2( 0, 2 ) );
    }
    else
    {
      m = (2.0 * u_mouse.xy - u_resolution.xy) / u_resolution.y;
    }

    d = map( m );
    col = mix( col, DISTANCE, 1.0 - smoothstep( 0.0, 0.005, abs( length( p - m ) - abs( d )) - 0.0025 ) );
    col = mix( col, DISTANCE, 1.0 - smoothstep( 0.0, 0.005, length( p - m ) - 0.015 ) );
  }

  gl_FragColor = vec4(col, 1.0);
}
