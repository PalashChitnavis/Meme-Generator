/* eslint-disable no-unused-vars */
export function drag() {
  const d = document.getElementsByClassName("draggable");

  for (let i = 0; i < d.length; i++) {
    d[i].style.position = "relative";
  }

  function filter(e) {
    let target = e.target;

    if (!target.classList.contains("draggable")) {
      return;
    }

    target.moving = true;

    if (e.clientX) {
      target.oldX = e.clientX;
      target.oldY = e.clientY;
    } else {
      target.oldX = e.touches[0].clientX;
      target.oldY = e.touches[0].clientY;
    }

    target.oldLeft = window.getComputedStyle(target).getPropertyValue('left').split('px')[0] * 1;
    target.oldTop = window.getComputedStyle(target).getPropertyValue('top').split('px')[0] * 1;

    const parent = document.getElementsByClassName('meme-image');
    const parentRect = parent.getBoundingClientRect();
    const parentLeft = parentRect.left;
    const parentTop = parentRect.top;
    const parentRight = parentRect.right;
    const parentBottom = parentRect.bottom;

    function dr(event) {
      event.preventDefault();

      if (!target.moving) {
        return;
      }

      if (event.clientX) {
        target.distX = event.clientX - target.oldX;
        target.distY = event.clientY - target.oldY;
      } else {
        target.distX = event.touches[0].clientX - target.oldX;
        target.distY = event.touches[0].clientY - target.oldY;
      }

      const newLeft = Math.max(0, Math.min(target.oldLeft + target.distX, parentRight - target.offsetWidth));
      const newTop = Math.max(0, Math.min(target.oldTop + target.distY, parentBottom - target.offsetHeight));

      target.style.left = newLeft + "px";
      target.style.top = newTop + "px";
    }

    function endDrag() {
      target.moving = false;
    }

    target.onmouseup = endDrag;
    target.ontouchend = endDrag;

    document.onmousemove = dr;
    document.ontouchmove = dr;
  }

  document.onmousedown = filter;
  document.ontouchstart = filter;
}

// Call the drag function to initialize the draggable behavior
