<template>
  <!-- This arcade style button is a modified version of joshwcomeau's button, check out his blogpost https://www.joshwcomeau.com/animation/3d-button/ -->
  <button class="pushable">
    <span class="shadow" />
    <span class="edge" />
    <span class="front"> <slot /> </span>
  </button>
</template>

<style>
.pushable {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  height: fit-content;

  &:hover {
    filter: brightness(110%);
  }

  &:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  &:hover .shadow {
    transform: translateY(2px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  &:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  &:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}

.shadow {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(1px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.edge {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.front {
  display: block;
  position: relative;
  padding: 12px 42px;
  border-radius: 12px;
  font-size: 1.5rem;
  color: hsl(var(--primary-foreground));
  background: hsl(var(--primary));
  will-change: transform;
  transform: translateY(-4px);
  transition: all 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.correct .front {
    background: hsl(var(--green));
    color: white;
}

.wrong .front {
    background: hsl(var(--red));
    color: white;
}
</style>
