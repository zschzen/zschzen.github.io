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

// Signed distance function for a circle
float sdCircle(in vec2 p, in float r)
{
    return length(p) - r;
}

// Signed distance function for a box
float sdBox(in vec2 p, in vec2 b)
{
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdEquilateralTriangle( in vec2 p, in float r )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
}

float sdRoundedX( in vec2 p, in float w, in float r )
{
    p = abs(p);
    return length(p-min(p.x+p.y,w)*0.5) - r;
}

// Combined signed distance function for the shape
float sdShape(in vec2 p, in float r)
{
    float dCircle = sdCircle(p, r);
    float dTriangle = sdEquilateralTriangle(p, r);
    float dStar = sdRoundedX(p, r * 1.25, r * 0.25);
    float dHeart = sdBox(p, vec2(0.5));

    float progress = fract(u_time * 0.125);
    float tSpeed = 0.125;
    float tStatic = (1.0 - tSpeed * 4.0) / 4.0;
    float shapeDuration = tStatic + tSpeed;

    float d = mix(dCircle, dTriangle, smoothstep(0.0, tSpeed, progress));
    d = mix(d, dStar, smoothstep(shapeDuration, shapeDuration + tSpeed, progress));
    d = mix(d, dHeart, smoothstep(shapeDuration * 2.0, shapeDuration * 2.0 + tSpeed, progress));
    d = mix(d, dCircle, smoothstep(shapeDuration * 3.0, shapeDuration * 3.0 + tSpeed, progress));

    return d;
}

void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.xy;

    float d = sdShape(p, 0.5);

    // Coloring
    vec3 col = d < .0 ? NEGATIVE_BG : POSITIVE_BG;
    col *= 1.0 - exp(-10.0 * abs(d));
    {
        float _LineDistance = .2; // Distância entre as linhas
        float _LineThickness = 0.005; // Espessura das linhas
        float _SubLines = 3.; // Número de sublinhas
        float _SubLineThickness = _LineThickness * 0.05; // Espessura das sublinhas

        float distanceChange = .01;
        float majorLineDistance = abs(fract(d / _LineDistance + (0.5*u_time * (d / abs(d)))) - 0.5) * _LineDistance;
        float majorLines = smoothstep(_LineThickness - distanceChange, _LineThickness + distanceChange, majorLineDistance);

        float distanceBetweenSubLines = _LineDistance / _SubLines;
        float subLineDistance = abs(fract(d / distanceBetweenSubLines + (0.5*u_time * _SubLines * (d / abs(d)))) - 0.5) * distanceBetweenSubLines;
        float subLines = smoothstep(_SubLineThickness - distanceChange, _SubLineThickness + distanceChange, subLineDistance);

        col *= majorLines * subLines;
    }
    col = mix(col, BORDER, 1.0 - smoothstep(0.0, 0.01, abs(d)));

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

        d = sdShape(m, 0.5);
        float pm = length(p - m);
        col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.005, abs(pm - abs(d)) - 0.0025));
        col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.005, pm - 0.015));
    }

    gl_FragColor = vec4(col, 1.0);
}
