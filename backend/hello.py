import numpy as np
import cv2
import sys
  
# define a video capture object
name = sys.argv[1]
stroke = sys.argv[2]
height44=sys.argv[3]
width44=sys.argv[4]

if stroke=="red":
    stroke_coordinates = (0,0,255)
elif stroke=="green":
     stroke_coordinates = (0,255,0)
else: 
    stroke_coordinates = (255,0,0)       
# Save image in set directory
# Read RGB image
image = cv2.imread(name) 
gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY) 
edged = cv2.Canny(image, 10, 250) 
(cnts, _) = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE) 

c = max(cnts, key = cv2.contourArea)


x,y,w,h = cv2.boundingRect(c)

rect = cv2.minAreaRect(c)
(x42, y42), (width, height), angle = rect
print(rect)
box = cv2.boxPoints(rect) 
x_max = int(np.max(box[:,0]))
x_min = int(np.min(box[:,0]))
y_max = int(np.max(box[:,1]))
y_min = int(np.min(box[:,1]))
width=int(x_max-x_min)
height=int(y_max-y_min)
cx=int((x_min + x_max) // 2)
cy=int((y_min + y_max) // 2)
box = np.int0(box)

rect1= (cx-int(width/2),cy),(int(width44), int(height44)),angle
box1 = cv2.boxPoints(rect1)
box1 = np.int0(box1)
print(box1)

cv2.drawContours(image,[box1],0,stroke_coordinates,cv2.FILLED)

rect2= (cx+int(width/2),cy),(int(width44), int(height44)),angle
box2 = cv2.boxPoints(rect2)
box2 = np.int0(box2)
print(box2)
cv2.drawContours(image,[box2],0,stroke_coordinates,cv2.FILLED)
x=x-20
new_img=image[y:y+h+20,x:x+w+50]
cv2.imwrite(str(name) , new_img) 
cv2.imshow("image",new_img) 
cv2.waitKey(0)
 