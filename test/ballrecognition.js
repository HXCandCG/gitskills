function ball(cv, frame) {
    let mat = cv.imread(frame);
    let gray = new cv.Mat();
    let dst = new cv.Mat();
    cv.cvtColor(mat, gray, cv.COLOR_BGR2HSV)

    let lower_red = new cv.Mat(mat.rows, mat.cols, mat.type(), [0, 0, 10, 0]);

    let upper_red = new cv.Mat(mat.rows, mat.cols, mat.type(), [170, 160, 160, 255]);

    cv.inRange(mat, lower_red, upper_red, dst);
    cv.bitwise_not(dst, dst)
    //console.log(dst)
    cv.dilate(dst, gray, cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(5, 5), new cv.Point(-1, -1)), new cv.Point(-1, -1), 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    console.log(cv.RETR_EXTERNAL)
    console.log(gray)
    //  gray= new Uint8Array(gray)
    console.log(gray)
    cv.findContours(gray, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)

    console.log(contours.size())
    var prev_c = 0
    var index = 0
    lower_red.delete();
    upper_red.delete();
    mat.delete();
    gray.delete();
    dst.delete();
    contours.delete();
    hierarchy.delete();
    if (contours.size() > 0) {
        for (let i = 0; i < contours.size(); i++) {
            var cnt = contours.get(i)
            let c = cv.contourArea(cnt, false)
            if (i == 0) {
                prev_c = c
                index = i
            }
            if (c > prev_c) {
                prev_c = c
                index = i
            }
        }

        console.log(prev_c)
        console.log(index)
        let circle = cv.minEnclosingCircle(contours.get(index))
        console.log(circle.center.x)
        // let circleColor = new cv.Scalar(255, 255, 0)
        // cv.circle(gray, circle.center, circle.radius, circleColor);
        // cv.imshow('canvasOutput', gray)

        return circle.center.x
    } else {
        return -1
    }

}
