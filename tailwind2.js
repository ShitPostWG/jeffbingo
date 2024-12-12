function randomLoad(){
  const randomItems = JSON.parse(document.getElementById("bingodata").innerText)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 25)

  makeBingo(randomItems);
}

function makeBingo(items) {
  const bingo = document.getElementById("bingo");
  bingo.innerHTML = '';
  bingo.className= "";

  items.forEach(function (s) {
    let li = document.createElement("li");
    li.innerText = s;
    bingo.appendChild(li);
    textFit(li, {alignHoriz: true, alignVert: true, multiLine: true, alignVertWithFlexbox: true});
    li.addEventListener(
      "click",
      toggleBingoCell
    )
  });

  storeBingo();
}

function toggleBingoCell(){
  this.classList.toggle("active")
  storeBingo()
}

function storeBingo(){
  localStorage.setItem("bingo", document.querySelector("#bingo").innerHTML)
  localStorage.setItem("bingoClass", document.querySelector("#bingo").className)
}

function loadBingo(){
  let bingo = localStorage.getItem("bingo"),
      bingoClass = localStorage.getItem("bingoClass")
  // If we don't run textFit first the css they add is not loaded, and we don't have css for .textFitAlignVertFlex
  randomLoad() // The user won't notice we load a random bingo first
  if (bingo) {
    document.querySelector("#bingo").innerHTML = bingo
    document.querySelector("#bingo").className = bingoClass || ""
    document.querySelectorAll('#bingo > li').forEach((e) => e.addEventListener("click", toggleBingoCell))
  }
}

function carltonify(){
  makeBingo(Array(25).fill("CARLTON"));
  document.getElementById("bingo").classList.add("carlton");
  storeBingo();
}
