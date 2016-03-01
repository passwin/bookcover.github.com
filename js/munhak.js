//문학동네 표지를 만들어주는 스크립트//민음사 표지 제작 스크립트
console.log("문학동네");
//캔버스 초기 세팅을 위한 함수
var coverImageHeight = 515;
//표지위에 써있는 문자열
var cCoverLetter;
//문학동네 표지는 원제와 저자를 가지고 레터링을 하는데 그걸 하기는 어려우니까 의미없는 문자열로 대체
var unmeaningStrings = "Lorem ipsum dolo\nsit amet, consectetur\nadipiscing elit.\nNulla a justo ac ligula\nvulputate convallis\nvitae ac nulla. Curabitur aliquet maximus venenatis. Proin eu placerat est. Maecenas et felis dignissim, vestibulum dolor quis, lobortis nisi. Fusce ac malesuada leo. Suspendisse scelerisque eros nibh, nec volutpat neque dignissim eget. Pellentesque sit amet tortor a purus rutrum egestas. Morbi egestas ante ut dignissim condimentum. Nam mauris dolor, vehicula ornare quam id, rhoncus blandit massa. Maecenas nec sapien at nunc varius volutpat.";

var cSeriesBox;

$("#series").val("세계문학전집");
$("#title").val(book.title);
$("#originalTitle").val(book.originalTitle);
$("#author").val(book.author);
$("#translator").val(book.translator);
$("#publisher").val("문학동네");

//표지 바탕색이 어두운 색이므로 라벨컬러가 밝은색이어야 한다
//파란색 계열일 경우 바탕색때문에 잘 안보이므로 자동선택에서는 제외.
do{
    hsl = hexToHsl(lColor);
    if((hsl[2] > 50) && (hsl[0] < 200 || hsl[0] > 280) )
        break;
    lColor = randomColor();
}while(1);

function init() {
    canvas.clear();
    //커버이미지 기준선
    cCoverLine = new fabric.Line([0, 515, 1000, 515], {
        originY: 'bottom',
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
    });
    canvas.add(cCoverLine);


    cCover = new fabric.Rect({
        top: coverImageHeight,
        left: -1,
        width: canvas.getWidth() + 1,
        height: canvas.getHeight() - coverImageHeight + 1,
        fill: "#221816",
        selectable: false,
    });
    canvas.add(cCover);

    //커버를 덮을 텍스트
    cCoverLetter = new fabric.Text(unmeaningStrings, {
        top: coverImageHeight + 3,
        left: -1,
        width: canvas.getWidth() + 1,
        height: canvas.getHeight() - coverImageHeight + 1,
        fontSize: 180,
        lineHeight: 0.9,
        fontFamily: 'Fjalla One, sans-serif',
        fill: "#3F3B3A",
        selectable: true,
    });
    canvas.add(cCoverLetter);

    //커버이미지
    fabric.Image.fromURL(sCover, function (img) {
        ratio = img.getWidth() / canvas.getWidth();
        console.log("비율 : " + ratio);
        cCoverArt = img.set({
            left: -1,
            top: -1,
            //width : 1000+1,
            //height : img.getHeight()*ratio+1,
            scaleX: img.scaleX / ratio,
            scaleY: img.scaleY / ratio,
        });
        if (cCoverArt.getHeight() > coverImageHeight)
        {
            cCoverArt.setTop((515 - cCoverArt.getHeight() - 1) / 2);
        }
        console.log(515 - cCoverArt.getHeight() - 1);
        canvas.add(cCoverArt);
        cCoverArt.sendToBack();
        cCoverLine.sendToBack();
    });

    //시리즈 앞 박스
    cSeriesBox = new fabric.Rect({
        top: 40,
        left: 50,
        width: 10,
        height: 35,
        fill: lColor,
        selectable: false,
    });
    canvas.add(cSeriesBox);
    console.log("박스너비" + cSeriesBox.getBoundingRectWidth());

    //시리즈명
    cSeries = new fabric.Text($("#series").val() + "\n" + sNumber, {
        left: cSeriesBox.getLeft() + cSeriesBox.getBoundingRectWidth() + 5,
        top: cSeriesBox.getTop(),
        fontFamily: 'NanumBarunGothic, Arial',
        fontSize: 15,
        fontWeight: 'bold',
        fill: 'black',
        OriginX: 'left',
        stroke: 'white',
        strokeWidth: 0.3
    });
    canvas.add(cSeries);

    //타이틀
    cTitle = new fabric.Text($("#title").val(), {
        top: 840,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        fill: "white",
        fontFamily: 'mj, batang',
        fontSize: 66,
        lineHeight: 1,
    });
    canvas.add(cTitle);

    //titleSplit(cTitle.text);

    //저자
    cAuthor = new fabric.Text($("#author").val(), {
        top: cTitle.getTop() - 50,
        fontFamily: 'mj, batang',
        fontSize: 40,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        originY: "bottom",
        lineHeight: 1,
        fill: lColor,
        lineHeight : 1,
    });
    canvas.add(cAuthor);

    cOriginalTitle = new fabric.Text($("#originalTitle").val(), {
        //originX : "left",
        //originY : "center",
        top: cAuthor.getTop() - cAuthor.getFontSize() - 50,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        originY: "bottom",
        fill: "white",
        fontFamily: 'mj, batang',
        fontSize: 18,
        selectable: false,
        lineHeight: 1,
    });
    canvas.add(cOriginalTitle);
    //cOriginalTitle.bringToFront();

    //번역자
    if ($("#translator").val() != "")
        cTranslator = new fabric.Text($("#translator").val() + " 옮김", {
            top: cTitle.getTop() + cTitle.getBoundingRectHeight() + 45,
            left: canvas.getWidth() / 2,
            textAlign: "center",
            originX: "center",
            originY: "top",
            fill: lColor,
            fontFamily: 'mj, batang',
            fontSize: 22,
            lineHeight: 1,
        });
    else
        cTranslator = new fabric.Text($("#translator").val(), {
            top: cTitle.getTop() + cTitle.getBoundingRectHeight() + 50,
            left: canvas.getWidth() / 2,
            textAlign: "center",
            originX: "center",
            originY: "top",
            fill: lColor,
            fontFamily: 'mj, batang',
            fontSize: 22,
            lineHeight: 1,
        });
    canvas.add(cTranslator);

    //출판사
    cPublisher = new fabric.Text($("#publisher").val(), {
        top: canvas.getHeight() - 75,
        left: canvas.getWidth() / 2,
        textAlign: "center",
        originX: "center",
        originY: "bottom",
        fontFamily: 'SungDongGothicB',
        fontSize: 28,
        fill: "white",
    });
    canvas.add(cPublisher);
    //상대위치로 위치가 결정되는 요소의 위치를 조정해줌.
    alignCover();
}

init();



function titleSplit(value)
{
    cTitle.setText(value);
    cTitle.setFontSize(defaultFontSize);
    cTitle.setScaleX(1);
    console.log(cTitle.getBoundingRectWidth());
    if (cTitle.getBoundingRectWidth() > canvas.getWidth() * 0.75 || cTitle.getText().search(/[\n|\r]/) > 0)
    {
        cTitle.setFontSize(defaultFontSize * 0.74);
        labelWidth(cTitle.getBoundingRectWidth());
        console.log(cTitle.getBoundingRectWidth());
        if (cTitle.getBoundingRectWidth() > canvas.getWidth() * 0.75)
        {
            splitPoint = value.length * (370 / cTitle.getBoundingRectWidth())
            if (splitPoint < value.length / 2)
            {
                splitPoint = value.length - splitPoint;
            }
            console.log(splitPoint);
            var t1 = value.substr(0, splitPoint);
            var t2 = value.substr(splitPoint, value.length).replace(/^\s+/, "");
            cTitle.setFontSize(defaultFontSize * 0.6);
            cTitle.setText(t1 + "\n" + t2);
            labelWidth(cTitle.getBoundingRectWidth());
        }
        if (cTitle.getBoundingRectWidth() > canvas.getWidth() * 0.75)
        {
            labelWidth(canvas.getWidth() * 0.75);
            var t1 = value.substr(0, value.length / 2);
            var t2 = value.substr(value.length / 2, value.length).replace(/^\s+/, "");
            cTitle.setFontSize(defaultFontSize * 0.6);
            cTitle.setText(t1 + "\n" + t2);
            cTitle.setScaleX(370 / cTitle.getBoundingRectWidth());
        }
    } else
    {
        cTitle.setFontSize(defaultFontSize);
        cTitle.setText(value);
        labelWidth(cTitle.getBoundingRectWidth());
    }
    canvas.renderAll();
}
//값이 계속 변함 수정 필요
function drawCover(id, value) {
    switch (id) {
        case 'series':
            cSeries.setText(value + " " + sNumber);
            canvas.renderAll();
            break;
        case 'title' :
            console.log("텍스트박스")
            titleSplit(value);
            alignCover();
            canvas.renderAll();
            break;
        case 'originalTitle':
            cOriginalTitle.setText(value);
            canvas.renderAll();
            break;
        case 'author':
            cAuthor.setText(value);
            alignCover();
            canvas.renderAll();
            break;
        case 'translator':
            if (value != "")
                cTranslator.setText(value + " 옮김");
            else
                cTranslator.setText(value);
            alignCover();
            break;
        case 'publisher':
            cPublisher.setText(value);
        default:
            canvas.renderAll();
    }
}

function alignCover() {
    //cLabelD.setTop(cTitle.getTop()+cTitle.getBoundingRectHeight()+20);
    //cAuthor.setTop(cLabelD.top + cLabelD.height + 15);
    //cTranslator.setTop(cAuthor.top+cAuthor.fontSize * 0.3);
    //cTranslator.setLeft(cAuthor.left + cAuthor.getBoundingRectWidth() + 10);
    //cOriginalTitle.setTop(cLabelD.top + cLabelD.height/2+2);
}

//폼에 이벤트를 걸어줌
$("#bcForm :input").bind('keyup',
        function () {
            drawCover(this.id, this.value);
            canvas.renderAll();
        }
);
/*
 $(document).ready(function(){
 function readURL(input) {
 if (input.files && input.files[0]) {
 var reader = new FileReader(); //파일을 읽기 위한 FileReader객체 생성
 reader.onload = function (e) { 
 //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
 console.log("읽기 성공");
 console.log(e);
 var imgObj = new Image();
 imgObj.src = event.target.result;
 imgObj.onload = function () {
 cCoverArt.remove();
 cCoverArt = new fabric.Image(imgObj);
 ratio = cCoverArt.getWidth()/canvas.getWidth();
 //cCoverArt.setSourcePath(image);
 cCoverArt.set({
 left : -1,
 top : -1,
 height : 355 +1,
 width : 356/cCoverArt.getHeight()*cCoverArt.getWidth()+1, 
 //width : (ratio >1)?(cCoverArt.getWidth()/ratio+1):(cCoverArt.getWidth()*ratio+1),
 });
 canvas.add(cCoverArt);
 cCoverArt.sendToBack();
 cCoverLine.sendToBack();
 canvas.renderAll();
 }
 }                    
 reader.readAsDataURL(input.files[0]);
 //File내용을 읽어 dataURL형식의 문자열로 저장
 }
 }//readURL()--
 
 //file 양식으로 이미지를 선택(값이 변경) 되었을때 처리하는 코드
 $("#coverFileInput").change(function(){
 readURL(this);
 });
 });
 
 */

$("#colorPicker").spectrum({
    color: cSeriesBox.getFill(),
    showInput: true,
    className: "full-spectrum",
    //showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    localStorageKey: "spectrum.demo",
    move: function (color) {

    },
    show: function () {

    },
    beforeShow: function () {

    },
    hide: function () {

    },
    change: function (color) {
        hexColor = color.toHexString();
        console.log(hexColor);
        $("#labalColor").css("background-color", color.toHexString()).val(color.toHexString());
        cSeriesBox.setFill(color.toHexString());
        var hsv = color.toHsv();
        console.log(hsv);
        if ((hsv.s <= 0.4 && hsv.v > 0.9)) {
        }
        //cOriginalTitle.setFill("black");
        else if (hsv.h > 50 && hsv.h <= 180 && hsv.s == 1 && hsv.v == 1) {
        }
        //cOriginalTitle.setFill("black");
        else
            //cOriginalTitle.setFill("white");
        canvas.renderAll();

    },
    palette: [
        ["#ffffff", "#fff7de", "#ffffce", "#ffffbd", "#ffffd6", "#b5ff84", "#c6efde", "#efffff", "#efe7f7", "#dea5d6"],
        ["#ded6c6", "#ffc6bd", "#ffe7b5", "#ffe7a5", "#efef7b", "#adf77b", "#5abd9c", "#a5d6f7", "#8494e7", "#ef7be7"],
        ["#cec6b5", "#e78473", "#efad52", "#f7b500", "#efef9c", "#a5ff00", "#7bd6bd", "#a5d6de", "#8c5ae7", "#de6bce"],
        ["#8c8473", "#ef0018", "#ef4210", "#f79400", "#ffff00", "#63d600", "#a5c684", "#5a63d6", "#7b52c6", "#c642ce"],
        ["#736b63", "#d60039", "#d67310", "#f7844a", "#f7de00", "#429400", "#4a944a", "#4200ff", "#9c00de", "#a500c6"],
        ["#39524a", "#b51821", "#944a08", "#a55229", "#8c8c00", "#318c00", "#429484", "#3100c6", "#523984", "#940084"],
        ["#000000", "#940008", "#840008", "#ad2929", "#637321", "#296b00", "#29006b", "#21007b", "#52007b", "#84007b"]
    ]
});


//크롬 브라우저에서 웹폰트가 바로 적용되지 않는 문제가 있어 그것을 갱신해주는 코드
setInterval(function () {
    var agent = navigator.userAgent.toLowerCase();
    //크롬에서 제대로 렌더링이 안돼는 문제가 있어서 크롬 판정 코드 삽입.
    //
    //엣지브라우저가 크롬 에이전트를 가져다 쓰므로 엣지 판정 코드도 삽입
    if ((agent.indexOf("applewebkit") != -1) && (agent.indexOf("edge") == -1)) {
    } else
    {
        console.log("크롬 아님");
    }
    //init();
    canvas.renderAll();
    //imgOutput();
}, 1000);