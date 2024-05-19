'use strict'
{
  let datas = JSON.parse(localStorage.getItem("datas")) || [];
  let dataObj = {
    title: '新しいノート',
    img: null,
    imgThumbnail: 'サムネイル'
  }

  //読み込み用の一時データ置き場
  let main = document.querySelector('#main');
  let dataBox = []; //クラス作成のための箱
  let imgBox = {
    img: null,
    draw: null
  }

  class dataDraw{
    constructor(id, title, img){
      this.id = id;
      this.title = title;
      this.img = img;
      
      this.drawing();
      this.edit();
      this.delete();
    }


  
    designBox(){
      let boxCss = `<div id= boxId_${this.id} class="flex flex-col items-center bg-gray-600 w-[200px] h-[200px] m-4 rounded-xl"><div class="bg-gray-200 w-4/5 mt-4 h-[100px]"><img src="" alt=""></div><div class="mt-1 text-white">${this.title}</div><div class="w-full flex justify-around m-2"><img src="../img/article.svg" alt="" id= edit_${this.id} title="編集する" class="cursor-pointer"><img src="../img/trash.svg" id= del_${this.id} title="削除する" alt="" class="cursor-pointer" ></div></div>`
      
      return boxCss;
    }
  
    drawing(){
      $('#main').append(`${this.designBox()}`);
    }

    edit(){
      $(`#edit_${this.id}`).on('click', ()=>{
 
      })
    }
  
    delete(){
      $(`#del_${this.id}`).on('click', ()=>{
        console.log('delete')
        datas.splice(this.id, 1);
        save();
        load();
      })
    }
  
  }

  if(datas != []){load();}
  console.dir(datas);


// function boxId(){
//   let boxId = `<div id= boxId_${id} ` + 'class="flex flex-col items-center bg-gray-600 w-[200px] h-[200px] m-4 rounded-xl"><div class="bg-gray-200 w-4/5 mt-4 h-[100px]"><img src="" alt=""></div><div class="mt-1 text-white">作品タイトル</div><div class="w-full flex justify-around m-2"><a href="" class="block" data="詳細へ(感想・作品情報)"><img src="../img/article.svg" alt=""></a><a href="" class="block" data="削除する"><img src="../img/trash.svg" alt=""></a></div></div>'

//   return boxId;
  
// }

//キャンバス====================================

//キャンバス全体の設定
const canvasAreaWidth = $('#canvasArea').width(); //キャンバス全体の横サイズ
const canvasAreaheight = $('#canvasArea').height(); //キャンバス全体の縦サイズ


// 描画Canvas-----------------------------
const editCanvas = document.getElementById('editCanvas');
const ctxEdit = editCanvas.getContext('2d');
editCanvas.width = Math.min(480, canvasAreaWidth); //初期描画横サイズ
editCanvas.height = Math.min(480, canvasAreaheight); //初期描画縦サイズ


// 描画機能設定
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let oldPos;
let bold_line = 1; //ラインの太さ
let color = '#000000'; //ラインの色

//色設定
const inputCollor = document.querySelector('#inputCollor');
inputCollor.addEventListener('input',()=>{
  colorChange();
  console.log(color);
})

function colorChange(){
  color = inputCollor.value;
}

//ラインの太さ設定
const numberRange = document.querySelector('#numberRange');
numberRange.addEventListener('input',()=>{
  // console.log(numberRange.value);
  updateSelectedNumber(numberRange.value)});

function updateSelectedNumber(val) {
  // console.log(val);
  const selectedNumber = document.getElementById('selectedNumber');
  selectedNumber.textContent = val;
  numberRange.value = val;
  console.log(selectedNumber.textContent);
  bold_line = selectedNumber.textContent;
}


//描画設定
const draw = (e) => {
  if (!isDrawing) return;
  ctxEdit.strokeStyle = color;
  ctxEdit.lineWidth = bold_line;
  ctxEdit.beginPath();
  ctxEdit.lineJoin="round"; //描画を丸くする
  ctxEdit.lineCap ="round"; //描画を丸くする
  ctxEdit.moveTo(lastX, lastY);
  ctxEdit.lineTo(e.offsetX, e.offsetY);
  ctxEdit.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

editCanvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


editCanvas.addEventListener('mousemove', draw);
editCanvas.addEventListener('mouseup', () => isDrawing = false);
editCanvas.addEventListener('mouseout', () => isDrawing = false);

//タッチ操作
const drawT = (e) => {
  e.preventDefault()
  let pos = getPosT(e);
  if (!isDrawing) return;
  ctxEdit.strokeStyle = color;
  ctxEdit.lineWidth = bold_line;
  ctxEdit.beginPath();
  ctxEdit.lineJoin="round"; //描画を丸くする
  ctxEdit.lineCap ="round"; //描画を丸くする
  ctxEdit.moveTo(pos.x, pos.y);
  ctxEdit.lineTo(oldPos.x, oldPos.y);
  ctxEdit.stroke();
  ctxEdit.closePath();
  oldPos = pos;
}

// タップ位置を取得する為の関数群
  //スクロールの影響を見る関数　必要なかった
function scrollX(){return document.documentElement.scrollLeft || document.body.scrollLeft;}
function scrollY(){return document.documentElement.scrollTop || document.body.scrollTop;}

function getPosT (event) {
  const rect = editCanvas.getBoundingClientRect();
  let mouseX = event.touches[0].clientX - rect.left ;
  let mouseY = event.touches[0].clientY - rect.top ;
  return {x:mouseX, y:mouseY};
}

editCanvas.addEventListener('touchstart', (e) => {
  isDrawing = true;
  e.preventDefault()
  oldPos = getPosT(e);
},false); //false バブリングフェイズで動作するように。省略可

editCanvas.addEventListener('touchmove', drawT);
editCanvas.addEventListener('touchend', () => isDrawing = false);



//消しゴム機能実装
const elase = document.querySelector('#imgElase');
const paint = document.querySelector('#imgDraw');
const clear = document.querySelector('#imgClear');

elase.addEventListener('click', ()=>{ctxEdit.globalCompositeOperation = 'destination-out'});
paint.addEventListener('click', ()=>{ctxEdit.globalCompositeOperation = 'source-over'});
clear.addEventListener('click', ()=>{
  ctxEdit.beginPath();
  ctxEdit.clearRect(0, 0, editCanvas.width, editCanvas.height);
});



//画像アップロード用のCanvas-----------------------

const imgCanvas = document.getElementById('imgCanvas'); //imgCanvasの要素取得
const ctxImg = imgCanvas.getContext('2d');
imgCanvas.width = Math.min(480, canvasAreaWidth); //初期描画横サイズ
imgCanvas.height = Math.min(480, canvasAreaheight); //初期描画縦サイズ



// 画像アップロードの処理
const uploadInput = document.querySelector('#image-upload');

uploadInput.addEventListener('click',()=>{
  alert('現在の描画は破棄されます')
});
uploadInput.addEventListener('change', () => {
 uploadImg();
});

function uploadImg(load){
  const file = uploadInput.files[0];
  console.log(load);
  const reader = new FileReader(); //ファイル読み込みのためのオブジェクト
  
  reader.onload = () => { //onload 読み込みが終わったときに発火する
    //イメージのアップロード
    loadImg(reader.result);
  }
  reader.readAsDataURL(file);//アップロードファイル（画像）の読み込み
 } 

 function loadImg(importImg){
  const img = new Image(); //document.createElement('img')と同等
    img.onload = () => {
      // 画像のサイズにキャンバスを合わせる
      let scale = Math.min(
        canvasAreaWidth / img.naturalWidth,
        canvasAreaheight / img.naturalHeight
      );
      imgCanvas.width = img.width * scale;
      imgCanvas.height = img.height * scale;
      editCanvas.width = imgCanvas.width
      editCanvas.height = imgCanvas.height
      
      
      ctxImg.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height); //描画(画像, x, y, size-w, size-h)
    }
    img.src = importImg; //描画する画像の読み込み
 }

 function loadEdit(importEdit){
  const img = new Image(); //document.createElement('img')と同等
  img.onload = () => {
    // 画像のサイズにキャンバスを合わせる
    ctxEdit.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height); //描画(画像, x, y, size-w, size-h)
  }
  img.src = importEdit; //描画する画像の読み込み
 }

//--------------------画像アップロード用Canvas

//save
  let dataURLimg = imgCanvas.toDataURL("image/png");
  let dataURLedit = editCanvas.toDataURL("image/png");
  
  const imgSave = document.querySelector('#imgSave');
  imgSave.addEventListener('click', ()=>{
    dataURLimg = imgCanvas.toDataURL("image/png");
    dataURLedit = editCanvas.toDataURL("image/png");
    localStorage.setItem('dataURLimg', dataURLimg);
    localStorage.setItem('dataURLedit', dataURLedit);
    // imgBox.img = imgCanvas.toDataURL("image/png");
    // imgBox.draw = editCanvas.toDataURL("image/png");
    // dataObj.img = imgBox;
    alert('保存しました');
  });

//load
 const imgLoad = document.querySelector('#imgLoad');
 imgLoad.addEventListener('click', ()=>{
  const img = localStorage.getItem('dataURLimg');
  const edit = localStorage.getItem('dataURLedit');
 
 loadImg(img);
 loadEdit(edit)

});

//====================================キャンバス 


//メニューボタン
 $("#menuBtn").on('click', ()=>{
 $('#menu').removeClass('hidden');
 });

  //新規作成ボタン
 $('#generateBtn').on('click', ()=> {  
  datas.push(dataObj);
  console.log(`datas= ${datas}`);
  console.log(`dataBox= ${dataBox}`);
  dataBox.length = 0;
  console.log(`dataBox= ${dataBox}`);

  save();
  dataBox = [];
  load();
  console.dir(datas);


 });

 function save(){
  let jsondatas = JSON.stringify(datas);

  // console.log(`datas= ${datas}`);
  // console.log(`jsondatas= ${jsondatas}`);
  localStorage.setItem('datas', jsondatas);
  let origin = JSON.parse(localStorage.getItem("datas")) 
  // console.log(`origin= ${origin}`);
 }

 function load(){
  dataBox.length = 0; //dataBox初期化
  main.innerHTML = ''; //HTML描画初期化
  datas.forEach((data, index) => {
    console.log(data.title);
    dataBox[index] = new dataDraw(index, data.title, data.img);
  });
  console.log(`dataBox= ${dataBox}`);
 }

// 編集ボタン
// $('edit').on('click')
// let dataname = $('#data').val();
//   console.log('dataname ->' + dataname);
//
 }