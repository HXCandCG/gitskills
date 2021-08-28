function test(cv,frame){
    let src = cv.imread(frame);
let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8U);
let circles = new cv.Mat();
let color = new cv.Scalar(255, 0, 0);
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
// You can try more different parameters
cv.HoughCircles(src, circles, cv.HOUGH_GRADIENT,
                1, 45, 75, 40, 0, 0);
                console.log(circles.cols)
               
// draw circles

    let x = circles.data32F[0 * 3];
    let y = circles.data32F[0 * 3 + 1];
    let radius = circles.data32F[0 * 3 + 2];
    let center = new cv.Point(x, y);
    cv.circle(dst, center, radius, color);

 cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); circles.delete();

}