#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_mouse_over;
uniform float u_time;

const vec3 POSITIVE_BG = vec3( 0.3843, 0.4471, 0.6431 );
const vec3 NEGATIVE_BG = vec3( 1.0   , 0.3333, 0.3333 );
const vec3 DISTANCE    = vec3( 0.9450, 0.9803, 0.5490 );
const vec3 BORDER      = vec3( 0.9725, 0.9725, 0.9490 );

vec2 cloBox( in vec2 p, in vec2 b )
{
    vec2   s = sign(p);
    vec2   w = abs(p) - b;
    float  g = max(w.x,w.y);
    float  m = min(0.0,g);
    return p - vec2(w.x>=m?w.x:0.0,w.y>=m?w.y:0.0)*s;
}


float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs( p ) - b;
    return length( max( d, 0.0 ) ) + min( max( d.x, d.y ), 0.0 );
}

float DigitBin(const int x) {
    if (x == 0) return 480599.0;
    if (x == 1) return 139810.0;
    if (x == 2) return 476951.0;
    if (x == 3) return 476999.0;
    if (x == 4) return 350020.0;
    if (x == 5) return 464711.0;
    if (x == 6) return 464727.0;
    if (x == 7) return 476228.0;
    if (x == 8) return 481111.0;
    if (x == 9) return 481095.0;
    return 0.0;
}

float PrintValue( vec2 vStringCoords, float fValue, float fMaxDigits, float fDecimalPlaces )
{       
    if ((vStringCoords.y < 0.0) || (vStringCoords.y >= 1.0)) return 0.0;
    
    bool bNeg = ( fValue < 0.0 );
	fValue = abs(fValue);
    
	float fLog10Value = log2(abs(fValue)) / log2(10.0);
	float fBiggestIndex = max(floor(fLog10Value), 0.0);
	float fDigitIndex = fMaxDigits - floor(vStringCoords.x);
	float fCharBin = 0.0;
	if(fDigitIndex > (-fDecimalPlaces - 1.01)) {
		if(fDigitIndex > fBiggestIndex) {
			if((bNeg) && (fDigitIndex < (fBiggestIndex+1.5))) fCharBin = 1792.0;
		} else {		
			if(fDigitIndex == -1.0) {
				if(fDecimalPlaces > 0.0) fCharBin = 2.0;
			} else {
                float fReducedRangeValue = fValue;
                if(fDigitIndex < 0.0) { fReducedRangeValue = fract( fValue ); fDigitIndex += 1.0; }
				float fDigitValue = (abs(fReducedRangeValue / (pow(10.0, fDigitIndex))));
                fCharBin = DigitBin(int(floor(mod(fDigitValue, 10.0))));
			}
        }
	}
    return floor(mod((fCharBin / pow(2.0, floor(fract(vStringCoords.x) * 4.0) + (floor(vStringCoords.y * 5.0) * 4.0))), 2.0));
}

vec3 PrintCoord(vec3 vColour, float fValue, vec2 offset, vec2 fragCoord) {
    vec2 vPixelCoord = offset;
    vec2 vFontSize = vec2(8.0, 15.0);
    float fDigits = 1.0;
    float fDecimalPlaces = 0.0;
    float fIsDigit = PrintValue((fragCoord - vPixelCoord) / vFontSize, fValue, fDigits, fDecimalPlaces);
    vColour = mix(vColour, 1.0-vColour, fIsDigit);
    return vColour;
}

vec3 PrintMouseCoord(vec3 vColour, vec2 fragCoord, vec2 iResolution, vec2 iMouse) {
    vec2 vFontSize = vec2(8.0, 15.0);
    vec2 vPixelCoord;
    float fValue;
    float fIsDigit;
    float fDigits = 1.0;
    float fDecimalPlaces = 3.0;

    // Print Mouse X
    vPixelCoord = iMouse + vec2(-52.0, 6.0);
    fValue = iMouse.x / iResolution.x;
    fValue = mod(fValue * 2., 1.0);
    fIsDigit = PrintValue((fragCoord - vPixelCoord) / vFontSize, fValue, fDigits, fDecimalPlaces);
    vColour = mix(vColour, 1.0 - vColour, fIsDigit);
    
    // Print Mouse Y
    vPixelCoord = iMouse + vec2(0.0, 6.0);
    fValue = iMouse.y / iResolution.y;
    fIsDigit = PrintValue((fragCoord - vPixelCoord) / vFontSize, fValue, fDigits, fDecimalPlaces);
    vColour = mix(vColour, 1.0 - vColour, fIsDigit);
    
    return vColour;
}


void main()
{
    // Normalize fragment coordinates
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.xx;
    uv.x = mod(uv.x, 1.0) - 0.5;

    // Displacement based on time
    float disp = 1. - 0.5 * sin(u_time);

    vec2 m;
    if ( u_mouse_over < 0.01 )
    {
        vec2 t = vec2( disp + 0.5, disp - 0.5);
        m = 0.2 + t * vec2(sin(u_time) + 1.0, -cos(u_time) + 1.0) * 0.5;
    } else {
        m = (2.0 * u_mouse.xy - u_resolution.xy) / u_resolution.x;
    }
    m.x = mod(m.x, 1.0) - .5;

    // Calculate direction and clamped values
    vec2 clampVal = 1.0 - step(abs(m - uv), vec2(1.0) / u_resolution.x);

    uv /= disp;
    m /= disp;

    // Initialize background color
    vec3 col = vec3(0.0);
    if (gl_FragCoord.x >= u_resolution.x * 0.5) {
        // Right side

        // Distance to box
        float d = sdBox(uv, vec2(0.1));
        col = d > 0.01 ? POSITIVE_BG : NEGATIVE_BG;

        // Apply exponential falloff and color modulation
        col *= 1.0 - exp(-10.0 * abs(d));
        col *= 0.8 + 0.1 * cos(150.0 * d);

        // Mix with border color
        col = mix(col, BORDER, 1.0 - smoothstep(0.0, 0.01, abs(d)));

        // Additional distance calculations and color mixing
        d = sdBox( m, vec2(0.1) );
        float pm = length( uv - m );
        col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.01, abs(pm - abs(d)) - 0.0025));
        col = mix(col, DISTANCE, 1.0 - smoothstep(0.0, 0.01, pm - 0.015));
    } else {
        // Left side

        // Set color based on UV coordinates
        col = vec3(uv.xy, 0.0);

        // Invert and mix color based on clamped values
        vec3 invCol = 1.0 - col;
        col = mix(invCol, col, clampVal.x * clampVal.y);
    }

    // Highlight closest point on box
    {
    vec2 cl = cloBox(m, vec2(0.1));
    col = mix(col, vec3(1.0, 0.0, 0.0), 1.0 - smoothstep(0.0, 0.01, length(uv - cl) - 0.025));
    }

    // Print mouse coordinates if mouse is over
    if (u_mouse_over > 0.01) {
        col = PrintMouseCoord(col, gl_FragCoord.xy, u_resolution, u_mouse);
    }

    // Set fragment color
    gl_FragColor = vec4(col, 1.0);
}
