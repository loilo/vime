<svelte:options accessors />

{#if isEnabled}
  <MenuItem
    id={controllerId}
    {player}
    {title}
    {hint}
    aria-hidden={hideController}
    aria-haspopup={!isLocked ? true : null}
    aria-expanded={!isLocked ? isActive : null}
    aria-controls={!isLocked ? id : null}
    on:click={onToggleMenu}
  >
    {#if !isLocked}
      <div 
        class="divider"
        class:audio={!$isVideoView}
        class:active={isActive}
        bind:this={divider}
      ></div>
      <Menu 
        {id}
        bind:isActive
        aria-labelledby={controllerId}
        on:open
        on:close
        bind:this={menu}
      >
        <slot />
      </Menu>
    {/if}
  </MenuItem>
{/if}

<script context="module">
  let menuIdCounter = 0;
</script>

<script>
  import Menu from '../Menu.svelte';
  import MenuItem from '../MenuItem.svelte';

  // eslint-disable-next-line prefer-const
  menuIdCounter += 1;
  const id = `v-submenu-${menuIdCounter}`;
  const controllerId = `v-submenu-control-${menuIdCounter}`;

  // --------------------------------------------------------------
  // Setup
  // --------------------------------------------------------------

  export let player;

  const { isVideoView } = player.getStore();

  // --------------------------------------------------------------
  // Props
  // --------------------------------------------------------------

  let menu;
  let divider;

  export let title = null;
  export let hint = null;
  export let isActive = false;
  export let isLocked = false;
  export let isEnabled = true;
  export let hideController = false;

  export const getId = () => id;
  export const getControllerId = () => controllerId;
  export const getMenu = () => menu;
  export const getDivider = () => divider;

  // --------------------------------------------------------------
  // Events
  // --------------------------------------------------------------

  const onToggleMenu = () => {
    if (isLocked) return;
    isActive = !isActive;
  };
</script>

<style type="text/scss">
  @import '../../../../style/common';

  .divider {
    width: 100%;
    margin: 4px 0;
    border: 0.5px solid;
    border-color: $color-white-100;
    display: none;

    &.audio {
      border-color: $color-gray-100;
    }

    &.active {
      display: block;
    }
  }
</style>