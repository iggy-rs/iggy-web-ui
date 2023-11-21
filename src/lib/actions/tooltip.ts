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

const openId = writable<string | null>(null);

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
  const id = crypto.randomUUID();

  let cleanup: VoidFunction | undefined;

  const unsub = openId.subscribe((val) => (val === id ? showTooltip() : hideTooltip()));
  const openTooltip = () => openId.set(id);
  const closeTooltip = () => openId.set(null);
  const toggleOpen = () => openId.update((val) => (val === id ? null : id));

  const onOutsideClick = (e: MouseEvent) => {
    if (!tooltip.contains(e.target as HTMLElement)) {
      console.log('outside click');
      closeTooltip();
    }
  };

  const onTriggerClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleOpen();
  };

  if (clickable) {
    document.addEventListener('click', onOutsideClick);
    trigger.addEventListener('click', onTriggerClick);
  }

  node.addEventListener('closeTooltip', () => {
    console.log('close tooltip event');
  });

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
    }, 0);
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'scale(0.93)';

    console.log('hide');

    if (typeof cleanup === 'function') {
      cleanup();
    }

    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 205);
  }

  const actions = [
    ['mouseenter', showTooltip],
    ['mouseleave', hideTooltip],
    ['focus', showTooltip],
    ['blur', hideTooltip]
  ] as const;

  if (!clickable) {
    actions.forEach(([event, listener]) => {
      trigger.addEventListener(event, listener);
    });
  }

  return {
    destroy() {
      console.log('destroy');
      if (typeof cleanup === 'function') {
        cleanup();
      }
      // node.removeEventListener('closeTooltip', closeTooltip);
      trigger.removeEventListener('click', onTriggerClick);
      document.removeEventListener('click', onOutsideClick);
      actions.forEach(([event, listener]) => {
        trigger.removeEventListener(event, listener);
      });

      unsub();
    }
  };
}
