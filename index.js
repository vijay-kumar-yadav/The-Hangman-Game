//start window js
var select = "";
$("input[name='category']").change((e) => { select = e.target.value });
$(".start").click(() => {
    if (select == "")
        return;
    console.log(select)
})
// game window js
function setHangmanImage(count) {
    // console.log(count);
    if (count == "" && isNaN(count)) {
        count = "-1";
    }
    $("#hangmanImage").attr("src", "./images/" + count + ".jpg");
}
function alphaOnly(event) {
    var key = event.keyCode;
    console.log(key);
    return (key >= 65 && key <= 90) || (key >= 97 && key <= 122);
}
function createBlank(placeHolder, id) {
    let disable = true;
    var guessInput = $("<input/>")
        .attr("type", "text")
        .attr("id", "guess" + id)
        .attr("maxlength", "1")
        .attr("minlength", "1")
        .attr("disabled", disable)
        .val(placeHolder)
        .keyup((event) => {
            if (!alphaOnly(event)) {
                $("#guess" + id).val("");
            }
        })
        .addClass(
            "inputField text-center m-1 border-top-0 border-left-0 border-right-0 border-dark"
        );

    $(".guessInp").append(guessInput);
}


function createInput(word, blanks) {
    for (let i = 0; i < word.length; i++) {
        if (["-", "@", ":"].includes(word[i]))
            createBlank(word[i], i);
        else {
            createBlank("", i);

        }
    }
}
var word = "";
var wordSize = "";
function myRandomInts(max) {
    return Math.trunc(Math.random() * max);
}
fetch("words.json").then((response) => response.json()).then((data) => {
    $(".gameHead").text("CSS")
    word = data.CSS[myRandomInts(data.CSS.length)];
    console.log(word)
    wordSize = word.length;
    createInput(word);
})

var imageIndex = 0;
var inputLetterCount = 0;
document.onkeypress = (e) => {
    // console.log("-->" + String.fromCharCode(eval(e.keyCode + 32)));
    if (word.includes(e.key) || word.includes("" + String.fromCharCode(eval(e.keyCode + 32)))) {
        // console.log(e.key, e);
        let indexes = [];
        let i = 0;
        while (i < word.length) {
            if ((e.key == word[i]) || ("" + String.fromCharCode(eval(e.keyCode + 32))) == word[i]) {
                // console.log("yo")
                indexes.push(i);
            }
            i++;
        }
        for (let letterIndex of indexes) {

            if
                (e.keyCode >= 65 && e.keyCode <= 90) {
                $("#guess" + letterIndex).val(e.key);

                inputLetterCount++;
            }
            if (e.keyCode >= 97 && e.keyCode <= 122) {
                $("#guess" + letterIndex).val(String.fromCharCode(eval(e.keyCode - 32)));

                inputLetterCount++;
            }

            // if (inputLetterCount == wordSize) {
            //     alert("Congrats!");
            // }
        }
    } else {
        if (
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 97 && e.keyCode <= 122)
        ) {
            setHangmanImage(imageIndex);

            imageIndex++;
            if (imageIndex == 8) {
                alert("Game Over");
            }
        }
    }
};
