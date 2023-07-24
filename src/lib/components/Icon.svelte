<script context="module" lang="ts">
  const icons = {
    menu: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line>`,
    home: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline> <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path> <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>`,
    stream: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M21 12h-2c-.894 0 -1.662 -.857 -1.761 -2c-.296 -3.45 -.749 -6 -2.749 -6s-2.5 3.582 -2.5 8s-.5 8 -2.5 8s-2.452 -2.547 -2.749 -6c-.1 -1.147 -.867 -2 -1.763 -2h-2"></path>`,
    clients: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M17 10h2a2 2 0 0 1 2 2v1"></path><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>`,
    stats: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 4m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"></path><path d="M7 20h10"></path><path d="M9 16v4"></path><path d="M15 16v4"></path><path d="M9 12v-4"></path><path d="M12 12v-1"></path><path d="M15 12v-2"></path><path d="M12 12v-1"></path>`,
    // calendar: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <rect x="4" y="5" width="16" height="16" rx="2"></rect> <line x1="16" y1="3" x2="16" y2="7"></line> <line x1="8" y1="3" x2="8" y2="7"></line> <line x1="4" y1="11" x2="20" y2="11"></line> <rect x="8" y="15" width="2" height="2"></rect>`,
    timeline: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 16l6 -7l5 5l5 -6"></path><circle cx="15" cy="14" r="1"></circle><circle cx="10" cy="9" r="1"></circle><circle cx="4" cy="16" r="1"></circle><circle cx="20" cy="8" r="1"></circle>`,
    logs: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><path d="M9 9l1 0"></path><path d="M9 13l6 0"></path><path d="M9 17l6 0"></path>`,
    plus: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 5l0 14"></path><path d="M5 12l14 0"></path>`
    // settings: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
    //              <circle cx="12" cy="12" r="3"></circle>`,
    // logout: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M7 12h14l-3 -3m0 6l3 -3"></path>`,
    // group: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="4" width="6" height="5" rx="2"></rect><rect x="4" y="13" width="6" height="7" rx="2"></rect><rect x="14" y="4" width="6" height="7" rx="2"></rect><rect x="14" y="15" width="6" height="5" rx="2"></rect>`,
    // chevronRight: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="9 6 15 12 9 18"></polyline>`,
    // chevronLeft: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="15 6 9 12 15 18"></polyline>`,
    // chevronDown: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="6 9 12 15 18 9"></polyline>`,
    // arrowRight: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>`,
    // verticalDots: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="12" cy="5" r="1"></circle>`,
    // trash: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="4" y1="7" x2="20" y2="7"></line><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>`,
    // circle: '<circle cx="12" cy="12" r="4"/>',
    // check: '<path d=M5 12l4 4l19 7/>',
    // user: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="10" r="3"></circle><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>`
  };

  export type iconType = keyof typeof icons;
</script>

<script lang="ts">
  export let strokeWidth = 1.7;
  export let name: iconType;
  export let className = '';
  export let fill = false;
</script>

<svg
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
  class="w-[24px] h-[24px] {className}"
  stroke="currentColor"
  fill={fill ? 'currentColor' : 'none'}
  stroke-linecap="round"
  stroke-linejoin="round"
>
  {@html icons[name] ?? ''}
</svg>
