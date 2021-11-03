status = false;
obj = "";

function setup() {
    canvas = createCanvas(630, 420);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 630, 420);

    object_detector.detect(video,gotResult);

    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object Detected";

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if (objects[i].label=="person") {
            
            document.getElementById("no-objecs").innerHTML = "Baby Found";

        }

        else{
            document.getElementById("no-objecs").innerHTML = "Baby Not Found";
        }


    }

}

function modelLoaded() {
    console.log("MODEL LOADED");

    status = true;
    object_detector.detect(video, gotResult);

}

function gotResult(error, results) {

    if (error == true) {
        console.error(error);
    }

        console.log(results);

        objects = results;

}