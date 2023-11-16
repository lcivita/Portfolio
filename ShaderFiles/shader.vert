attribute vec3 aPosition; //used for gl_Position
attribute vec2 aTexCoord; //takes in texture coordinates (0,1) range

varying vec2 vTexCoord; //varying marks that this will be carried to the  fragment shader

void main() {

    vTexCoord = aTexCoord;

    //figures out how to put the rect quad on the screen
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
}