import {
  computePosition,
  offset,
  flip,
  arrow,
  hide,
  type Placement,
  shift
} from '@floating-ui/dom';

type TooltipOptions = {
  placement?: Placement;
  isOpen?: boolean;
};

export function tooltip(
  trigger: HTMLElement | null,
  { placement = 'right', isOpen }: TooltipOptions
) {
  if (!trigger) return;
  const tooltip = trigger.querySelector('.tooltip') as HTMLElement;
  if (!tooltip) return;

  if (!isOpen) {
    tooltip.style.display = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.scale = '0.93';
  }

  const arrowEl = document.createElement('div');
  arrowEl.className = 'arrow';
  tooltip.appendChild(arrowEl);

  const update = () => {
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
  };

  function showTooltip() {
    tooltip.style.display = 'block';
    update();

    setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.scale = '1';
    }, 0);
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
    tooltip.style.scale = '0.93';

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

  if (isOpen === undefined) {
    actions.forEach(([event, listener]) => {
      trigger.addEventListener(event, listener);
    });
  }

  return {
    update({ isOpen }: TooltipOptions) {
      if (isOpen === true) {
        showTooltip();
      }

      if (isOpen === false) {
        hideTooltip();
      }
    },

    destroy() {
      actions.forEach(([event, listener]) => {
        trigger.removeEventListener(event, listener);
      });
    }
  };
}
