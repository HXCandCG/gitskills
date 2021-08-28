function demo(cv,frame){
let src = cv.imread(frame);
let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
// You can try more different parameters
console.log(src)
cv.findContours(src, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
// draw contours with random Scalar
console.log(contours)
// for (let i = 0; i < contours.size(); ++i) {
//     let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
//                               Math.round(Math.random() * 255));
//     cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
// }
// cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); contours.delete(); hierarchy.delete();}