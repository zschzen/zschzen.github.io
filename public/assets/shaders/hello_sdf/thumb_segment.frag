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

float sdCircle(in vec2 p, in float r)
{
    return length(p) - r;
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



void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.xy;
    p /= 1.5;
    
    float radius = 0.35;

    // SDF do círculo
    vec3 sLine = sdfSegment(p, radius);

    // Cor do fragmento baseado na distância ao círculo
    vec3 color = vec3(.0);

    // Coloring
    color  = sLine.x == sLine.y ? POSITIVE_BG : NEGATIVE_BG;
    color *= 1.0 - exp(-10.0 * abs(sLine.x));
    color *= 0.8 + 0.2 * cos(150.0 * sLine.x + (u_time * 7.0 * ( sLine.x / abs(sLine.x) ) ) );
    color  = mix(color, BORDER, 1.0 - smoothstep(0.0, 0.01, abs(sLine.x)));
    
    {
        vec2 m = vec2(0.0);

        if ( u_mouse_over < 0.01 )
        {
            m = sin( -0.17 * u_time * vec2( 1.1, 1.3 ) + vec2( 0, 2 ) );
        }
        else
        {
            m = (2.0 * u_mouse.xy - u_resolution.xy) / u_resolution.y;
            m /= 1.5;
        }

        sLine = sdfSegment(m, radius);
        float pm = length(p - m);
        color = mix(color, DISTANCE, 1.0 - smoothstep(0.0, 0.01, abs(pm - abs(sLine.x)) - 0.0025));
        color = mix(color, DISTANCE, 1.0 - smoothstep(0.0, 0.01, pm - 0.015));
    }
    
    
    gl_FragColor = vec4(color,1.0);
}