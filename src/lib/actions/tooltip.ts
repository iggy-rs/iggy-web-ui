import {
  computePosition,
  offset,
  flip,
  arrow,
  hide,
  type Placement,
  shift,
  autoUpdate
} from '@floating-ui/dom';
import { writable } from 'svelte/store';

type TooltipOptions = {
  placement?: Placement;
  clickable?: boolean;
};

export function tooltip(
  node: HTMLElement | null,
  { placement = 'right', clickable }: TooltipOptions
) {
  if (!node) return;
  const trigger = node.querySelector('[data-trigger]') as HTMLElement;
  const tooltip = node.querySelector('.tooltip') as HTMLElement;

  if (!tooltip || !trigger) return;

  let cleanup: VoidFunction | undefined;

  const isOpen = writable(false);
  const unsub = isOpen.subscribe((val) => (val ? showTooltip() : hideTooltip()));
  const openTooltip = () => isOpen.set(true);
  const closeTooltip = () => isOpen.set(false);
  const toggleOpen = () => isOpen.update((val) => !val);

  if (clickable) trigger.addEventListener('click', toggleOpen);

  node.addEventListener('closeTooltip', () => {
    console.log('close tooltip event');
  });

  const onOutsideClick = (e: MouseEvent) => {
    if (!tooltip.contains(e.target as HTMLElement)) {
      closeTooltip();
    }
  };

  const arrowEl = document.createElement('div');
  arrowEl.className = 'arrow';
  tooltip.appendChild(arrowEl);

  const updatePosition = () => {
    cleanup = autoUpdate(trigger, tooltip, () => {
      computePosition(trigger, tooltip, {
        placement,
        middleware: [
          offset(10),
          flip({ padding: 5 }),
          shift({ padding: 5 }),
          arrow({ element: arrowEl }),
          hide()
        ]
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
          visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible'
        });

        tooltip.dataset.placement = placement;

        const { x: arrowX, y: arrowY } = middlewareData.arrow!;

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[placement.split('-')[0]]!;

        arrowEl.dataset.placement = placement;

        Object.assign(arrowEl.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-5px'
        });
      });
    });
  };

  function showTooltip() {
    tooltip.style.display = 'block';
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'scale(0.93)';

    updatePosition();

    setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'scale(1)';

      if (clickable) {
        document.addEventListener('click', onOutsideClick);
      }
    }, 0);
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'scale(0.93)';

    if (typeof cleanup === 'function') {
      cleanup();
    }

    setTimeout(() => {
      tooltip.style.display = 'none';
      document.removeEventListener('click', onOutsideClick);
    }, 205);
  }

  const actions = [
    ['mouseenter', openTooltip],
    ['mouseleave', closeTooltip],
    ['focus', openTooltip],
    ['blur', closeTooltip]
  ] as const;

  if (clickable !== true) {
    actions.forEach(([event, listener]) => {
      trigger.addEventListener(event, listener);
    });
  }

  return {
    destroy() {
      if (typeof cleanup === 'function') {
        cleanup();
      }
      // node.removeEventListener('closeTooltip', closeTooltip);
      trigger.removeEventListener('click', toggleOpen);
      document.removeEventListener('click', onOutsideClick);
      actions.forEach(([event, listener]) => {
        trigger.removeEventListener(event, listener);
      });

      unsub();
    }
  };
}
