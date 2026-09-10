#ifdef GL_ES
precision mediump float;
#endif

const vec3 BG_COLOR      = vec3( 0.9450, 0.9803, 0.5490 );
const vec3 BORDER_COLOR  = vec3( 0.9725, 0.9725, 0.9490 );
const vec3 POSITIVE_BG = vec3( 0.3843, 0.4471, 0.6431 );
const vec3 NEGATIVE_BG = vec3( 1.0   , 0.3333, 0.3333 );
const vec3 DIST_COLOR    = vec3( 0.9450, 0.9803, 0.5490 );

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouse_over;

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs( p ) - b;
    return length( max( d, 0.0 ) ) + min( max( d.x, d.y ), 0.0 );
}

float operation( in float c0, in float c1 )
{
    return max(c0, c1);
}

void main() {
    float t = 0.5 * sin( 0.5 * u_time - 0.5);
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.xy;

    float c0 = circle(st - vec2( + t, 0.), 0.5);
    float c1 = sdBox(st - vec2( - t, 0.), vec2(0.5));

    float v = operation( c0, c1 );
    
    vec3 color = ( v > 0.0 ) ? POSITIVE_BG : NEGATIVE_BG;
    color *= 1.0 - exp( -30.0 * abs( v ) );
    color *= .8 + 0.2 * cos(90.0 * v);
    color *= 1.0 - exp( -60.0 * abs( v ) );
    color = mix( color, BORDER_COLOR, 1.0 - smoothstep( 0.0, 0.01, abs( v ) ) );

  {
    vec2 m;

    if ( u_mouse_over < 0.01 )
    {
      m = sin( -0.17 * u_time * vec2( 1.1, 1.3 ) + vec2( 0, 2 ) );
    }
    else
    {
      m = (2.0 * u_mouse.xy - u_resolution.xy) / u_resolution.y;
    }

    c0 = circle(m - vec2( + t, 0.), 0.5);
    c1 = sdBox(m - vec2( - t, 0.), vec2(0.5));

    v = operation( c0, c1 );

    color = mix( color, DIST_COLOR, 1.0 - smoothstep( 0.0, 0.01, abs( length( st - m ) - abs( v )) - 0.0025 ) );
    color = mix( color, DIST_COLOR, 1.0 - smoothstep( 0.0, 0.01, length( st - m ) - 0.015 ) );
  }

    gl_FragColor = vec4(color, 1.0);
}
