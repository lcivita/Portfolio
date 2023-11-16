precision mediump float;
#define PI 3.14159265

uniform vec2 u_resolution; 
uniform float u_time;

float hash21(vec2 v){
  return fract(23425.32 * sin(v.x*542.02 + v.y * 456.834));
}

float hash212(vec2 v) {
  return fract(134182.2374 * sin(v.x*147873.23476 + v.y * 243648.45));
}

float noise21(vec2 uv){
  
  vec2 scaleUV = floor(uv);
  vec2 unitUV = fract(uv);
  
  vec2 noiseUV = scaleUV;
  
  float value1 = hash21(noiseUV);
  float value2 = hash21(noiseUV + vec2(1.,0.));
  float value3 = hash21(noiseUV + vec2(0.,1.));
  float value4 = hash21(noiseUV + vec2(1.,1.));
  
  unitUV = smoothstep(vec2(0.),vec2(1.),unitUV);
  
  float bresult = mix(value1,value2,unitUV.x);
  float tresult = mix(value3,value4,unitUV.x);
  
  return mix(bresult,tresult,unitUV.y);
}

float fBM(vec2 uv){
  float result = 0.;
  for(int i = 0; i <  8; i++){
    result = result + (noise21(uv * pow(2.,float(i))) / pow(2.,float(i)+1.));
  }
  
  return result;
}

float sdUnevenCapsule( vec2 p, float r1, float r2, float h )
{
    p.x = abs(p.x);
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(p,vec2(-b,a));
    if( k < 0.0 ) return length(p) - r1;
    if( k > a*h ) return length(p-vec2(0.0,h)) - r2;
    return dot(p, vec2(a,b) ) - r1;
}

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution;
  
  // used late in step function. Makes step requirement higher as going away from source
  float fireSensitivity = distance(vec2(.5, 0.),st);
  
  // float fireMask1 = sdUnevenCapsule(st - vec2(.5,.2), 0.05, 0.001, 0.4) * 2.;
  
  // scroll noise
  st.y -= u_time / 1000.; 
  
  
  
  // scale for noise
  float scale = 13.;
  vec2 scaledSt = st * scale;
  vec2 stID = floor(scaledSt);
  vec2 stUV = fract(scaledSt);
  
  
  // noise
  float fireNoise = noise21(scaledSt);
  
  float fireMask = step(.5, fireNoise);
  
  // fire masks
  float bigFireMask = step(fireSensitivity * 1.5, fireNoise);
  float mediumFireMask = step(fireSensitivity * 2., fireNoise);
  float smallFireMask = step(fireSensitivity * 3.0, fireNoise);
  
  // making each mask not overlap others. Could have probably used max min stuff idk
  bigFireMask *= 1. - mediumFireMask;
  mediumFireMask *= 1. - smallFireMask;
  
  // combining masks
  vec3 combinedFire = vec3(bigFireMask) * vec3(1., 0.25, 0.) // red
    + vec3(mediumFireMask) * vec3 (1., .5, 0.) // orange
    + vec3(smallFireMask) * vec3(1., 1., 0.); // yellow
  
  // output
  gl_FragColor = vec4(combinedFire,1.);
  //gl_FragColor = vec4(vec3(noise21(scaledSt)),1.);
}
