function randomLoad(){
  const bingo = document.getElementById("bingo");
  bingo.innerHTML = '';

  let items = JSON.parse(document.getElementById("bingodata").innerText)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 25)
    .forEach(function (s) {
      let li = document.createElement("li");
      li.innerText = s;
      bingo.appendChild(li);
      textFit(li, {alignHoriz: true, alignVert: true, multiLine: true, alignVertWithFlexbox: true});
      li.addEventListener("click", function(){this.classList.toggle("active")})
    });
}
