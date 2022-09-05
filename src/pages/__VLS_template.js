export default (await import('vue')).defineComponent({
name: 'PageCamera',
data() {
return {
enableCamera: false,
cameraStart: false,
imageCapture: null,
track: null
};
},
mounted() {
if (navigator.mediaDevices.getUserMedia) {
this.enableCamera = true;
}
},
methods: {
useCamera() {
navigator.mediaDevices.getUserMedia({ video: true })
.then(mediaStream => {
this.cameraStart = true;
this.$refs.videoplay.srcObject = mediaStream;
this.track = mediaStream.getVideoTracks()[0];
this.imageCapture = new ImageCapture(this.track);
});
},
takePhoto() {
this.imageCapture.takePhoto()
.then(blob => {
createImageBitmap(blob);
const reader = new FileReader();
reader.readAsDataURL(blob);
reader.onloadend = () => {
this.$refs.imgTakePhoto.src = reader.result;
console.log(reader.result);
};
})
.catch(error => console.log(error));
}
}
});
function __VLS_template() {
// @ts-ignore
[videoplay, cameraStart, enableCamera, useCamera, takePhoto, imgTakePhoto];
return {};
}
