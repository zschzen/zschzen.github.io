<template>
  <div class="starfield" z--50 invert dark:invert-0>
    <div class="static" />
    <div class="moving-1" />
    <div class="moving-2" />
    <div class="moving-3" />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use 'sass:string';

@function random-stars() {
  $result: '';
  @for $i from 1 through 100 {
    $result: $result +
      (math.random(200) - 100) +
      'vw ' +
      (math.random(200) - 100) +
      'vh ' +
      '1px 0.75px ' +
      rgba((math.random(15) + 240), (math.random(15) + 240), (math.random(15) + 240), (math.random() * 0.4));
    @if $i < 100 {
      $result: $result + ', ';
    }
  }
  @return string.unquote($result);
}

@function random-range($min, $max, $unit: '') {
  @return string.unquote($max - math.random($max - $min) + $unit);
}

$randomX: random-range(-40, 40, 'vw');
$randomY: random-range(-40, 40, 'vh');

@mixin star-field {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 3px;
  border-radius: 100%;
  transform-origin: $randomX $randomY;
  box-shadow: random-stars();
}

// New mixin for universal compatibility
@mixin star-field-universal {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 3px;
  border-radius: 100%;
  transform-origin: $randomX $randomY;
  box-shadow: random-stars-universal();
}

div.starfield {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .static {
    @include star-field;
    width: 1px;
    height: 1px;
  }

  .moving-1 {
    @include star-field;
    animation:
      star-movement 9s cubic-bezier(0.55, 0, 1, 0.45) infinite,
      direction-movement 30s ease-in-out alternate infinite;
  }

  .moving-2 {
    @include star-field;
    animation:
      star-movement 9s -3s cubic-bezier(0.55, 0, 1, 0.45) infinite,
      direction-movement 30s ease-in-out alternate infinite;
  }

  .moving-3 {
    @include star-field;
    animation:
      star-movement 9s -6s cubic-bezier(0.55, 0, 1, 0.45) infinite,
      direction-movement 30s ease-in-out alternate infinite;
  }
}

// Universal variant that works on both light and dark backgrounds
div.starfield.universal {
  .static {
    @include star-field-universal;
    width: 1px;
    height: 1px;
  }

  .moving-1 {
    @include star-field-universal;
    animation:
      star-movement 9s cubic-bezier(0.55, 0, 1, 0.45) infinite,
      direction-movement 30s ease-in-out alternate infinite;
  }

  .moving-2 {
    @include star-field-universal;
    animation:
      star-movement 9s -3s cubic-bezier(0.55, 0, 1, 0.45) infinite,
      direction-movement 30s ease-in-out alternate infinite;
  }

  .moving-3 {
    @include star-field-universal;
    animation:
      star-movement 9s -6s cubic-bezier(0.55, 0, 1, 0.45) infinite,
      direction-movement 30s ease-in-out alternate infinite;
  }
}

@keyframes star-movement {
  0% {
    transform: scale(0.5) translateZ(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  99% {
    opacity: 1;
  }
  100% {
    transform: scale(2) translateZ(0);
    opacity: 0;
  }
}

@keyframes direction-movement {
  from {
    transform-origin: random-range(-40, 0, 'vw') random-range(-40, 0, 'vh');
  }
  to {
    transform-origin: random-range(0, 40, 'vw') random-range(0, 40, 'vh');
  }
}
</style>
