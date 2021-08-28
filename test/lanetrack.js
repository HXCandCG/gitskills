
function lanetrack(cv, frame) {
    let i = cv.imread(frame);
    let gray = new cv.Mat();
    cv.cvtColor(i, gray, cv.COLOR_BGR2GRAY) 

    cv.threshold(gray, gray, 100, 255, cv.THRESH_BINARY)


    let M = cv.Mat.ones(5, 5, cv.CV_8U);
    cv.dilate(gray, gray, M, new cv.Point(-1, -1), 2, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())


    cv.erode(gray, gray, M, new cv.Point(-1, -1), 2, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())


    img_row = gray.rows
    img_col = gray.cols
    dst_row = Math.ceil(img_row * 0.9)
    console.log("dst_row %d", dst_row)

    let color = []
    dst_col_start = Math.ceil(img_col * 0.2)
    dst_col_end = Math.ceil(img_col * 0.8)
    for (let i = dst_col_start; i < dst_col_end; i++) {
        //color.push(gray.data[dst_row * img_col + i])
        color.push(gray.ucharAt(dst_row, i))
    }
    console.log(color)

    let white_count = 0
    let white_index = []
    for (let i = 0; i < color.length; i++) {
        if (color[i] == 255) {
            white_count++,
                white_index.push(i)
        }
    }
    console.log(white_count)
    i.delete();
    gray.delete();
    M.delete();
    if (white_count > 0) {
        var center = (white_index[white_count - 1] + white_index[0]) / 2 + dst_col_start
        console.log("center %d", center)


        return center

    } else {
        return -1
    }
}