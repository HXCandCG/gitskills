import numpy as np
import cv2
import time
import datetime


def detect(frame):
    """
    :param frame: 640*480 jpeg image
    :return: x coordinate of ball in image
    """
    hue_image = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)  # RGB色彩转化为HSV
    lower_red = np.array([0, 127, 128])
    upper_red = np.array([10, 255, 240])
    mask0 = cv2.inRange(hue_image, lower_red, upper_red)
    # upper mask (170-180)
    lower_red = np.array([150, 80, 50])
    upper_red = np.array([179, 229, 229])
    mask1 = cv2.inRange(hue_image, lower_red, upper_red)

    # join my masks

    mask = mask0 + mask1
    dilated = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)), iterations=1)
    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]

    if len(cnts) > 0:
        c = max(cnts, key=cv2.contourArea)
        ((x, y), radius) = cv2.minEnclosingCircle(c)
        circle_x = int(x)
        circle_y = int(y)
        if radius > 15:
            cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
            return circle_x
        else:
            return -1
    else:
        return -1


