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
const vec3 EDGE_BG     = vec3( 0.3137, 0.9803, 0.4823 );

float sdfLineSegment(vec2 P, float a) {
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

    // Return the minimum SDF
    return min(sdf1, sdf2);
}

// Function to compute the SDF for a filled square
float sdfSquare(vec2 P, float a) {
    // Compute the SDFs for each edge of the square
    float sdfTop = sdfLineSegment(P - vec2(0.0, a), a);
    float sdfBottom = sdfLineSegment(P - vec2(0.0, -a), a);
    float sdfLeft = sdfLineSegment(vec2(P.y, P.x) - vec2(0.0, a), a);
    float sdfRight = sdfLineSegment(vec2(P.y, P.x) - vec2(0.0, -a), a);

    // Return the minimum SDF of the edges
    return min(min(sdfTop, sdfBottom), min(sdfLeft, sdfRight));
}

void main() {
    vec2 P = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.xy;
    float a = 0.5; // Half-length of the square's side
    float sdf = sdfSquare(P, a);

    vec3 color;
    vec3 lineColor = vec3(1.0, 0.0, 0.0);  // Color for line SDF
    vec3 endpointColor = vec3(0.0, 0.0, 1.0);  // Color for endpoint SDF
    vec3 insideColor = vec3(0.0, 1.0, 0.0);  // Color for inside the square

    // Determine if the point is inside the square
    bool insideSquare = (-a <= P.x && P.x <= a && -a <= P.y && P.y <= a);

    // Determine if the point is in one of the corners
    float cornerThreshold = 0.1 * a; // You can adjust this value to change the size of the corner regions
    bool insideInCorner = (abs(P.x) > a - cornerThreshold && abs(P.y) > a - cornerThreshold);

    // Determine the color based on the SDF type
    if (insideSquare) {
        color = NEGATIVE_BG;
    } else {
        if (insideInCorner) {
            color = POSITIVE_BG;
        } else {
            color = EDGE_BG;
        }
    }

    // Apply the coloring logic
    color *= 1.0 - exp(-10.0 * abs(sdf));
    color *= 0.8 + 0.2 * cos(75.0 * sdf + (u_time * 7.0 * (sdf / abs(sdf))));
    color = mix(color, BORDER, 1.0 - smoothstep(0.0, 0.01, abs(sdf)));

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

        sdf = sdfSquare(m, a);
        float pm = length(P - m);
        color = mix(color, DISTANCE, 1.0 - smoothstep(0.0, 0.01, abs(pm - abs(sdf)) - 0.0025));
        color = mix(color, DISTANCE, 1.0 - smoothstep(0.0, 0.01, pm - 0.015));
    }

    // Output the color
    gl_FragColor = vec4(color, 1.0);
}