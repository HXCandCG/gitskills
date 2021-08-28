function glane(cv, frame){
    
    var start_flag=0
    let mat = cv.imread(frame);
    let gray = new cv.Mat();
    let dst = new cv.Mat();
    cv.cvtColor(mat, gray, cv.COLOR_BGR2HSV)

    let lower_red = new cv.Mat(mat.rows, mat.cols, mat.type(), [0, 0, 10, 0]);

    let upper_red = new cv.Mat(mat.rows, mat.cols, mat.type(), [170, 160, 160, 255]);

    cv.inRange(mat, lower_red, upper_red, dst);
    cv.bitwise_not(dst, dst)
 
    cv.dilate(dst, gray, cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(5, 5), new cv.Point(-1, -1)), new cv.Point(-1, -1), 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    console.log(cv.RETR_EXTERNAL)
    console.log(gray)
    
    console.log(gray)
    cv.findContours(gray, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)

    console.log(contours.size())
    cv.imshow('canvasOutput', gray)
    lower_red.delete();
    upper_red.delete();
    mat.delete();
    gray.delete();
    dst.delete();
    hierarchy.delete();
    if(contours.size()>0){
        start_flag=1
    }
    contours.delete();
    console.log(start_flag)
    return start_flag
    

}