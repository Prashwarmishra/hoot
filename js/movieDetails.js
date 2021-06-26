const queryString = window.location.search;
console.log(queryString);

function init() {
  const parentDiv = document.createElement("div");

  parentDiv.innerHTML = `
    <div class="parent">
        <div class="child">Hello</div>
        <div class="child">+</div>
        <div class="child">How are you?</div>
        <div class="child">=</div>
        <div class="child">I'm fine</div>
    </div>
  `;
  console.log("Test");
  document.body.appendChild(parentDiv);
}

init();
