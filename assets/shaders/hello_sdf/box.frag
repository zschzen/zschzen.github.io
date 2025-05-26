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


float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs( p ) - b;
    return length( max( d, 0.0 ) ) + min( max( d.x, d.y ), 0.0 );
}

void main() {
	vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
	float zoom = 1.5;
	p *= zoom;

	vec2 v1 = cos( vec2( 1.5 * ( .5 + .5 * cos( u_time ) ), .75 * ( .5 + .5 * sin( u_time ) ) ) );

	float d = sdBox(p, v1);

    vec3 col = d < .0 ? NEGATIVE_BG : POSITIVE_BG;
    col *= 1.0 - exp(-10.0 * abs(d));
    col *= 0.8 + 0.2 * cos(50.0 * d );
    col = mix(col, BORDER, 1.0 - smoothstep(0.0, 0.025, abs(d)));

    {
        vec2 m = vec2(0.0);

        if ( u_mouse_over < 0.01 )
        {
            m = sin( -0.17 * u_time * vec2( 1.1, 1.3 ) + vec2( 0, 2 ) );
        }
        else
        {
            m = (2.0 * u_mouse.xy - u_resolution.xy) / u_resolution.y;
            m *= zoom;
        }

        d = sdBox(m, v1);
        float pm = length(p - m);
        col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.05, abs(pm - abs(d)) - 0.0025));
        col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.05, pm - 0.015));
    }
    
	gl_FragColor = vec4(col, 1.);
}