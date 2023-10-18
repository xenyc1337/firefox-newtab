function start() {
  startTime();
  try {
    findQuote();
  } catch (e) {
    console.log(e);
  }

  setRandomBackground(); // Add this line to set the random background
}

Array.prototype.randItem = function() {
  return this[Math.floor(Math.random() * Math.floor(this.length))];
};

// Define an array of background images
const backgrounds = [
  "https://w.wallhaven.cc/full/7p/wallhaven-7px1vy.jpg",
  "https://w.wallhaven.cc/full/1p/wallhaven-1podz1.jpg",
  "https://w.wallhaven.cc/full/p9/wallhaven-p9mwd3.jpg",
  "https://w.wallhaven.cc/full/p9/wallhaven-p9mjgp.jpg",
  "https://w.wallhaven.cc/full/7p/wallhaven-7pxweo.png",
  "https://w.wallhaven.cc/full/gp/wallhaven-gp1q6e.jpg",
  "https://w.wallhaven.cc/full/m3/wallhaven-m3o158.jpg",
  "https://w.wallhaven.cc/full/m3/wallhaven-m3o158.jpg",
  "https://w.wallhaven.cc/full/zy/wallhaven-zyvq3g.png",
  "https://w.wallhaven.cc/full/kx/wallhaven-kxj3l1.jpg",
  "https://w.wallhaven.cc/full/7p/wallhaven-7plk8v.jpg",
  "https://w.wallhaven.cc/full/zy/wallhaven-zy9jrj.png",
  "https://w.wallhaven.cc/full/gp/wallhaven-gpd63d.png",
  "https://w.wallhaven.cc/full/o5/wallhaven-o5jzm5.jpg",
  "https://w.wallhaven.cc/full/p9/wallhaven-p9m2qm.jpg",
  "https://w.wallhaven.cc/full/jx/wallhaven-jxdj9p.jpg",
  "https://w.wallhaven.cc/full/9d/wallhaven-9dgpqx.png",
  "https://w.wallhaven.cc/full/6d/wallhaven-6dekqw.png",
  "https://w.wallhaven.cc/full/gj/wallhaven-gj7lod.jpg",
  "https://w.wallhaven.cc/full/4y/wallhaven-4ylq5l.jpg",
  "https://w.wallhaven.cc/full/vm/wallhaven-vm97gm.jpg",
  "https://w.wallhaven.cc/full/mp/wallhaven-mpo39m.jpg",
  "https://w.wallhaven.cc/full/3k/wallhaven-3kz7x6.jpg",
  "https://w.wallhaven.cc/full/lq/wallhaven-lq6x9q.jpg",
  "https://w.wallhaven.cc/full/qd/wallhaven-qd2v85.jpg",
  "https://w.wallhaven.cc/full/8x/wallhaven-8xjw5k.jpg",
];

// Function to set a random background image
function setRandomBackground() {
  const backgroundElement = document.getElementById("background");
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const randomBackground = backgrounds[randomIndex];
  backgroundElement.style.backgroundImage = `url('${randomBackground}')`;
}

// load a random quote of the quotes.json file
function findQuote() {
  // get the quote
  const chosen = quotes.randItem();
  console.log(`You have ${quotes.length} quotes.`);
  console.log(chosen);

  document.getElementById('quote').innerHTML = chosen[0];

  switch (chosen.length) {
    case 1:
      document.getElementById('author').innerHTML = "Anonymous";
      break;
    case 2:
      document.getElementById('author').innerHTML = chosen[1];
      break;
    default:
      console.log('Invalid quote... Please be sure it has at least one item in the array');
  };
}


// first search type will always be google
let actualQuery = 'google';
let keysPressed = {};

document.addEventListener('keydown', e => {
   keysPressed[e.key] = true;
   if (keysPressed['Control'] ) { 
    switch (e.keyCode) {
      case 49: changeQuery(e.keyCode); break;
      case 50: changeQuery(e.keyCode); break;
      case 51: changeQuery(e.keyCode); break;
      case 52: changeQuery(e.keyCode); break;
      default: return;
    };
   };
});

document.addEventListener('keyup', e => {
   delete keysPressed[e.key];
});

// change the search type every time you click
function changeQuery(to) {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const text = document.getElementById("search");

  if (to) actualQuery = to;

  switch (actualQuery) {
    case 'google':
    case 50:
      actualQuery = 'youtube';
      form.setAttribute("action", "https://www.youtube.com/results");
      input.setAttribute("name", "search_query");
      break;
    case 'youtube':
    case 51:
      actualQuery = 'github';
      form.setAttribute("action", "https://github.com/search");
      input.setAttribute("name", "q")
      break;
    case 'github':
    case 53:
      actualQuery = 'reddit';
      form.setAttribute('action', 'https://www.reddit.com/search/');
      //input.setAttribute("name", "q");
      break;
    case 'reddit':
    case 49:
      actualQuery = 'google';
      form.setAttribute("action", "https://www.google.com/search");
      //input.setAttribute("name", "q");
      break;
    default:
  }
  text.innerHTML = actualQuery;
}

// load time in the screen
function startTime() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  h = formatTime(h);
  m = formatTime(m);
  s = formatTime(s);
  document.getElementById('ctime').innerHTML = `${h}:${m}:${s}`;
  setTimeout('startTime()', 500);
}

// format time for better output (with zeros)
function formatTime(i) {
  if (i < 10) i = "0" + i;
  return i;
}