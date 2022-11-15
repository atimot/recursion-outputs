class Pokemon {
    constructor(name, species, imgUrl) {
        this.name = name;
        this.species = species;
        this.imgUrl = imgUrl;
    }
}

const pokemons = [
    new Pokemon("フシギダネ", "たねポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/7b705082db2e24dd4ba25166dac84e0a.png"),
    new Pokemon("フシギソウ", "たねポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/6f8144eb4659537733b930d6a299d5a7.png"),
    new Pokemon("フシギバナ", "たねポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/ebccfe6f2ccfe2e851fd29739bf6220c.png"),
    new Pokemon("ヒトカゲ", "とかげポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/89953014f442146518ef45787d9bb0a4.png"),
    new Pokemon("リザード", "かえんポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/f11e83606acc0f5a7aa3b7235a373087.png"),
    new Pokemon("リザードン", "かえんポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/42062cbeca16839af3efe8a7d61ceb27a30f758b.png"),
    new Pokemon("ゼニガメ", "かめのこポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/17388b7f608671656716ab509ee0fa05.png"),
    new Pokemon("カメール", "かめポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/7c861520e0eb69f872a4e13a9f04eaba.png"),
    new Pokemon("カメックス", "こうらポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/81d2cf3830b75053da5b39dc22aa9a27.png"),
    new Pokemon("キャタピー", "いもむしポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/e97edb1243b8cb641186391489eaf2ee.png"),
    new Pokemon("トランセル", "さなぎポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/f836c66e2fb51a54a2af3af4a7ee7583.png"),
    new Pokemon("バタフリー", "ちょうちょポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/4df848214983ca8731ecdcb0ebce9d50.png"),
    new Pokemon("ビードル", "けむしポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/1e553bacdabb816e6cc07cf68160bed3.png"),
    new Pokemon("コクーン", "さなぎポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/e808242baaed1161df1f7361b91b25d8.png"),
    new Pokemon("スピアー", "どくばちポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/793c7baad51f915c185abe80f6502502.png"),
    new Pokemon("ポッポ", "ことりポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/9ffa1820513c085c448ee9f884c4991a.png"),
    new Pokemon("ピジョン", "とりポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/5f09d82833710f6c829369835336d7e8.png"),
    new Pokemon("ピジョット", "とりポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/ad8eb3e08de6bface07c2e390ffb4e86.png"),
    new Pokemon("コラッタ", "ねずみポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/7bbce6f5ca4059e34c7b8ca551fe7c08.png"),
    new Pokemon("ラッタ", "ねずみポケモン", "https://zukan.pokemon.co.jp/zukan-api/up/images/index/dfeb249dd6ad5cf669f01d8174ccbf0e.png"),
]

const target = document.getElementById("target");

// 基礎HTMLの作成
target.innerHTML = `
<div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="col-lg-8 col-11 bg-pink d-flex">
        <div id="left" class="col-7 d-flex justify-content-center align-items-center">
        </div>
        <div id="right" class="col-5 px-0 p-2">
            <div id="info" class="px-2">
            </div>
        </div>
    </div>
</div>
`;

const left = document.getElementById("left");
const right = document.getElementById("right");
const info = document.getElementById("info");
const main = document.createElement("div");
const extra = document.createElement("div");

// 右側のボタン作成
let controls = document.createElement("div");
controls.classList.add("d-flex", "flex-wrap");
for (let i = 0; i < pokemons.length; i++) {
    controls.innerHTML += `
    <div class="col-3 my-2 px-2">
        <button class="btn btn-light" onclick="displayInfo(${i}); slideJump(${i});">${i+1}</button>
    </div>
    `
}
right.append(controls);

// 左側のスライダー作成
let slider = document.createElement("div");
slider.classList.add("d-flex", "flex-nowrap");
slider.style.maxWidth = "350px";
left.append(slider);

function slideJump(num) {
    let nextIndex = parseInt(num);
    let currentIndex = main.getAttribute("data-index") === null ? 0 : parseInt(main.getAttribute("data-index"));
    let animationType = currentIndex <= nextIndex ? "right" : "left";

    main.setAttribute("data-index", `${nextIndex}`);
    animation(currentIndex, nextIndex, animationType);
}

function animation(currentIndex, nextIndex, animationType) {
    main.innerHTML = `
    <div class="p-4">
        <img class="bg-light" src="${pokemons[nextIndex].imgUrl}">
    </div>
    `;
    extra.innerHTML = `
    <div class="p-4">
        <img class="bg-light" src="${pokemons[currentIndex].imgUrl}">
    </div>
    `;

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    if (animationType === "right") {
        slider.innerHTML = "";
        slider.append(extra);
        slider.append(main);
        
    } else if (animationType === "left") {
        slider.innerHTML = "";
        slider.append(main);
        slider.append(extra);
    }
}

function displayInfo(num) {
    nextIndex = parseInt(num);
    info.innerHTML = `
    <p>名前 : ${pokemons[nextIndex].name}</p>
    <p>分類 : ${pokemons[nextIndex].species}</p>
    `
}
