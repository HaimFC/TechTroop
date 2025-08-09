const model = {
  level: 0,
  remaining: 0,
  frogsPerLevel: (level) => level,
  secondsForLevel: (level) => level,
};

const view = {
  area: null,
  btn: null,
  hudLevel: null,
  hudTimer: null,
  hudLeft: null,
  msg: null,

  init() {
    this.area = document.getElementById('game-area');
    this.btn = document.getElementById('start-btn');
    this.hudLevel = document.getElementById('level');
    this.hudTimer = document.getElementById('timer');
    this.hudLeft = document.getElementById('left');
    this.msg = document.getElementById('center-message');
  },

  clearArea() { this.area.innerHTML = ''; },

  setHUD({ level, secondsLeft, remaining }) {
    this.hudLevel.textContent = `Level: ${level}`;
    this.hudTimer.textContent = `Time: ${Math.max(0, secondsLeft)}s`;
    this.hudLeft.textContent  = `Frogs left: ${remaining}`;
  },

  flashTimerYellow() {
    this.hudTimer.classList.remove('flash-yellow');
    void this.hudTimer.offsetWidth;
    this.hudTimer.classList.add('flash-yellow');
    setTimeout(() => this.hudTimer.classList.remove('flash-yellow'), 650);
  },

  setUrgent(on) {
    this.hudTimer.classList.toggle('urgent', !!on);
  },

  showMessage(text) {
    this.msg.innerHTML = `<div class="panel">${text}</div>`;
    this.msg.classList.remove('hidden');
  },

  hideMessage() {
    this.msg.classList.add('hidden');
    this.msg.innerHTML = '';
  },

  renderFrogs(n) {
    this.clearArea();

    requestAnimationFrame(() => {
      let { width: w, height: h } = this.area.getBoundingClientRect();

      if (!w || !h) {
        const hudH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--hud-h')) || 56;
        w = window.innerWidth;
        h = Math.max(0, window.innerHeight - hudH);
        this.area.style.height = h + 'px';
      }

      for (let i = 0; i < n; i++) {
        const frog = document.createElement('div');
        frog.className = 'frog';
        const minSize = 22, maxSize = 72;
        const y = Math.random() * Math.max(0, h - maxSize);
        const size = Math.round(minSize + (y / Math.max(1, h)) * (maxSize - minSize));
        const x = Math.random() * Math.max(0, w - size - 12);
        const hue = Math.floor(Math.random() * 360);
        const sat = 80 + Math.floor(Math.random() * 20);
        const light = 40 + Math.floor(Math.random() * 20);
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-frog';
        icon.style.fontSize = `${size}px`;
        icon.style.color = `hsl(${hue}, ${sat}%, ${light}%)`;
        frog.style.left = `${x}px`;
        frog.style.top  = `${y}px`;
        frog.appendChild(icon);
        this.area.appendChild(frog);
      }
    });
  }
};

const controller = {
  _tickId: null,
  _timeoutId: null,
  _secondsLeft: 0,
  _running: false,

  init() {
    view.init();
    view.area.addEventListener('click', (e) => {
      const frog = e.target.closest('.frog');
      if (!frog || !view.area.contains(frog) || !this._running) return;
      frog.remove();
      model.remaining--;
      view.setHUD({ level: model.level, secondsLeft: this._secondsLeft, remaining: model.remaining });
      if (model.remaining === 0) this._nextLevel();
    });
    view.btn.addEventListener('click', () => this.startGame());
    view.setHUD({ level: 0, secondsLeft: 0, remaining: 0 });
  },

  startGame() {
    this._clearTimers();
    view.hideMessage();
    model.level = 1;
    view.btn.textContent = 'Restart';
    this._running = true;
    this._startLevel();
  },
  _startLevel() {
    model.remaining = model.frogsPerLevel(model.level);
    view.renderFrogs(model.remaining);
    view.flashTimerYellow();
    this._clearTimers();
    this._secondsLeft = model.secondsForLevel(model.level);
    view.setHUD({ level: model.level, secondsLeft: this._secondsLeft, remaining: model.remaining });
    view.setUrgent(false);
    this._tickId = setInterval(() => {
      this._secondsLeft--;
      view.setHUD({ level: model.level, secondsLeft: this._secondsLeft, remaining: model.remaining });
      if (this._secondsLeft <= 3) view.setUrgent(true);
      if (this._secondsLeft <= 0) clearInterval(this._tickId);
    }, 1000);
    this._timeoutId = setTimeout(() => this._onTimeUp(), this._secondsLeft * 1000);
  },
  _nextLevel() {
    this._clearTimers();
    model.level++;
    this._startLevel();
  },
  _onTimeUp() {
    this._clearTimers();
    if (model.remaining > 0) {
      this._running = false;
      view.setUrgent(false);
      view.showMessage(`Time's up! You lost on Level ${model.level}.<br>Press <b>Restart</b> to try again.`);
    } else {
      this._nextLevel();
    }
  },
  _clearTimers() {
    clearInterval(this._tickId); this._tickId = null;
    clearTimeout(this._timeoutId); this._timeoutId = null;
  }
};
document.addEventListener('DOMContentLoaded', () => controller.init());
