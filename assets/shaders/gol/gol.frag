#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_mouse_down;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_frame;

uniform sampler2D u_buffer0;

#define ZOOM          6.0
#define INV_ZOOM      (1.0 / ZOOM)

#define BRUSH_SIZE    (15.0 * INV_ZOOM)
#define BRUSH_SIZE_SQ (BRUSH_SIZE * BRUSH_SIZE)

#define LINE_THICKNESS 1.0

float quickHash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 invR = 1.0 / u_resolution.xy;
    vec2 c    = gl_FragCoord.xy;
    vec2 uv   = c * invR;

#if defined(BUFFER_0)
    float v = texture2D(u_buffer0, uv).r;

    // Initial state: use a random noise pattern.
    if ( u_frame < 4.0 )
    {
      gl_FragColor = vec4(vec3(quickHash(uv) > 0.8 ? 1.0 : 0.0), 1.0);
      return;
    }

    // Mouse interaction
    if (u_mouse_down > 0.0) {
        vec2 mousePos = u_mouse * INV_ZOOM;
        vec2 delta = c - mousePos;
        if (dot(delta, delta) < BRUSH_SIZE_SQ) {
            gl_FragColor = vec4(1.0);
            return;
        }
    }

    // Neighbor sampling
    {
#define SAMPLE( x, y ) \
    float( texture2D( u_buffer0, uv + vec2( x, y ) * invR ).r > 0.0 )
#define NEIGHBORS( x, y ) \
    n += SAMPLE( x, y )

      float n = 0.0;
      NEIGHBORS(-1, -1);
      NEIGHBORS(-1,  0);
      NEIGHBORS(-1,  1);
      NEIGHBORS( 0, -1);
      NEIGHBORS( 0,  1);
      NEIGHBORS( 1, -1);
      NEIGHBORS( 1,  0);
      NEIGHBORS( 1,  1);

#undef SAMPLE
#undef NEIGHBORS

      // Game of Life rules:
      //   - A live cell survives with 2 or 3 live neighbors.
      //   - A dead cell is born with exactly 3 live neighbors.
      float alive   = float(v > 0.0);
      float survive = float(n == 2.0 || n == 3.0);
      float birth   = float(n == 3.0);
      v = mix(v * survive, birth, 1.0 - alive);
    }

    // Age fading
    v -= 0.025 * step(0.4, v);
    v = clamp(v, 0.0, 1.0);

    gl_FragColor = vec4(vec3(v), 1.0);
#else
    // Final display pass
    vec4  simColor = texture2D(u_buffer0, uv * INV_ZOOM);
    float gridLine = 0.0;

    {
// The GRID_EDGE macro computes whether a given coordinate is near a cell boundary.
// It checks both the lower and upper edge for the provided coordinate.
#define GRID_EDGE( coord ) \
      ( max( 1.0 - step( LINE_THICKNESS, ( coord ) ), 1.0 - step( LINE_THICKNESS, ZOOM - ( coord ) ) ) )

      vec2 cellCoord = mod(gl_FragCoord.xy, ZOOM);

      // Determine whether the fragment is on a grid line by checking both axes.
      gridLine = max(GRID_EDGE(cellCoord.x), GRID_EDGE(cellCoord.y));

#undef GRID_EDGE
    }

    // Output Grid + Simulation
    simColor.rgb = mix(simColor.rgb, vec3(0.085), gridLine);
    gl_FragColor = simColor;
#endif
}

