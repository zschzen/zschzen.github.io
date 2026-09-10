#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_mouse_over;

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
    fIsDigit = PrintValue((fragCoord - vPixelCoord) / vFontSize, fValue, fDigits, fDecimalPlaces);
    vColour = mix(vColour, 1.0 - vColour, fIsDigit);
    
    // Print Mouse Y
    vPixelCoord = iMouse + vec2(0.0, 6.0);
    fValue = iMouse.y / iResolution.y;
    fIsDigit = PrintValue((fragCoord - vPixelCoord) / vFontSize, fValue, fDigits, fDecimalPlaces);
    vColour = mix(vColour, 1.0 - vColour, fIsDigit);
    
    return vColour;
}

void main() {
    vec2 original = gl_FragCoord.xy / u_resolution.xy;
    vec2 remapped = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    float t = 0.5 + 0.5 * sin(u_time);
    vec2 p = mix(original, remapped, t);

    vec3 vColour = vec3(p.xy, 0.0);

    if ( u_mouse_over > 0.0 )
    {
        vColour = PrintMouseCoord(vColour, gl_FragCoord.xy, u_resolution, u_mouse);
        vec2 normMouse = u_mouse.xy / u_resolution.xy;
        vec2 dirMouse = normMouse-original;
        vec2 clamped = 1.0-step(abs(dirMouse), vec2(1.0)/u_resolution.x);
        vec3 negColor = 1.0-vColour;
        vColour = mix(negColor,vColour,clamped.x*clamped.y);
    }
    else
    {
        vec2 dirMouse = p;
        vec2 clamped = 1.0-step(abs(dirMouse), vec2(1.0)/u_resolution.x);
        vec3 negColor = 1.0-vColour;
        vColour = mix(negColor,vColour,clamped.x*clamped.y);
    }

    {
        float d = mix(0., 0.5, sin(t));
        vColour = PrintCoord(vColour, 0.0, vec2(d * u_resolution.x + 15.0, .0), gl_FragCoord.xy);
        vColour = PrintCoord(vColour, 0.0, vec2(.0, d * u_resolution.y + 15.0), gl_FragCoord.xy);
    }

    gl_FragColor = vec4(vColour, 1.0);
}