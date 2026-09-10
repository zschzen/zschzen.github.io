#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float sdCircle(in vec2 p, in float r)
{
    return length(p) - r;
}

void main()
{
    // UVs remapeadas para que (0,0) fique no centro
    vec2 p = (2.*gl_FragCoord.xy-u_resolution.xy)/u_resolution.xy;
    vec3 color = vec3(.0);

    // Mostra as coordenadas do espaço no fundo
    //color = vec3(p,0.);

	// Adicione a forma em primeiro plano
    float d = sdCircle(p, .5);
    color = mix(color, vec3(1.), 1.0 - smoothstep(0.0, 0.01, d));

    gl_FragColor = vec4(color, 1.);
    //gl_FragColor = vec4(d,d,d, 1.);
}
