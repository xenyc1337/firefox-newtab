function start() {
  startTime();
  try {
      findQuote();
  } catch (e) {
      console.error(e);
  }
}

Array.prototype.randItem = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function updateQuote(quote, author = "Anonymous") {
  document.getElementById('quote').textContent = quote;
  document.getElementById('author').textContent = author;
}

// Load a random quote from the quotes.json file
function findQuote() {
  if (quotes.length === 0) {
      console.error("No quotes available.");
      return;
  }

  const chosen = quotes.randItem();
  console.log(`You have ${quotes.length} quotes.`);
  console.log(chosen);

  if (chosen.length > 0) {
      updateQuote(chosen[0], chosen[1]);
  } else {
      updateQuote("Invalid quote... Please be sure it has at least one item in the array");
  }
}

let actualQuery = 'google';
const queryMappings = {
  'google': { action: "https://www.google.com/search", inputName: "q" },
  'youtube': { action: "https://www.youtube.com/results", inputName: "search_query" },
  'github': { action: "https://github.com/search", inputName: "q" },
  'reddit': { action: "https://www.reddit.com/search/", inputName: "q" }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Control') {
      keysPressed[e.key] = true;
  } else {
      const queryKey = parseInt(e.key);
      if (!isNaN(queryKey) && queryKey >= 1 && queryKey <= 4) {
          changeQuery(queryKey);
      }
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Control') {
      delete keysPressed[e.key];
  }
});

function changeQuery(newQuery) {
  if (keysPressed['Control']) {
      actualQuery = String(newQuery);

      if (queryMappings[actualQuery]) {
          const { action, inputName } = queryMappings[actualQuery];
          const form = document.getElementById("form");
          const input = document.getElementById("input");
          const text = document.getElementById("search");

          form.setAttribute("action", action);
          input.setAttribute("name", inputName);
          text.textContent = actualQuery;
      }
  }
}

function startTime() {
  const date = new Date();
  const h = formatTime(date.getHours());
  const m = formatTime(date.getMinutes());
  const s = formatTime(date.getSeconds());

  document.getElementById('ctime').textContent = `${h}:${m}:${s}`;
  setTimeout(startTime, 500);
}

function formatTime(i) {
  return i < 10 ? "0" + i : i;
}
