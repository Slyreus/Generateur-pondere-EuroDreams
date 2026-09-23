const MAIN_DATA = [
  { number: 1, sorties: 41, weight: 13.62, lastDraw: "2026-09-07" },
  { number: 2, sorties: 41, weight: 13.62, lastDraw: "2026-09-14" },
  { number: 3, sorties: 54, weight: 17.94, lastDraw: "2026-09-10" },
  { number: 4, sorties: 52, weight: 17.28, lastDraw: "2026-09-21" },
  { number: 5, sorties: 38, weight: 12.62, lastDraw: "2026-07-09" },
  { number: 6, sorties: 38, weight: 12.62, lastDraw: "2026-09-10" },
  { number: 7, sorties: 43, weight: 14.29, lastDraw: "2026-08-10" },
  { number: 8, sorties: 54, weight: 17.94, lastDraw: "2026-09-17" },
  { number: 9, sorties: 43, weight: 14.29, lastDraw: "2026-08-10" },
  { number: 10, sorties: 42, weight: 13.95, lastDraw: "2026-09-17" },
  { number: 11, sorties: 42, weight: 13.95, lastDraw: "2026-09-21" },
  { number: 12, sorties: 41, weight: 13.62, lastDraw: "2026-09-10" },
  { number: 13, sorties: 40, weight: 13.29, lastDraw: "2026-09-17" },
  { number: 14, sorties: 44, weight: 14.62, lastDraw: "2026-08-31" },
  { number: 15, sorties: 52, weight: 17.28, lastDraw: "2026-09-14" },
  { number: 16, sorties: 40, weight: 13.29, lastDraw: "2026-07-27" },
  { number: 17, sorties: 44, weight: 14.62, lastDraw: "2026-09-17" },
  { number: 18, sorties: 46, weight: 15.28, lastDraw: "2026-09-14" },
  { number: 19, sorties: 54, weight: 17.94, lastDraw: "2026-08-20" },
  { number: 20, sorties: 43, weight: 14.29, lastDraw: "2026-09-21" },
  { number: 21, sorties: 58, weight: 19.27, lastDraw: "2026-09-07" },
  { number: 22, sorties: 58, weight: 19.27, lastDraw: "2026-09-21" },
  { number: 23, sorties: 57, weight: 18.94, lastDraw: "2026-08-24" },
  { number: 24, sorties: 56, weight: 18.60, lastDraw: "2026-09-10" },
  { number: 25, sorties: 39, weight: 12.96, lastDraw: "2026-07-27" },
  { number: 26, sorties: 42, weight: 13.95, lastDraw: "2026-08-17" },
  { number: 27, sorties: 43, weight: 14.29, lastDraw: "2026-09-17" },
  { number: 28, sorties: 47, weight: 15.61, lastDraw: "2026-09-07" },
  { number: 29, sorties: 36, weight: 11.96, lastDraw: "2026-08-27" },
  { number: 30, sorties: 52, weight: 17.28, lastDraw: "2026-08-27" },
  { number: 31, sorties: 39, weight: 12.96, lastDraw: "2026-07-23" },
  { number: 32, sorties: 44, weight: 14.62, lastDraw: "2026-09-07" },
  { number: 33, sorties: 49, weight: 16.28, lastDraw: "2026-09-03" },
  { number: 34, sorties: 43, weight: 14.29, lastDraw: "2026-09-14" },
  { number: 35, sorties: 39, weight: 12.96, lastDraw: "2026-08-27" },
  { number: 36, sorties: 30, weight: 9.97, lastDraw: "2026-08-17" },
  { number: 37, sorties: 53, weight: 17.61, lastDraw: "2026-08-31" },
  { number: 38, sorties: 49, weight: 16.28, lastDraw: "2026-09-21" },
  { number: 39, sorties: 38, weight: 12.62, lastDraw: "2026-09-21" },
  { number: 40, sorties: 42, weight: 13.95, lastDraw: "2026-09-10" },
];

const DREAM_DATA = [
  { number: 1, sorties: 67, weight: 22.26, lastDraw: "2026-09-03" },
  { number: 2, sorties: 53, weight: 17.61, lastDraw: "2026-08-31" },
  { number: 3, sorties: 66, weight: 21.93, lastDraw: "2026-08-27" },
  { number: 4, sorties: 57, weight: 18.94, lastDraw: "2026-09-17" },
  { number: 5, sorties: 58, weight: 19.27, lastDraw: "2026-09-21" },
];

const state = {
  mainDraw: [],
  dreamDraw: null,
  history: [],
  isAnimating: false,
  rollKind: null,
  previewMain: null,
  previewDream: null,
  recentPick: null,
  animationToken: 0,
};

const els = {
  statisticsDate: document.querySelector("#statisticsDate"),
  drawAllButton: document.querySelector("#drawAllButton"),
  drawButton: document.querySelector("#drawButton"),
  resetButton: document.querySelector("#resetButton"),
  liveStatus: document.querySelector("#liveStatus"),
  mainSlots: document.querySelector("#mainSlots"),
  dreamSlot: document.querySelector("#dreamSlot"),
  metricsGrid: document.querySelector("#metricsGrid"),
  numberGrid: document.querySelector("#numberGrid"),
  dreamGrid: document.querySelector("#dreamGrid"),
  topBars: document.querySelector("#topBars"),
  historyList: document.querySelector("#historyList"),
  progressFill: document.querySelector("#progressFill"),
  drawProgress: document.querySelector("#drawProgress"),
  celebrationLayer: document.querySelector("#celebrationLayer"),
};

const tileRefs = {
  main: new Map(),
  dream: new Map(),
};
const mainSlotRefs = [];
const topBarRefs = [];
const activeEffects = new Set();

const percentFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const weightFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit", timeZone: "UTC" });

function formatDate(date) {
  return dateFormatter.format(new Date(`${date}T12:00:00Z`));
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let recentTimer = null;
let celebrationTimer = null;

function playEffect(element, keyframes, options = {}) {
  if (reducedMotion.matches || document.hidden) {
    return;
  }
  const effect = element.animate(keyframes, {
    duration: 650,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    ...options,
  });
  activeEffects.add(effect);
  const forget = () => activeEffects.delete(effect);
  effect.addEventListener("finish", forget, { once: true });
  effect.addEventListener("cancel", forget, { once: true });
}

function clearEffects() {
  activeEffects.forEach((effect) => effect.cancel());
  activeEffects.clear();
}

function revealPicks(firstIndex) {
  state.history.slice(firstIndex).forEach((entry, index) => {
    const delay = index * 55;
    const slot = entry.type === "main" ? mainSlotRefs[firstIndex + index] : els.dreamSlot;
    const tile = tileRefs[entry.type].get(entry.number);
    playEffect(slot, [
      { transform: "translateY(8px) scale(.86)", opacity: .3 },
      { transform: "translateY(-3px) scale(1.035)", opacity: 1, offset: .65 },
      { transform: "translateY(0) scale(1)", opacity: 1 },
    ], { delay, fill: "backwards" });
    playEffect(tile, [
      { transform: "translateY(3px) scale(.96)", opacity: .6 },
      { transform: "translateY(-2px) scale(1.025)", opacity: 1, offset: .6 },
      { transform: "translateY(0) scale(1)", opacity: 1 },
    ], { delay, fill: "backwards" });
    playEffect(els.historyList.children[firstIndex + index], [
      { transform: "translateX(8px)", opacity: 0 },
      { transform: "translateX(0)", opacity: 1 },
    ], { delay, fill: "backwards" });
  });
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function sumWeight(items) {
  return items.reduce((sum, item) => sum + item.weight, 0);
}

function averageWeight(items) {
  return items.length ? sumWeight(items) / items.length : 0;
}

function getAvailableMain() {
  const selected = new Set(state.mainDraw);
  return MAIN_DATA.filter((item) => !selected.has(item.number));
}

function getMainProbability(item) {
  if (state.mainDraw.includes(item.number)) {
    return 0;
  }

  const total = sumWeight(getAvailableMain());
  return total ? (item.weight / total) * 100 : 0;
}

function getDreamProbability(item) {
  if (state.dreamDraw !== null) {
    return state.dreamDraw === item.number ? 100 : 0;
  }

  const total = sumWeight(DREAM_DATA);
  return total ? (item.weight / total) * 100 : 0;
}

function weightedPick(items) {
  const total = sumWeight(items);
  let cursor = Math.random() * total;

  for (const item of items) {
    cursor -= item.weight;
    if (cursor <= 0) {
      return {
        item,
        totalBefore: total,
        chanceBefore: (item.weight / total) * 100,
      };
    }
  }

  const fallback = items[items.length - 1];
  return {
    item: fallback,
    totalBefore: total,
    chanceBefore: (fallback.weight / total) * 100,
  };
}

function getPhase() {
  if (state.mainDraw.length < 6) {
    return {
      kind: "main",
      label: `boule ${state.mainDraw.length + 1}`,
      items: getAvailableMain(),
      done: false,
    };
  }

  if (state.dreamDraw === null) {
    return {
      kind: "dream",
      label: "numéro Dream",
      items: DREAM_DATA,
      done: false,
    };
  }

  return {
    kind: "done",
    label: "tirage terminé",
    items: [],
    done: true,
  };
}

function isComplete() {
  return state.mainDraw.length === 6 && state.dreamDraw !== null;
}

async function drawNext() {
  if (state.isAnimating) {
    return;
  }

  const phase = getPhase();
  if (phase.done) {
    return;
  }

  const pick = weightedPick(phase.items);
  const token = state.animationToken + 1;
  state.animationToken = token;
  state.isAnimating = true;
  state.rollKind = phase.kind;
  state.previewMain = null;
  state.previewDream = null;
  state.recentPick = null;
  window.clearTimeout(recentTimer);
  render();

  const frames = reducedMotion.matches ? 0 : 16;
  for (let frame = 0; frame < frames; frame += 1) {
    if (state.animationToken !== token) {
      return;
    }
    if (reducedMotion.matches) {
      break;
    }

    const preview = weightedPick(phase.items).item.number;
    if (phase.kind === "main") {
      state.previewMain = preview;
    } else {
      state.previewDream = preview;
    }

    renderMainSlots();
    renderNumbers();
    renderTopBars();
    await sleep(24 + frame * 5);
  }

  if (state.animationToken !== token) {
    return;
  }

  state.previewMain = null;
  state.previewDream = null;
  state.isAnimating = false;
  state.rollKind = null;

  recordPick(phase, pick);
  finishDraw();
}

function drawAll() {
  if (state.isAnimating || isComplete()) {
    return;
  }

  window.clearTimeout(recentTimer);
  const firstIndex = state.history.length;
  // Rebuild the pool after every pick, including when completing a partial draw.
  let phase = getPhase();
  while (!phase.done) {
    recordPick(phase, weightedPick(phase.items));
    phase = getPhase();
  }
  finishDraw(firstIndex);
}

function recordPick(phase, pick) {
  if (phase.kind === "main") {
    state.mainDraw.push(pick.item.number);
    state.recentPick = {
      kind: "main",
      number: pick.item.number,
      position: state.mainDraw.length,
      chance: pick.chanceBefore,
    };
    state.history.push({
      type: "main",
      label: `Boule ${state.mainDraw.length}`,
      number: pick.item.number,
      weight: pick.item.weight,
      chance: pick.chanceBefore,
    });
  } else {
    state.dreamDraw = pick.item.number;
    state.recentPick = {
      kind: "dream",
      number: pick.item.number,
      position: "D",
      chance: pick.chanceBefore,
    };
    state.history.push({
      type: "dream",
      label: "Dream",
      number: pick.item.number,
      weight: pick.item.weight,
      chance: pick.chanceBefore,
    });
  }
}

function finishDraw(firstIndex = state.history.length - 1) {
  render();
  revealPicks(firstIndex);
  clearRecentPickSoon(state.recentPick);

  if (isComplete()) {
    launchCelebration();
  }
}

function clearRecentPickSoon(snapshot) {
  window.clearTimeout(recentTimer);
  recentTimer = window.setTimeout(() => {
    if (state.recentPick === snapshot) {
      state.recentPick = null;
      renderMainSlots();
      renderNumbers();
      renderHistory();
      renderLiveStatus();
    }
  }, 1250);
}

function resetDraw() {
  clearEffects();
  state.animationToken += 1;
  state.mainDraw = [];
  state.dreamDraw = null;
  state.history = [];
  state.isAnimating = false;
  state.rollKind = null;
  state.previewMain = null;
  state.previewDream = null;
  state.recentPick = null;
  window.clearTimeout(recentTimer);
  window.clearTimeout(celebrationTimer);
  els.celebrationLayer.innerHTML = "";
  render();
}

function getSelectedOrder(number) {
  const index = state.mainDraw.indexOf(number);
  return index === -1 ? "" : index + 1;
}

function renderMainSlots() {
  for (let i = 0; i < 6; i += 1) {
    if (!mainSlotRefs[i]) {
      const slot = document.createElement("div");
      slot.innerHTML = '<span class="slot-value"></span>';
      slot.style.setProperty("--reveal-delay", `${i * 55}ms`);
      mainSlotRefs.push(slot);
      els.mainSlots.append(slot);
    }
    const slot = mainSlotRefs[i];
    const value = state.mainDraw[i];
    const isRolling = state.isAnimating && state.rollKind === "main" && i === state.mainDraw.length;
    const isFresh = state.recentPick?.kind === "main" && state.recentPick.position === i + 1;
    slot.className = [
      "slot",
      value ? "filled" : "waiting",
      isRolling ? "rolling" : "",
      isFresh ? "is-fresh" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const text = String(value || (isRolling && state.previewMain ? state.previewMain : "—"));
    if (slot.firstElementChild.textContent !== text) {
      slot.firstElementChild.textContent = text;
    }
    slot.setAttribute("aria-label", `Boule ${i + 1} : ${value || (isRolling ? "en cours" : "à tirer")}`);
  }

  const dreamRolling = state.isAnimating && state.rollKind === "dream";
  const dreamFresh = state.recentPick?.kind === "dream";
  els.dreamSlot.className = [
    "slot",
    "dream-slot",
    state.dreamDraw ? "filled" : "waiting",
    dreamRolling ? "rolling" : "",
    dreamFresh ? "is-fresh" : "",
  ]
    .filter(Boolean)
    .join(" ");
  if (!els.dreamSlot.firstElementChild) {
    els.dreamSlot.innerHTML = '<span class="slot-value"></span>';
    els.dreamSlot.style.setProperty("--reveal-delay", "330ms");
  }
  const dreamText = String(state.dreamDraw || (dreamRolling && state.previewDream ? state.previewDream : "—"));
  if (els.dreamSlot.firstElementChild.textContent !== dreamText) {
    els.dreamSlot.firstElementChild.textContent = dreamText;
  }
  els.dreamSlot.setAttribute("aria-label", `Dream : ${state.dreamDraw || (dreamRolling ? "en cours" : "à tirer")}`);
}

function renderButton() {
  const complete = isComplete();
  els.drawAllButton.disabled = state.isAnimating || complete;
  els.drawAllButton.textContent = complete ? "Terminé" : state.mainDraw.length ? "Compléter" : "Tout tirer";
  els.drawButton.classList.toggle("is-loading", state.isAnimating);
  els.drawButton.setAttribute("aria-busy", String(state.isAnimating));
  els.drawButton.disabled = state.isAnimating || complete;
  els.drawButton.textContent = state.isAnimating ? "Tirage…" : state.mainDraw.length < 6 ? "1 boule" : "Dream";

  const doneSteps = state.mainDraw.length + (state.dreamDraw === null ? 0 : 1);
  const animatedStep = state.isAnimating ? 0.48 : 0;
  els.progressFill.style.width = `${Math.min(((doneSteps + animatedStep) / 7) * 100, 100)}%`;
  els.drawProgress.setAttribute("aria-valuenow", String(doneSteps));
}

function renderLiveStatus() {
  const doneSteps = state.history.length;
  let message = doneSteps ? `${doneSteps}/7 tirés` : "Prêt · 0/7";

  if (state.isAnimating) {
    message = state.rollKind === "dream" ? "Dream…" : `Boule ${state.mainDraw.length + 1}/6…`;
  } else if (isComplete()) {
    message = "Terminé · 7/7";
  } else if (state.recentPick) {
    message = `${doneSteps}/7 · N° ${state.recentPick.number}`;
  }

  if (els.liveStatus.textContent !== message) {
    els.liveStatus.textContent = message;
  }
}

function renderMetrics() {
  const availableMain = getAvailableMain();
  const totalRemaining = sumWeight(availableMain);
  const selectedMain = MAIN_DATA.filter((item) => state.mainDraw.includes(item.number));
  const strongestRemaining = [...availableMain].sort((a, b) => b.weight - a.weight)[0];
  const weakestRemaining = [...availableMain].sort((a, b) => a.weight - b.weight)[0];
  const dreamTop = [...DREAM_DATA].sort((a, b) => b.weight - a.weight)[0];
  const spread = strongestRemaining && weakestRemaining ? strongestRemaining.weight - weakestRemaining.weight : 0;
  const topChance = strongestRemaining && totalRemaining ? (strongestRemaining.weight / totalRemaining) * 100 : 0;
  const phase = getPhase();

  const metrics = [
    {
      label: "Étape",
      value: state.isAnimating ? `${phase.label}…` : `${state.history.length}/7`,
    },
    {
      label: "Poids restant",
      value: `${weightFormatter.format(totalRemaining)} pts`,
    },
    {
      label: "Disponibles",
      value: `${availableMain.length}/40`,
    },
    {
      label: "Favori restant",
      value: strongestRemaining ? `${strongestRemaining.number} (${percentFormatter.format(topChance)}%)` : "Terminé",
    },
    {
      label: "Écart max/min",
      value: `${weightFormatter.format(spread)} pts`,
    },
    {
      label: "Moyenne tirée",
      value: selectedMain.length ? `${weightFormatter.format(averageWeight(selectedMain))} pts` : "—",
    },
    {
      label: "Dream favori",
      value: state.dreamDraw ? `${state.dreamDraw} sélectionné` : `${dreamTop.number} (${weightFormatter.format(dreamTop.weight)}%)`,
    },
    {
      label: "Poids initial",
      value: `${weightFormatter.format(sumWeight(MAIN_DATA))} pts`,
    },
    {
      label: "Ticket trié",
      value: state.mainDraw.length ? [...state.mainDraw].sort((a, b) => a - b).join(" · ") : "—",
    },
  ];

  els.metricsGrid.innerHTML = metrics
    .map((metric) => `<div class="metric"><span>${metric.label}</span><strong>${metric.value}</strong></div>`)
    .join("");
}

function ensureTiles() {
  if (!tileRefs.main.size) {
    MAIN_DATA.forEach((item, index) => {
      const tile = createTileElement();
      tileRefs.main.set(item.number, tile);
      els.numberGrid.append(tile);
      playEffect(tile, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { delay: index * 12, fill: "backwards" });
    });
  }

  if (!tileRefs.dream.size) {
    DREAM_DATA.forEach((item, index) => {
      const tile = createTileElement();
      tileRefs.dream.set(item.number, tile);
      els.dreamGrid.append(tile);
      playEffect(tile, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { delay: 120 + index * 35, fill: "backwards" });
    });
  }
}

function createTileElement() {
  const tile = document.createElement("article");
  tile.className = "number-tile";
  tile.innerHTML = `
    <div class="tile-top">
      <span class="tile-number" data-role="number"></span>
      <span class="tile-order" data-role="order"></span>
      <span class="tile-sorties" data-role="sorties"></span>
    </div>
    <div class="tile-kpis">
      <strong data-role="weight" title="Fréquence historique"></strong>
      <span class="tile-arrow" aria-hidden="true">→</span>
      <strong class="tile-chance" data-role="chance"></strong>
    </div>
    <div class="tile-footer">
      <div class="weight-meter" aria-hidden="true"><span data-role="weightFill"></span></div>
      <span class="tile-last-draw" title="Dernière sortie">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M5 1v4M11 1v4M2 7h12"/></svg>
        <time data-role="lastDraw"></time>
      </span>
    </div>
  `;
  return tile;
}

function updateTile(item, options) {
  const probability = options.kind === "main" ? getMainProbability(item) : getDreamProbability(item);
  const isSelected = options.kind === "main" ? state.mainDraw.includes(item.number) : state.dreamDraw === item.number;
  const isPreview = options.kind === "main" ? state.previewMain === item.number : state.previewDream === item.number;
  const isFresh = state.recentPick?.kind === options.kind && state.recentPick.number === item.number;
  const isMuted = options.kind === "dream" && state.dreamDraw !== null && state.dreamDraw !== item.number;
  const isStrong = !isSelected && options.maxProbability > 0 && probability === options.maxProbability;
  const order = options.kind === "main" ? getSelectedOrder(item.number) : isSelected ? "D" : "";
  const weightWidth = options.maxWeight ? (item.weight / options.maxWeight) * 100 : 0;
  const tile = tileRefs[options.kind].get(item.number);
  const historyEntry = state.history.find((entry) => entry.type === options.kind && entry.number === item.number);

  tile.className = [
    "number-tile",
    isSelected ? "is-selected" : "",
    isStrong ? "is-strong" : "",
    isPreview ? "is-preview" : "",
    isFresh ? "is-fresh" : "",
    isMuted ? "is-muted" : "",
  ]
    .filter(Boolean)
    .join(" ");
  tile.style.setProperty("--weight-width", `${Math.max(0, weightWidth)}%`);
  const status = isSelected
    ? "Tiré"
    : isPreview
      ? "En rotation"
      : isMuted
        ? "Écarté"
        : isStrong
          ? "Favori restant"
          : "En course";
  const chanceLabel = isSelected ? "Au tirage" : "Prochaine";
  const chanceValue = isSelected && historyEntry ? historyEntry.chance : probability;
  const description = `${options.label} ${item.number}, ${item.sorties} sorties, historique ${weightFormatter.format(item.weight)} %, ${chanceLabel.toLowerCase()} ${percentFormatter.format(chanceValue)} %, dernière sortie le ${formatDate(item.lastDraw)}, ${status.toLowerCase()}${order ? ` (${order})` : ""}`;
  tile.setAttribute("aria-label", description);
  tile.title = description;

  tile.querySelector('[data-role="number"]').textContent = item.number;
  tile.querySelector('[data-role="order"]').textContent = order;
  tile.querySelector('[data-role="order"]').setAttribute("aria-label", order ? `Ordre du tirage : ${order}` : "");
  tile.querySelector('[data-role="sorties"]').textContent = `${item.sorties} sorties`;
  tile.querySelector('[data-role="weight"]').textContent = `${weightFormatter.format(item.weight)}%`;
  tile.querySelector('[data-role="lastDraw"]').dateTime = item.lastDraw;
  tile.querySelector('[data-role="lastDraw"]').textContent = formatDate(item.lastDraw);
  tile.querySelector('[data-role="chance"]').title = chanceLabel;
  tile.querySelector('[data-role="chance"]').textContent =
    isMuted && !isSelected ? "—" : `${percentFormatter.format(chanceValue)}%`;
  tile.querySelector('[data-role="weightFill"]').style.width = `${Math.max(0, weightWidth)}%`;
}

function renderNumbers() {
  ensureTiles();

  const mainProbabilities = MAIN_DATA.map(getMainProbability);
  const dreamProbabilities = DREAM_DATA.map(getDreamProbability);
  const maxMainProbability = Math.max(...mainProbabilities, 0);
  const maxDreamProbability = Math.max(...dreamProbabilities, 0);
  const maxMainWeight = Math.max(...MAIN_DATA.map((item) => item.weight));
  const maxDreamWeight = Math.max(...DREAM_DATA.map((item) => item.weight));

  MAIN_DATA.forEach((item) => {
    updateTile(item, {
      kind: "main",
      label: "Numéro",
      maxProbability: maxMainProbability,
      maxWeight: maxMainWeight,
    });
  });

  DREAM_DATA.forEach((item) => {
    updateTile(item, {
      kind: "dream",
      label: "Dream",
      maxProbability: maxDreamProbability,
      maxWeight: maxDreamWeight,
    });
  });
}

function renderTopBars() {
  const showDream = state.mainDraw.length === 6 && state.dreamDraw === null;
  const source = showDream ? DREAM_DATA : getAvailableMain();
  const total = sumWeight(source);
  const topItems = [...source]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 8)
    .map((item) => ({
      ...item,
      probability: total ? (item.weight / total) * 100 : 0,
    }));
  const maxProbability = Math.max(...topItems.map((item) => item.probability), 0);

  if (!topItems.length) {
    els.topBars.innerHTML = `<p class="empty-state">Terminé</p>`;
    topBarRefs.length = 0;
    return;
  }

  while (topBarRefs.length > topItems.length) {
    topBarRefs.pop().remove();
  }
  topItems.forEach((item, index) => {
    if (!topBarRefs[index]) {
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML = '<span class="bar-number"></span><span class="bar-track"><span class="bar-fill"></span></span><span class="bar-value"></span>';
      topBarRefs.push(row);
      els.topBars.append(row);
    }
    const row = topBarRefs[index];
    const width = maxProbability ? (item.probability / maxProbability) * 100 : 0;
    row.classList.toggle("is-preview", showDream ? state.previewDream === item.number : state.previewMain === item.number);
    row.querySelector(".bar-number").textContent = `${showDream ? "D" : ""}${item.number}`;
    row.querySelector(".bar-fill").style.width = `${width}%`;
    row.querySelector(".bar-value").textContent = `${percentFormatter.format(item.probability)}%`;
  });
}

function renderHistory() {
  if (!state.history.length) {
    els.historyList.innerHTML = `<li class="empty-state">—</li>`;
    return;
  }

  els.historyList.innerHTML = state.history
    .map((entry, index) => {
      const isLast = index === state.history.length - 1 && state.recentPick;
      return `
        <li class="${isLast ? "history-new" : ""}" aria-label="${entry.label} : ${entry.number}, historique ${weightFormatter.format(entry.weight)} %, au tirage ${percentFormatter.format(entry.chance)} %">
          <strong><small>${entry.type === "dream" ? "D" : index + 1}</small>${entry.number}</strong>
          <span>${weightFormatter.format(entry.weight)}%</span>
          <span>${percentFormatter.format(entry.chance)}%</span>
        </li>
      `;
    })
    .join("");
}

function launchCelebration() {
  window.clearTimeout(celebrationTimer);
  const colors = ["#78d8a5", "#2f6fe4", "#f2b84b", "#ffffff", "#45c2b3"];
  els.celebrationLayer.innerHTML = "";
  if (reducedMotion.matches) {
    return;
  }

  for (let i = 0; i < 36; i += 1) {
    const spark = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 36;
    const distance = 45 + Math.random() * 155;
    spark.className = "spark";
    spark.style.setProperty("--spark-color", colors[i % colors.length]);
    spark.style.left = `${45 + Math.random() * 45}%`;
    spark.style.setProperty("--size", `${3 + Math.random() * 4}px`);
    spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    spark.style.setProperty("--delay", `${Math.random() * 120}ms`);
    els.celebrationLayer.append(spark);
  }

  celebrationTimer = window.setTimeout(() => {
    els.celebrationLayer.innerHTML = "";
  }, 1500);
}

function render() {
  document.body.classList.toggle("is-animating", state.isAnimating);
  document.body.classList.toggle("is-complete", isComplete());
  renderMainSlots();
  renderButton();
  renderLiveStatus();
  renderMetrics();
  renderNumbers();
  renderTopBars();
  renderHistory();
}

els.drawAllButton.addEventListener("click", drawAll);
els.drawButton.addEventListener("click", drawNext);
els.resetButton.addEventListener("click", resetDraw);
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    clearEffects();
    window.clearTimeout(celebrationTimer);
    els.celebrationLayer.innerHTML = "";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || event.isComposing || event.defaultPrevented) {
    return;
  }
  if (event.target.closest("input, select, textarea, [contenteditable]")) {
    return;
  }
  const key = event.key.toLowerCase();

  if (key === "r") {
    resetDraw();
    return;
  }

  if (event.target.closest("button, a, summary")) {
    return;
  }
  if (key === " " || key === "enter") {
    event.preventDefault();
    drawNext();
  }
});

const latestDrawDate = [...MAIN_DATA, ...DREAM_DATA].map((item) => item.lastDraw).sort().at(-1);
els.statisticsDate.dateTime = latestDrawDate;
els.statisticsDate.textContent = formatDate(latestDrawDate);
render();
