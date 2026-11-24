(() => {
  const copyButtons = document.querySelectorAll("[data-copy]");
  const swatches = document.querySelectorAll(".swatch");
  const defaultStatus = document.getElementById("links-status");

  const timers = new WeakMap();

  function showStatus(el, text) {
    if (!el) return;
    el.textContent = text;
    el.classList.add("visible");
    clearTimeout(timers.get(el));
    timers.set(
      el,
      setTimeout(() => {
        el.classList.remove("visible");
      }, 1600)
    );
  }

  async function copyText(value, statusEl, label) {
    try {
      await navigator.clipboard.writeText(value);
      showStatus(statusEl, label);
    } catch {
      const tmp = document.createElement("textarea");
      tmp.value = value;
      tmp.setAttribute("readonly", "");
      tmp.style.position = "fixed";
      tmp.style.opacity = "0";
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
      showStatus(statusEl, label);
    }
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.copy;
      if (!value) return;
      const targetId = btn.dataset.status;
      const statusEl = (targetId && document.getElementById(targetId)) || defaultStatus;
      const tag = btn.dataset.label ? `[${btn.dataset.label} copied]` : "[copied]";
      copyText(value, statusEl, tag);
    });
  });

  swatches.forEach((btn) => {
    btn.addEventListener("click", () => {
      const hex = btn.dataset.hex;
      if (hex) copyText(hex, defaultStatus, `[${hex}]`);
    });
  });
})();
