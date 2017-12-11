function draw()
{
    currentTime+=secondsBetweenFrames;
    sineWave=(Math.sin(currentTime)+1)/2;
    context.clearRect(0,0,canvas.width,canvas.height);//context的clearRect方法
    context.save();//context的save()方法
    context2D.translate(halfCanvasWidth - halfImageDemension, halfCanvasHeight - halfImageDemension);//context的translate()方法
    currentFunction();
    context.drawImage(image,0,0);//context的drawImage()方法
    context.restore();//context的restore()方法
}

下笔时  `onmousedown `  
调用 `var lastImg = context.getImageData(0,  0,  canvas.width,  canvas.height)` 来保存下笔前的数据
撤销时 ` context.putImageData(lastImg,  0,  0) ` 来恢复就可以了。

