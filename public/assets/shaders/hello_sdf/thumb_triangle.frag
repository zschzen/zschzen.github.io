#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_mouse_over;

const vec3 POSITIVE_BG = vec3( 0.3843, 0.4471, 0.6431 );
const vec3 NEGATIVE_BG = vec3( 1.0   , 0.3333, 0.3333 );
const vec3 DISTANCE    = vec3( 0.9450, 0.9803, 0.5490 );
const vec3 BORDER      = vec3( 0.9725, 0.9725, 0.9490 );

const float ZOOM = 1.4;

mat2
rot2D( float a )
{
    float s = sin( a );
    float c = cos( a );

    return mat2( c, -s, s, c );
}

vec3 sdfSegment(vec2 P, float a) {
    float Px = P.x;
    float Py = P.y;

    // Initialize sdf1 with a large value
    float sdf1 = 1e20;

    // Compute sdf1 only if Px is within the bounds [-a, a]
    if (-a <= Px && Px <= a) {
        sdf1 = abs(Py);
    }

    // Distance to the nearest endpoint
    vec2 endpoint1 = vec2(-a, 0.0);
    vec2 endpoint2 = vec2(a, 0.0);
    float distToEndpoint1 = length(P - endpoint1);
    float distToEndpoint2 = length(P - endpoint2);
    float sdf2 = min(distToEndpoint1, distToEndpoint2);

    // Determine the minimum SDF
    float sdf = min(sdf1, sdf2);

    // Return both SDFs and the minimum SDF
    return vec3(sdf, sdf1, sdf2);
}

vec3 sdEquilateralTriangle(vec2 P, float size) {
    const float sqrt3 = 1.73205080757; // sqrt(3)
    float halfSize = size * 0.5;

    // Define the three vertices of the equilateral triangle
    vec2 p0 = vec2(0.0, size * sqrt3 / 3.0);
    vec2 p1 = vec2(-halfSize, -size * sqrt3 / 6.0);
    vec2 p2 = vec2(halfSize, -size * sqrt3 / 6.0);

    // Transform the point to the local coordinate system of each edge
    vec2 v0 = p1 - p0;
    vec2 v1 = p2 - p1;
    vec2 v2 = p0 - p2;

    vec2 localP0 = P - (p0 + p1) * 0.5;
    vec2 localP1 = P - (p1 + p2) * 0.5;
    vec2 localP2 = P - (p2 + p0) * 0.5;

    // Rotate the local points to align with the edges
    float angle0 = atan(v0.y, v0.x);
    float angle1 = atan(v1.y, v1.x);
    float angle2 = atan(v2.y, v2.x);

    vec3 s0 = sdfSegment(rot2D(angle0) * localP0, halfSize);
    vec3 s1 = sdfSegment(rot2D(angle1) * localP1, halfSize);
    vec3 s2 = sdfSegment(rot2D(angle2) * localP2, halfSize);

    float sdf = min(min(s0.x, s1.x), s2.x);
    float sdfEdge = min(min(s0.y, s1.y), s2.y);
    float sdfCorner = min(min(s0.z, s1.z), s2.z);

    return vec3(sdf, sdfEdge, sdfCorner);
}

void main() {
  vec2 p = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.xy;
  p *= ZOOM;

  vec3 col = vec3(0.0);
  float d = 0.0;

  {
    vec3 eqTri = sdEquilateralTriangle(p, 1.0);
    d = eqTri.x;
    col = eqTri.y == d ? NEGATIVE_BG : POSITIVE_BG;
    col *= 1.0 - exp(-10.0 * abs(d));
    col *= 0.8 + 0.2 * cos(50.0 * d );
    col = mix(col, BORDER, 1.0 - smoothstep(0.0, 0.025, abs(d)));
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
        m *= ZOOM;
    }
      
    d = sdEquilateralTriangle(m, 1.0).x;
    float pm = length(p - m);
    col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.01, abs(pm - abs(d)) - 0.0025));
    col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.01, pm - 0.015));
  }

  gl_FragColor = vec4(col,1.0);
}
