#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_mouse_down;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_frame;

uniform sampler2D u_buffer0;

#define ZOOM          1.0
#define INV_ZOOM      (1.0 / ZOOM)
#define BRUSH_SIZE    (20.0 * INV_ZOOM)

float quickHash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898 + u_time, 78.233 - u_time))) * 43758.5453);
}

void main() {
    vec2 invR = 1.0 / u_resolution.xy;
    vec2 c    = gl_FragCoord.xy;
    vec2 uv   = c * invR;

#if defined(BUFFER_0)
    vec4 v = texture2D(u_buffer0, uv);
    v.z    = (v.z + v.x) * 0.95;

    // Initial state: use a random noise pattern.
    if (u_frame < 1.0 || (u_mouse_down > 0.0 && length((u_mouse * INV_ZOOM) - c) < BRUSH_SIZE))
    {
        v.x = quickHash(uv) > 0.8 ? 1.0 : 0.0;
        gl_FragColor = v;
        return;
    }

    // Neighbor sampling
    {
#define NEIGHBORS( x, y ) \
    n += texture2D( u_buffer0, ( c + vec2( x, y ) ) * invR ).r

      float n = 0.0;
      NEIGHBORS(-1, -1);
      NEIGHBORS(-1,  0);
      NEIGHBORS(-1,  1);
      NEIGHBORS( 0, -1);
      NEIGHBORS( 0,  1);
      NEIGHBORS( 1, -1);
      NEIGHBORS( 1,  0);
      NEIGHBORS( 1,  1);

#undef NEIGHBORS

      // Game of Life rules
      if (n < 2.0 || n > 3.0)
      {
          v.x = 0.0;
      }
      else if (n == 3.0)
      {
          v.x = 1.0;
      }

    }

    gl_FragColor = v;
#else
    // Final display pass
    gl_FragColor = vec4(texture2D(u_buffer0, uv * INV_ZOOM).xxz, 1.0);
#endif
}

