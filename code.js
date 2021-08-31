const codesheet = document.getElementById("codeArea");
const textarea = document.getElementById("tArea");
const box = document.getElementById("blockBox");
const cButton = document.getElementById("nothing");
const selectBox = document.getElementById("selectBox");

//任意の文字ボタンでの単語の追加
function cButtonWriteCode(){
  const setSelect = selectBox.value;
  const letter = document.createElement("span");
  letter.className = "word " + setSelect + "C";
  letter.innerHTML = cButton.innerHTML;
  codesheet.appendChild(letter);
}

var changeText = function cText() {
  //ボタンの字の指定
  var iText = textarea.value;
  var target = document.getElementsByClassName("ctext");
  var long = target.length;
  for (let i = 0; i < long; i++) {
    target[i].innerHTML = iText;
  }
  //任意の文字ボタンの設定
  if (iText == "") {
    cButton.innerHTML = "(任意の文字)";
  }else{
    cButton.innerHTML = iText;
  }
}

//クリック時の単語の追加
function writeCode(write, name, settings) {
  var iText = textarea.value;
  var letter = document.createElement("span");
  letter.className = name + 'C';
  if (settings == 'B'){
    letter.innerHTML = write + iText;
    textarea.value = "";
  }else if (settings == 'F'){
    letter.innerHTML = iText + write;
    textarea.value = "";
  }else if (settings == 'qNumber'){
    letter.innerHTML = `（${iText}）`;
    textarea.value = "";
  }else{
    letter.innerHTML = write;
  }
  codesheet.appendChild(letter);
}

//ボタンの生成
function createBlock(name, bclass, set) {
  var block = document.createElement("button");
  block.className = 'mini-block ' + bclass;
  block.onclick = function(){
    writeCode(name,bclass, set);
  };
  if (set != 'N') {
    if (set == 'B') {
      block.innerHTML = name + '<span class="ctext"></span>';
    }else if (set == 'qNumber'){
      block.innerHTML = '（<span class="ctext"></span>）';
    }else{
      block.innerHTML = '<span class="ctext"></span>' + name;
    }
  }else{
    block.innerHTML = name;
  }
  box.appendChild(block);
}

//証明のダウンロード
function df() {
  const dText = codesheet.innerText;
  console.log(dText);
  const dFile = new Blob([dText],{type:"text/plan"});
  let link = document.createElement('a');
  link.href = URL.createObjectURL(dFile);
  link.download = '証明.txt';
  link.click();
}

//各種編集ボタン
function erace() {
  var eWord = codesheet.lastElementChild;
  eWord.remove();
}
function eAll() {
  const alert = window.confirm("すべての証明を削除してもよろしいですか？");
  if ( alert ) {
    codesheet.innerHTML = "";
    addCaret();
  }
}
function enter() {
  const iWord = document.createElement("br");
  codesheet.appendChild(iWord);
}
function tab() {
  const spacer = document.createElement("span");
  spacer.className = "word"
  spacer.innerHTML = "　　"
  codesheet.appendChild(spacer);
}

createBlock('仮定', 'quote', 'N');
createBlock('図', 'quote', 'N');
createBlock('（）', 'quote', 'qNumber');
createBlock('より', 'conjunction', 'N');
createBlock('から', 'conjunction', 'N');
createBlock('なので', 'conjunction', 'N');
createBlock('と', 'conjunction', 'N');
createBlock('に', 'conjunction', 'N');
createBlock('おいて', 'conjunction', 'N');
createBlock('角', 'object', 'B');
createBlock('点', 'object', 'B');
createBlock('頂点', 'object', 'B');
createBlock('線分', 'object', 'B');
createBlock('直線', 'object', 'B');
createBlock('半直線', 'object', 'B');
createBlock('三角形', 'object', 'B');
createBlock('正三角形', 'object', 'B');
createBlock('直角三角形', 'object', 'B');
createBlock('直角二等辺三角形', 'object', 'B');
createBlock('四角形', 'object', 'B');
createBlock('台形', 'object', 'B');
createBlock('平行四辺形', 'object', 'B');
createBlock('長方形', 'object', 'B');
createBlock('ひし形', 'object', 'B');
createBlock('正方形', 'object', 'B');
createBlock('五角形', 'object', 'B');
createBlock('+', 'opsymbol', 'N');
createBlock('-', 'opsymbol', 'N');
createBlock('×', 'opsymbol', 'N');
createBlock('÷', 'opsymbol', 'N');
createBlock('=', 'opsymbol', 'N');
createBlock('⇒', 'opsymbol', 'N');
createBlock('⇐', 'opsymbol', 'N');
createBlock('⇔', 'opsymbol', 'N');
createBlock('≡', 'opsymbol', 'N');
createBlock('∽', 'opsymbol', 'N');
createBlock('∴', 'opsymbol', 'N');
createBlock('∵', 'opsymbol', 'N');
createBlock('mm', 'number', 'F');
createBlock('cm', 'number', 'F');
createBlock('m', 'number', 'F');
createBlock('km', 'number', 'F');
createBlock('mL', 'number', 'F');
createBlock('L', 'number', 'F');
createBlock('個', 'number', 'F');
createBlock('・・・（', 'others', 'B');

setInterval(changeText, 20);
