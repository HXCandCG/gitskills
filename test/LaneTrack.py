import cv2
import numpy as np
import time


def detect(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    retval, dst = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)
    dst = cv2.dilate(dst, None, iterations=2)
    dst = cv2.erode(dst, None, iterations=6)
    # 单看第400行的像素值v
    color = dst[400]  # 取图像下1/4部为小车行驶方向判断点
    # 找到白色的像素点个数，如寻黑色，则改为0，白色为255
    white_count = np.sum(color == 255)
    # 找到白色的像素点索引，如寻黑色，则改为0，白色为255
    white_index = np.where(color == 255)
    # 防止white_count=0的报错
    if white_count == 0:
        white_count = 1
    # 找到黑色像素的中心点位置
    # 计算方法应该是边缘检测，计算白色边缘的位置和/2，即是白色的中央位置。
    center = (white_index[0][white_count - 1] + white_index[0][0]) / 2

    return center
